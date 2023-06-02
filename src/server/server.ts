import { type Application } from 'express';
import http from 'http';
import { ConsoleLogger } from '../logger';

const logger = new ConsoleLogger('server');

export interface ServerConfig {
	port: number;
	app: Application;
}

export class Server {
	private readonly port: number;
	private readonly app: Application;
	private httpServer!: http.Server;

	constructor(config: ServerConfig) {
		this.port = config.port;
		this.app = config.app;
	}

	async start(): Promise<void> {
		this.httpServer = http.createServer(this.app);
		this.httpServer.listen(this.port, () => {
			logger.info(`SERVER is listening on port: ${this.port}`);
		});
	}

	stop(): void {
		this.httpServer?.close();
		logger.warn(`SERVER is stopped port: ${this.port}`);
	}
}
