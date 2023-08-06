import winston from 'winston'
const { combine, timestamp, label, prettyPrint } = winston.format

export const logger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: 'meow' }), timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    })
  ]
})
