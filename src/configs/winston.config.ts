import * as winston from 'winston';

export const winston_config = {
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
		}),
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
	],
};
