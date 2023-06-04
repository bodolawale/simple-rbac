import { Sequelize, type Dialect } from 'sequelize';
import { ConsoleLogger } from '../../logger';

const logger = new ConsoleLogger('sequelize');

interface SequelizeDriverConfig {
	url: string;
	options: {
		logging: false | (() => void);
		dialect: Dialect;
	};
}

export class SequelizeDriver {
	private readonly sequelize: Sequelize;
	constructor(config: SequelizeDriverConfig) {
		this.sequelize = new Sequelize(config.url, config.options);
	}

	async authenticate(): Promise<void> {
		try {
			await this.sequelize.authenticate();
			logger.info('Postgresql started successfully');
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	loadModels(): { sequelize: Sequelize } & Record<string, any> {
		try {
			const db: any = {};
			db.sequelize = this.sequelize;
			return db;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}
}
