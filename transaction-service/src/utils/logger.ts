import { createLogger, transports, format } from 'winston';
import { existsSync, mkdirSync } from 'fs';
const dir = './logs';

if (!existsSync(dir)) {
  mkdirSync(dir);
}

const today = new Date();
const dateStr = today.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const logConfiguration = {
  transports: [
    new transports.File({
      filename: `./logs/logs_${dateStr}.log`,
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
};

/**
 * Helps in creating a structured log format
 * @param {String} message
 * @param {String} source
 * @param {Object} details
 * @returns Object containing message, source and details
 */
export const createLogObject = (
  message: string,
  source = 'unknown',
  details = {}
) => {
  return { message, source, details };
};

export const logger = createLogger(logConfiguration);
