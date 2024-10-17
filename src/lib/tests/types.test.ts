import type { Collection } from '$lib/types/collection';
import type { Field } from '$lib/types/field';
import type { Page } from '$lib/types/page';
import type {
	ExtractDefault,
	KQLQueryTypeResolver,
	IsCollection,
	WrapIfCollection,
	GetKeyFromQueryOrExtra,
	IsKeyBooleanType
} from '$lib/types/query-resolver';
import type { Site } from '$lib/types/site';
import { it, expect, expectTypeOf, describe, assertType, beforeAll } from 'vitest';

type Equals<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

type ProxyHandler<T> = {
	get(target: T, prop: string | symbol, receiver: any): any;
	apply(target: T, thisArg: any, argArray?: any): any;
};

function proxyHandler<T>(path: string): ProxyHandler<T> {
	return {
		get(target, prop) {
			if (prop === 'toString') {
				return () => path;
			}
			return createKQLProxy(path + (path ? '.' : '') + String(prop));
		},
		apply(target, thisArg, args) {
			const argsString =
				args.length > 0 ? `(${args.map((arg) => JSON.stringify(arg)).join(', ')})` : '';
			return createKQLProxy(path + argsString);
		}
	};
}

function createKQLProxy<T>(path = ''): T {
	return new Proxy(() => {}, proxyHandler<T>(path)) as unknown as T;
}

beforeAll(() => {
	globalThis.page = createKQLProxy('page');
	globalThis.site = createKQLProxy('site');
	globalThis.kirby = createKQLProxy('kirby');
	globalThis.file = createKQLProxy('file');
});

describe('KQLQueryTypeResolver', () => {
	it('should correctly infer the type of a short query', () => {
		const query = {
			query: {} as Page,
			select: {
				id: true,
				title: true
			}
		};

		type Expected = {
			id: string;
			title: string;
			// test: string;
		};

		type Result = KQLQueryTypeResolver<typeof query>;
		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it('should handle queries without select', () => {
		const query = {
			query: site()
		};

		type Expected = {
			title: string;
		};
		type Result = KQLQueryTypeResolver<typeof query>;

		let typeCheck = {} as Result;
		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});
});

describe('Extract Default type', () => {
	it('should extract the default type', () => {
		type Test = {
			__default: string;
		};

		type Expected = string;
		type Result = ExtractDefault<Test>;

		assertType<Equals<Result, Expected>>(true);
	});

	it('should return the object itself if there is no __default', () => {
		type Test = {
			__extra: string;
		};

		type Expected = Test;
		type Result = ExtractDefault<Test>;

		assertType<Equals<Result, Expected>>(true);
	});
});

describe('collection tests', () => {
	it('should return true if the type is a collection', () => {
		let test = {} as IsCollection<Collection<Page>>;
		expectTypeOf(test).toEqualTypeOf<true>();
	});

	it('should return false if the type is not a collection', () => {
		let test = {} as IsCollection<Page>;
		expectTypeOf(test).toEqualTypeOf<false>();
	});
});

describe('WrapIfCollection', () => {
	it('should wrap the type in an array if the query is a collection', () => {
		type Test = WrapIfCollection<{ test: string }, Collection<Page>>;
		expectTypeOf<Test>().toEqualTypeOf<Array<{ test: string }>>();
	});

	it('should return the type as is if the query is not a collection', () => {
		type Test = WrapIfCollection<{ test: string }, Page>;
		expectTypeOf<Test>().toEqualTypeOf<{ test: string }>();
	});
});

describe('GetKeyFromQueryOrExtra', () => {
	it('should return the key from the query if it exists', () => {
		type Result = GetKeyFromQueryOrExtra<Page, 'title'>;

		expectTypeOf<Result>().toEqualTypeOf<Page['title']>();
	});

	it('should return the key from the extra if it exists', () => {
		type Result = GetKeyFromQueryOrExtra<Page, 'test'>;

		expectTypeOf<Result>().toEqualTypeOf<Page['__extra']>();
	});
});

describe('isBooleanKeyType', () => {
	it('should return true if the key is a boolean', () => {
		const query = {
			query: page(),
			select: {
				title: true
			}
		};

		type Expected = true;

		type Result = IsKeyBooleanType<typeof query.select, 'title'>;

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it('should return false if the key is not a boolean', () => {
		const query = {
			query: page(),
			select: {
				title: true
			}
		};

		type Expected = false;

		type Result = IsKeyBooleanType<typeof query.select, 'test'>;

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});
});
