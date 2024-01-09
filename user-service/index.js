import express from "express";
import morgan from "morgan";
import winston from 'winston';
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

const app = express();

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'user-service' }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    })
  ),
  transports: [
    // log all levels to the console
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: 'user-service.log', level: 'info' }),
  ],
});
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

const supabaseUrl = "https://owvlymtxittqlnpfwegp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dmx5bXR4aXR0cWxucGZ3ZWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDQ4NjAsImV4cCI6MjAxNzQ4MDg2MH0.zKXlmwdMVwsBm9lE3Nbh__4qq1-PtRTdsf4eSIne-xk";
const supabase = createClient(supabaseUrl, supabaseKey);
const EVENT_BUS_URL = "http://event-bus:6000/events";
const port = 6001;

const sendEventToBus = async (event) => {
  try {
    await fetch(EVENT_BUS_URL, {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json" },
    });
    logger.info(`Event sent to Event Bus: ${event.type}`);
    console.log(`Event sent to Event Bus: ${event.type}`);
  } catch (err) {
    console.error(`Error sending event to Event Bus - ${err}`);
    logger.error(`Error sending event to Event Bus - ${err}`);
  }
};

app.post("/create-player", async (req, res) => {
  try {
    const { email, ismember, ranking, fname, lname } = req.body;

    if (!email || !ismember || !ranking || !fname || !lname) {
      logger.error(`All fields are required`);
      return res.status(400).json({ error: "All fields are required" });
    }

    const { data: existingPlayer, error: existingPlayerError } = await supabase
      .from("players")
      .select("*")
      .eq("email", email);

    if (existingPlayerError) {
      logger.error(`Error checking for existing player: ${existingPlayerError}`);
      console.error("Error checking for existing player:", existingPlayerError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (existingPlayer.length > 0) {
      logger.error(`Player with this email already exists: ${email}`);
      return res
        .status(409)
        .json({ error: "Player with this email already exists" });
    }

    const { data: newPlayer, error: createPlayerError } = await supabase
      .from("players")
      .upsert([
        {
          email,
          ismember,
          ranking,
          fname,
          lname,
        },
      ]);

    if (createPlayerError) {
      logger.error(`Error creating player: ${createPlayerError}`);
      console.error("Error creating player:", createPlayerError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const event = {
      type: "PlayerCreated",
      data: { email, ismember, ranking, fname, lname },
    };

    await sendEventToBus(event);

    logger.info(`Player created successfully: ${email}`);
    res
      .status(201)
      .json({
        player: { email, ismember, ranking, fname, lname },
            });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all players
app.get("/players", async (req, res) => {
  try {
    const { data: players, error } = await supabase.from("players").select("*");

    if (error) {
      logger.error(`Error getting players: ${error}`);
      console.error("Error getting players:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    logger.info(`Players retrieved successfully`);
    res.status(200).json({ players });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get player by email
app.get("/players/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const { data: player, error } = await supabase
      .from("players")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      logger.error(`Error getting player: ${error}`);
      console.error("Error getting player:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!player) {
      logger.error(`Player not found: ${email}`);
      return res.status(404).json({ error: "Player not found" });
    }

    logger.info(`Player retrieved successfully: ${email}`);
    res.status(200).json({ player });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update player by email
app.put("/players/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { ismember, ranking, fname, lname } = req.body;

    const { data: player, error: getPlayerError } = await supabase
      .from("players")
      .select("*")
      .eq("email", email)
      .single();

    if (getPlayerError) {
      logger.error(`Error getting player: ${getPlayerError}`);
      console.error("Error getting player:", getPlayerError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!player) {
      logger.error(`Player not found: ${email}`);
      return res.status(404).json({ error: "Player not found" });
    }

    const { data: updatedPlayer, error: updatePlayerError } = await supabase
      .from("players")
      .update({ ismember, ranking, fname, lname })
      .eq("email", email)
      .single();

    if (updatePlayerError) {
      logger.error(`Error updating player: ${updatePlayerError}`);
      console.error("Error updating player:", updatePlayerError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const event = {
      type: "PlayerUpdated",
      data: { email, ismember, ranking, fname, lname },
    };

    await sendEventToBus(event);

    logger.info(`Player updated successfully: ${email}`);
    res
      .status(200)
      .json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`(${process.pid}) User Service: Listening on ${port}`);
  logger.info(`(${process.pid}) User Service: Listening on ${port}. Winston logging enabled.`);
});
