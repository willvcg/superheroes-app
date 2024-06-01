// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			prettier.rules,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended
		],
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase'
				}
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case'
				}
			],
			'@typescript-eslint/explicit-function-return-type': ['error'],
			'@typescript-eslint/no-useless-constructor': ['error']
		}
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {}
	}
);
