import Joi from 'joi';
import { NODE_ENV } from './consts';

interface PostgresConfig {
	url: string;
	options: {
		dialect: 'postgres';
		logging: boolean;
	};
}

export interface AppConfig {
	port: number;
	node_env: string;
	postgres: PostgresConfig;
}

const postgresConfigJoiValidator = Joi.object<PostgresConfig>({
	url: Joi.string().required(),
	options: Joi.object<PostgresConfig['options']>({
		logging: Joi.boolean(),
		dialect: 'postgres'
	}).required()
});

const appConfigJoiValidator = Joi.object<AppConfig>({
	port: Joi.number().integer().min(1).max(65535).required(),
	node_env: Joi.string()
		.valid(...Object.values(NODE_ENV))
		.required(),

	postgres: postgresConfigJoiValidator.required()
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function loadAppConfig(rawConfig: any): AppConfig {
	const validationResult = appConfigJoiValidator.validate(rawConfig, { stripUnknown: true });
	if (validationResult.error != null) {
		throw validationResult.error;
	}
	return validationResult.value;
}
