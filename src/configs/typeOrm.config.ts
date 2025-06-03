import { DataSourceOptions } from 'typeorm';

export const typeorm_config: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10) || 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	schema: process.env.DB_SCHEMA,
	entities: [__dirname + './../**/*.entity.{js,ts}'],
	logging: false,
	synchronize: process.env.DB_SYNC === 'true' ? true : false,
	uuidExtension: 'pgcrypto',
};
