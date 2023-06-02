const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	port: process.env.PORT ?? '7070',
	node_env: process.env.NODE_ENV ?? 'development'
};
