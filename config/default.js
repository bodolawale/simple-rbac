const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	port: process.env.PORT ?? '7070',
	node_env: process.env.NODE_ENV ?? 'development',
	postgres: {
		url: process.env.DB_POSTGRESQL ?? 'postgres://postgres:postgres@localhost:5432/simple-rbac',
		options: {
			dialect: 'postgres',
			logging: process.env.DB_POSTGRESQL_LOGGING ?? false
		}
	}
};
