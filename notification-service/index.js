import express from "express";
import morgan from "morgan";
import winston from 'winston';
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "umasstennisclubproject@gmail.com",
    pass: "tkvt qpgk wdrg pwrk",
  },
});

const app = express();

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'notification-service' }),
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
    new transports.File({ filename: 'notification-service.log', level: 'info' }),
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
const port = 6003;

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

// send email to user when they are created
app.post("/create-player-notification/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const mailData = {
      from: "umasstennisclubproject@gmail.com",
      to: email,
      subject: "Welcome to UMass Tennis Club!",
      text: `Dear ${email},\n\nWelcome to the UMass Tennis Club Project! Your account has been successfully created.`,
    };
    await transporter.sendMail(mailData);
    console.log(`Email sent to ${email}`);
    const event = {
      type: "PlayerCreatedEmailSent",
      data: { recipient: email, subject: mailData.subject },
    };
    await sendEventToBus(event);
    logger.info(`Email sent to ${email}`);
    res.status(201).json({ status: "OK" });
  } catch (err) {
    logger.error(`Error sending email - ${err}`);
    console.error(`Error sending email - ${err}`);
  }
});

// send email to user when they sign up for a tournament
app.post(
  "/tournament-signup-notification/:email/:ranking",
  async (req, res) => {
    try {
      const { email, ranking } = req.params;
      const mailData = {
        from: "umasstennisclubproject@gmail.com",
        to: email,
        subject: `Tournament NTRP ${ranking} Signup Confirmation`,
        text: `Dear ${email},\n\nYou have successfully signed up for the tournament! Make sure to complete your match before the deadline, as available on the website! Good luck!`,
      };
      await transporter.sendMail(mailData);
      console.log(`Email sent to ${email}`);
      const event = {
        type: "TournamentSignupEmailSent",
        data: { recipient: email, subject: mailData.subject },
      };
      await sendEventToBus(event);
      logger.info(`Email sent to ${email}`);
      res.status(201).json({ status: "OK" });
    } catch (err) {
      logger.error(`Error sending email - ${err}`);
      console.error(`Error sending email - ${err}`);
    }
  }
);

// send email to user when they update their profile
app.post("/update-player-notification/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const mailData = {
            from: "umasstennisclubproject@gmail.com",
            to: email,
            subject: "Profile Update Confirmation",
            text: `Dear ${email},\n\nThis is to confirm you have updated your player profile. If you did not make this change, please contact us immediately.`,
        };
        await transporter.sendMail(mailData);
        console.log(`Email sent to ${email}`);
        const event = {
            type: "PlayerUpdateEmailSent",
            data: { recipient: email, subject: mailData.subject },
        };
        await sendEventToBus(event);
        logger.info(`Email sent to ${email}`);
        res.status(201).json({ status: "OK" });
    } catch (err) {
        logger.error(`Error sending email - ${err}`);
        console.error(`Error sending email - ${err}`);
    }
});

// send email to user if they are invited to play a casual match
app.post("/casual-match-invite-notification/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { currentPlayer } = req.body;
        console.log(currentPlayer);
        const mailData = {
            from: "umasstennisclubproject@gmail.com",
            to: email,
            subject: "Casual Match Invite",
            text: `Dear ${email},\n\nYou have been invited to play a casual match by ${currentPlayer.fname} ${currentPlayer.lname}. Please e-mail them at ${currentPlayer.email} to schedule a time to play!`,
        };
        await transporter.sendMail(mailData);
        console.log(`Email sent to ${email}`);
        const event = {
            type: "CasualMatchInviteEmailSent",
            data: { recipient: email, subject: mailData.subject },
        };
        await sendEventToBus(event);
        logger.info(`Email sent to ${email}`);
        res.status(201).json({ status: "OK" });
    } catch (err) {
        logger.error(`Error sending email - ${err}`);
        console.error(`Error sending email - ${err}`);
    }
});

app.listen(port, () => {
  console.log(`(${process.pid}) Notification Service: Listening on ${port}`);
  logger.info(`(${process.pid}) Notification Service: Listening on ${port}. Winston logging enabled.`);
});
