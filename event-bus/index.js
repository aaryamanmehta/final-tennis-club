import express from 'express';
import morgan from "morgan";
import winston from 'winston';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'event-bus' }),
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
    new transports.File({ filename: 'event-bus.log', level: 'info' }),
  ],
});
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

const servicePorts = [{name: 'user-service', port: 6001}, {name:'tournament-service', port: 6002}, {name: 'notification-service', port: 6003}]

const eventBusPort = 6000;

app.post('/events', async (req, res) => {
    const event = req.body;
  
    console.log(`(${process.pid}) Event Bus (Received Event) ${event.type}`);
    logger.info(`Event Bus (Received Event) ${event.type}`);
  
    for (const { name, port } of servicePorts) {
      try {
        console.log(
          `(${process.pid}) Event Bus (Sending Event to ${port}) ${event.type}`
        );
        logger.info(
          `Event Bus (Sending Event to ${port}) ${event.type}`
        );
  
        await fetch(`http://${name}:${port}/events`, {
          method: 'POST',
          body: JSON.stringify(event),
          headers: { 'Content-Type': 'application/json' },
        });
  
        logger.info(`(${process.pid}) Event Bus: Event sent successfully to ${port}`);
        console.log(`(${process.pid}) Event Bus: Event sent successfully to ${port}`);
      } catch (err) {
        logger.error(`(${process.pid}) Event Bus: Error sending event to ${port} - ${err}`);
        console.log(`(${process.pid}) Event Bus: Error sending event to ${port} - ${err}`);
      }
    }
    res.send({ status: 'OK' });
  });
  
  app.listen(eventBusPort, () => {
    console.log(`(${process.pid}) Event Bus Listening on ${eventBusPort}`);
    logger.info(`(${process.pid}) Event Bus Listening on ${eventBusPort}. Winston logging enabled.`);
  });
  