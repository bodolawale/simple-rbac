export interface Logger {
	info: (info: any) => void;
	warn: (warn: any) => void;
	debug: (debug: any) => void;
	error: (error: any) => void;
}
