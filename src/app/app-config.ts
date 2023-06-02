import Joi from 'joi';
import { NODE_ENV } from './consts';

export interface AppConfig {
	port: number;
	node_env: string;
}

const appConfigJoiValidator = Joi.object<AppConfig>({
	port: Joi.number().integer().min(1).max(65535).required(),
	node_env: Joi.string().valid(...Object.values(NODE_ENV))
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function loadAppConfig(rawConfig: any): AppConfig {
	const validationResult = appConfigJoiValidator.validate(rawConfig, { stripUnknown: true });
	if (validationResult.error != null) {
		throw validationResult.error;
	}
	return validationResult.value;
}
