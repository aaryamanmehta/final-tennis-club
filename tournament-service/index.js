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
    label({ label: 'tournament-service' }),
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
    new transports.File({ filename: 'tournament-service.log', level: 'info' }),
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
const port = 6002;

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
    logger.error(`Error sending event to Event Bus - ${err}`);
    console.error(`Error sending event to Event Bus - ${err}`);
  }
};

// create tournament 3.5 by email
app.post("/create-tournament-3.5/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { match_deadline, result } = req.body;

    if (!email || !match_deadline || !result) {
      logger.error("All fields are required");
      return res.status(400).json({ error: "All fields are required" });
    }

    // check if there exists a match wherein player2_email is null
    const { data: tournamentWithNullPlayer, error: tournamentWithNullError } =
      await supabase
        .from("tournament_3_5")
        .select("*")
        .is("player2_email", null);

    if (tournamentWithNullError) {
      logger.error(
        `Error checking for tournaments with NULL player: ${tournamentWithNullError}`
      );
      console.error(
        "Error checking for tournaments with NULL player:",
        tournamentWithNullError
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // if a tournament with null player exists, update the match with the player2_email

    if (tournamentWithNullPlayer.length > 0) {
      const { data: updatedMatch, error: updateMatchError } = await supabase
        .from("tournament_3_5")
        .update({ player2_email: email })
        .eq("match_id", tournamentWithNullPlayer[0].match_id);

      if (updateMatchError) {
        logger.error(`Error updating match: ${updateMatchError}`);
        console.error("Error updating match:", updateMatchError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const event = {
        type: "TournamentCreated",
        data: {
          match_id: tournamentWithNullPlayer[0].match_id,
          player1_email: tournamentWithNullPlayer[0].player1_email,
          player2_email: email,
          match_deadline: tournamentWithNullPlayer[0].match_deadline,
          result: tournamentWithNullPlayer[0].result,
        },
      };

      await sendEventToBus(event);

      logger.info(`Tournament Scheduled With Player`);
      return res
        .status(201)
        .json({ message: "Tournament Scheduled With Player" });
    }

    // if a tournament with null player does not exist, create a new tournament

    const { data: newTournament, error: createTournamentError } = await supabase
      .from("tournament_3_5")
      .insert([
        {
          player1_email: email,
          player2_email: null,
          match_deadline,
          result,
        },
      ]);

    if (createTournamentError) {
      logger.error(`Error creating tournament: ${createTournamentError}`);
      console.error("Error creating tournament:", createTournamentError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const event = {
      type: "TournamentCreated",
      data: { email, match_deadline, result },
    };

    await sendEventToBus(event);

    logger.info(`Tournament created successfully`);
    res.status(201).json({ message: "Tournament created successfully" });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create tournament 4.0 by email
app.post("/create-tournament-4.0/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { match_deadline, result } = req.body;

    if (!email || !match_deadline || !result) {
      logger.error("All fields are required");
      return res.status(400).json({ error: "All fields are required" });
    }

    // check if there exists a match wherein player2_email is null
    const { data: tournamentWithNullPlayer, error: tournamentWithNullError } =
      await supabase
        .from("tournament_4_0")
        .select("*")
        .is("player2_email", null);
    if (tournamentWithNullError) {
      logger.error(
        `Error checking for tournaments with NULL player: ${tournamentWithNullError}`
      );
      console.error(
        "Error checking for tournaments with NULL player:",
        tournamentWithNullError
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // if a tournament with null player exists, update the match with the player2_email

    if (tournamentWithNullPlayer.length > 0) {
      const { data: updatedMatch, error: updateMatchError } = await supabase
        .from("tournament_4_0")
        .update({ player2_email: email })
        .eq("match_id", tournamentWithNullPlayer[0].match_id);

      if (updateMatchError) {
        logger.error(`Error updating match: ${updateMatchError}`);
        console.error("Error updating match:", updateMatchError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const event = {
        type: "TournamentCreated",
        data: {
          match_id: tournamentWithNullPlayer[0].match_id,
          player1_email: tournamentWithNullPlayer[0].player1_email,
          player2_email: email,
          match_deadline: tournamentWithNullPlayer[0].match_deadline,
          result: tournamentWithNullPlayer[0].result,
        },
      };

      await sendEventToBus(event);

      logger.info(`Tournament Scheduled With Player`);
      return res
        .status(201)
        .json({ message: "Tournament Scheduled With Player" });
    }

    // if a tournament with null player does not exist, create a new tournament

    const { data: newTournament, error: createTournamentError } = await supabase
      .from("tournament_4_0")
      .insert([
        {
          player1_email: email,
          player2_email: null,
          match_deadline,
          result,
        },
      ]);

    if (createTournamentError) {
      logger.error(`Error creating tournament: ${createTournamentError}`);
      console.error("Error creating tournament:", createTournamentError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const event = {
      type: "TournamentCreated",
      data: { email, match_deadline, result },
    };

    await sendEventToBus(event);

    logger.info(`Tournament created successfully`);
    res.status(201).json({ message: "Tournament created successfully" });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create tournament 4.5 by email
app.post("/create-tournament-4.5/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { match_deadline, result } = req.body;

    if (!email || !match_deadline || !result) {
      logger.error("All fields are required");
      return res.status(400).json({ error: "All fields are required" });
    }

    // check if there exists a match wherein player2_email is null
    const { data: tournamentWithNullPlayer, error: tournamentWithNullError } =
      await supabase
        .from("tournament_4_5")
        .select("*")
        .is("player2_email", null);
    if (tournamentWithNullError) {
      logger.error(
        `Error checking for tournaments with NULL player: ${tournamentWithNullError}`
      );
      console.error(
        "Error checking for tournaments with NULL player:",
        tournamentWithNullError
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // if a tournament with null player exists, update the match with the player2_email

    if (tournamentWithNullPlayer.length > 0) {
      const { data: updatedMatch, error: updateMatchError } = await supabase
        .from("tournament_4_5")
        .update({ player2_email: email })
        .eq("match_id", tournamentWithNullPlayer[0].match_id);

      if (updateMatchError) {
        logger.error(`Error updating match: ${updateMatchError}`);
        console.error("Error updating match:", updateMatchError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const event = {
        type: "TournamentCreated",
        data: {
          match_id: tournamentWithNullPlayer[0].match_id,
          player1_email: tournamentWithNullPlayer[0].player1_email,
          player2_email: email,
          match_deadline: tournamentWithNullPlayer[0].match_deadline,
          result: tournamentWithNullPlayer[0].result,
        },
      };

      await sendEventToBus(event);

      logger.info(`Tournament Scheduled With Player`);
      return res
        .status(201)
        .json({ message: "Tournament Scheduled With Player" });
    }

    // if a tournament with null player does not exist, create a new tournament

    const { data: newTournament, error: createTournamentError } = await supabase
      .from("tournament_4_5")
      .insert([
        {
          player1_email: email,
          player2_email: null,
          match_deadline,
          result,
        },
      ]);

    if (createTournamentError) {
      logger.error(`Error creating tournament: ${createTournamentError}`);
      console.error("Error creating tournament:", createTournamentError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const event = {
      type: "TournamentCreated",
      data: { email, match_deadline, result },
    };

    await sendEventToBus(event);

    logger.info(`Tournament created successfully`);

    res.status(201).json({ message: "Tournament created successfully" });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create tournament 5.0 by email
app.post("/create-tournament-5.0/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { match_deadline, result } = req.body;

    if (!email || !match_deadline || !result) {
      logger.error("All fields are required");
      return res.status(400).json({ error: "All fields are required" });
    }

    // check if there exists a match wherein player2_email is null
    const { data: tournamentWithNullPlayer, error: tournamentWithNullError } =
      await supabase
        .from("tournament_5_0")
        .select("*")
        .is("player2_email", null);

    if (tournamentWithNullError) {
      logger.error(
        `Error checking for tournaments with NULL player: ${tournamentWithNullError}`
      );
      console.error(
        "Error checking for tournaments with NULL player:",
        tournamentWithNullError
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // if a tournament with null player exists, update the match with the player2_email

    if (tournamentWithNullPlayer.length > 0) {
      const { data: updatedMatch, error: updateMatchError } = await supabase
        .from("tournament_5_0")
        .update({ player2_email: email })
        .eq("match_id", tournamentWithNullPlayer[0].match_id);

      if (updateMatchError) {
        logger.error(`Error updating match: ${updateMatchError}`);
        console.error("Error updating match:", updateMatchError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const event = {
        type: "TournamentCreated",
        data: {
          match_id: tournamentWithNullPlayer[0].match_id,
          player1_email: tournamentWithNullPlayer[0].player1_email,
          player2_email: email,
          match_deadline: tournamentWithNullPlayer[0].match_deadline,
          result: tournamentWithNullPlayer[0].result,
        },
      };

      await sendEventToBus(event);


      logger.info(`Tournament Scheduled With Player`);
      return res
        .status(201)
        .json({ message: "Tournament Scheduled With Player" });
    }

    // if a tournament with null player does not exist, create a new tournament

    const { data: newTournament, error: createTournamentError } = await supabase
      .from("tournament_5_0")
      .insert([
        {
          player1_email: email,
          player2_email: null,
          match_deadline,
          result,
        },
      ]);

    if (createTournamentError) {
      logger.error(`Error creating tournament: ${createTournamentError}`);
      console.error("Error creating tournament:", createTournamentError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const event = {
      type: "TournamentCreated",
      data: { email, match_deadline, result },
    };

    await sendEventToBus(event);

    logger.info(`Tournament created successfully`);
    res.status(201).json({ message: "Tournament created successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all tournaments 3.5
app.get("/tournaments-3.5", async (req, res) => {
  try {
    const { data: tournaments, error } = await supabase
      .from("tournament_3_5")
      .select("*");

    if (error) {
      logger.error(`Error getting tournaments: ${error}`);
      console.error("Error getting tournaments:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    logger.info(`Tournaments retrieved successfully`);
    res.status(200).json({ tournaments });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all tournaments 4.0
app.get("/tournaments-4.0", async (req, res) => {
  try {
    const { data: tournaments, error } = await supabase
      .from("tournament_4_0")
      .select("*");

      if (error) {
        logger.error(`Error getting tournaments: ${error}`);
        console.error("Error getting tournaments:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      logger.info(`Tournaments retrieved successfully`);
      res.status(200).json({ tournaments });
    } catch (error) {
      logger.error(`Unexpected error: ${error}`);
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// get all tournaments 4.5
app.get("/tournaments-4.5", async (req, res) => {
  try {
    const { data: tournaments, error } = await supabase
      .from("tournament_4_5")
      .select("*");

      if (error) {
        logger.error(`Error getting tournaments: ${error}`);
        console.error("Error getting tournaments:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      logger.info(`Tournaments retrieved successfully`);
      res.status(200).json({ tournaments });
    } catch (error) {
      logger.error(`Unexpected error: ${error}`);
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// get all tournaments 5.0
app.get("/tournaments-5.0", async (req, res) => {
  try {
    const { data: tournaments, error } = await supabase
      .from("tournament_5_0")
      .select("*");

      if (error) {
        logger.error(`Error getting tournaments: ${error}`);
        console.error("Error getting tournaments:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      logger.info(`Tournaments retrieved successfully`);
      res.status(200).json({ tournaments });
    } catch (error) {
      logger.error(`Unexpected error: ${error}`);
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// get ALL tournaments by email
app.get("/tournaments/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const { data: tournaments_3_5, error } = await supabase
      .from("tournament_3_5")
      .select("*");

    const { data: tournaments_4_0, error_4_0 } = await supabase
      .from("tournament_4_0")
      .select("*");

    const { data: tournaments_4_5, error_4_5 } = await supabase
      .from("tournament_4_5")
      .select("*");

    const { data: tournaments_5_0, error_5_0 } = await supabase
      .from("tournament_5_0")
      .select("*");

    if (error || error_4_0 || error_4_5 || error_5_0) {
      logger.error(`Error getting tournaments: ${error}`);
      console.error("Error getting tournaments:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // filter through the tournmanets and return only the ones that have the email
    const filteredTournaments_3_5 = tournaments_3_5.filter((tournament) => {
      return (
        tournament.player1_email === email || tournament.player2_email === email
      );
    });

    const filteredTournaments_4_0 = tournaments_4_0.filter((tournament) => {
      return (
        tournament.player1_email === email || tournament.player2_email === email
      );
    });

    const filteredTournaments_4_5 = tournaments_4_5.filter((tournament) => {
      return (
        tournament.player1_email === email || tournament.player2_email === email
      );
    });

    const filteredTournaments_5_0 = tournaments_5_0.filter((tournament) => {
      return (
        tournament.player1_email === email || tournament.player2_email === email
      );
    });

    const filteredTournaments = {
      3.5: filteredTournaments_3_5,
      4.0: filteredTournaments_4_0,
      4.5: filteredTournaments_4_5,
      5.0: filteredTournaments_5_0,
    };

    console.log(filteredTournaments);

    if (error) {
      logger.error(`Error getting tournaments: ${error}`);
      console.error("Error getting tournaments:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    logger.info(`Tournaments retrieved successfully`);
    res.status(200).json({ filteredTournaments });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`(${process.pid}) Tournament Service: Listening on ${port}`);
  logger.info(`(${process.pid}) User Service: Listening on ${port}. Winston logging enabled.`);
});
