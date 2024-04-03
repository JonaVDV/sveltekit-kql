import { describe, it, expect } from 'vitest';
import { _generateTypes } from '../../types/generate';

describe('_generateTypes test', () => {
	it('should generate types for a simple object', () => {
		const data = new Map<string, any>([
			['name', 'John'],
			['age', 30],
			['isStudent', true]
		]);

		const expected = `"name": string;\n"age": number;\n"isStudent": boolean;\n`;
		expect(_generateTypes(data)).toBe(expected);
	});

	it('should generate types for nested objects', () => {
		const data = new Map<string, any>([
			[
				'person',
				new Map<string, any>([
					['name', 'John'],
					['age', 30]
				])
			],
			['isStudent', true]
		]);

		const expected = `"person": {
  "name": string;
  "age": number;
}
"isStudent": boolean;\n`;
		expect(_generateTypes(data)).toBe(expected);
	});

	it('should generate types for arrays of objects', () => {
		const data = new Map<string, any>([
			[
				'students',
				[
					new Map<string, any>([
						['name', 'John'],
						['age', 30]
					]),
					new Map<string, any>([
						['name', 'Jane'],
						['age', 25]
					])
				]
			],
			['isStudent', true]
		]);

		const expected = `"students": Array<{
  "name": string;
  "age": number;
}>
"isStudent": boolean;\n`;
		expect(_generateTypes(data)).toBe(expected);
	});
});
