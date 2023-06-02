module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['standard-with-typescript', 'prettier', 'plugin:prettier/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json'
	},
	rules: {
		'no-console': 'error'
	}
};
