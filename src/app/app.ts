import { type AppConfig } from './app-config';
import express, { type Application } from 'express';
import { SequelizeDriver } from '../libs/sequelize/sequelize';

export class App {
	private readonly config: AppConfig;
	private app!: Application;
	constructor(appConfig: AppConfig) {
		this.config = appConfig;
	}

	async init(): Promise<Application> {
		this.app = express();

		const sequelizeDriver = this.getSequelizeDriver();
		await sequelizeDriver.authenticate();
		sequelizeDriver.loadModels();

		return this.app;
	}

	private getSequelizeDriver(): SequelizeDriver {
		const { postgres } = this.config;

		// eslint-disable-next-line no-console
		const logging = postgres.options.logging ? console.log : false;

		return new SequelizeDriver({
			url: postgres.url,
			options: {
				dialect: postgres.options.dialect,
				logging
			}
		});
	}
}
