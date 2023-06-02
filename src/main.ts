import config from 'config';
import { Server } from './server';
import { App, loadAppConfig } from './app';
import { ConsoleLogger } from '../src/logger';

const logger = new ConsoleLogger('main');

const SIGNALS = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

function onSignal(signal: string, server: Server): void {
	logger.warn(`Got signal ${signal}. Shutting down`);
	try {
		server.stop();
		process.exit(0);
	} catch (error: any) {
		logger.error(`Error while stopping app`);
		logger.error(error.message);
		logger.error(error.stack);
		process.exit(1);
	}
}

async function main(): Promise<void> {
	try {
		const appConfig = loadAppConfig(config);
		const app = new App(appConfig);
		const appInstance = app.init();

		const { port } = appConfig;

		const server = new Server({ port, app: appInstance });
		await server.start();

		SIGNALS.forEach(signal =>
			process.on(signal, () => {
				onSignal(signal, server);
			})
		);
	} catch (error: any) {
		logger.error(`Error while starting app`);
		logger.error(error.message);
		logger.error(error.stack);
		process.exit(1);
	}
}

void main();
