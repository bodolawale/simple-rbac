import { type AppConfig } from './app-config';
import express, { type Application } from 'express';

export class App {
	private readonly config: AppConfig;
	private app!: Application;
	constructor(appConfig: AppConfig) {
		this.config = appConfig;
	}

	init(): Application {
		this.app = express();
		return this.app;
	}
}
