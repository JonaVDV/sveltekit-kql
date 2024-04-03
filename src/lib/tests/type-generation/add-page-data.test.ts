import { describe, it, expect } from 'vitest';
import { AddPageData } from '../../types/generate';

describe('AddPageData test', () => {
	it('should generate the correct KQLData type', () => {
		const expected = "type QueryType = {\nquery: string;\nselect?: string[] | Record<string, string | number | boolean | QueryType>;\n};\ntype QueryArrayType = QueryType[];\ntype ExcludeQueries<T> = {\n[K in keyof T]: T[K] extends QueryArrayType | QueryType ? never : T[K];\n};\ntype RemoveNever<T> = T extends any[] \n? RemoveNever<T[number]>[]\n: Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;\ntype ParentData = Expand<RemoveNever<ExcludeQueries<Omit<import('./$types').PageParentData, keyof import('./$types').PageServerData>>>>;\ntype KQLData = Expand<RemoveNever<ExcludeQueries<import('./$types').PageServerData>> & ParentData & Data>;"

		expect(AddPageData()).toBe(expected);
	});
});