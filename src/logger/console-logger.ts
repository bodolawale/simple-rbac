/* eslint-disable no-console */
import config from 'config';
import { type Logger } from './logger';

const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',

	fg: {
		black: '\x1b[30m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',
		gray: '\x1b[90m',
		crimson: '\x1b[38m' // Scarlet
	},
	bg: {
		black: '\x1b[40m',
		red: '\x1b[41m',
		green: '\x1b[42m',
		yellow: '\x1b[43m',
		blue: '\x1b[44m',
		magenta: '\x1b[45m',
		cyan: '\x1b[46m',
		white: '\x1b[47m',
		gray: '\x1b[100m',
		crimson: '\x1b[48m'
	}
};

export class ConsoleLogger implements Logger {
	private readonly prefix: string;
	constructor(source?: string) {
		const logSource = source ?? 'common';
		const nodeEnv: string = config.get('node_env'); // probably not the best way to do this
		this.prefix = `[${nodeEnv}] [${logSource}]`;
	}

	info(info: any): void {
		console.log(colors.fg.blue, `${this.prefix}`, info);
	}

	warn(info: any): void {
		console.warn(colors.fg.magenta, `${this.prefix}`, info);
	}

	debug(info: any): void {
		console.debug(colors.fg.cyan, `${this.prefix}`, info);
	}

	error(info: any): void {
		console.error(colors.fg.red, `${this.prefix}`, info);
	}
}
