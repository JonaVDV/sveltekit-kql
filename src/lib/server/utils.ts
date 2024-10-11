import type { Field } from '$lib/types/field';
import type { Site } from '$lib/types/site';
import type { Page } from '$lib/types/page';
import type { App } from '$lib/types/app';
import type { File } from '$lib/types/file';

export const kirbyContext = {
	page: createKQLProxy<AddUserDefinedProps<Page>>('page'),
	site: createKQLProxy('site'),
	kirby: createKQLProxy('kirby'),
	file: createKQLProxy('file')
};

type ProxyHandler<T> = {
	get(target: T, prop: string | symbol, receiver: any): any;
	apply(target: T, thisArg: any, argArray?: any): any;
};

globalThis.page = kirbyContext.page;
globalThis.site = kirbyContext.site;
globalThis.kirby = kirbyContext.kirby;
globalThis.file = kirbyContext.file;

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

export function transformQuery<T extends object>(query: T): Record<string, any> {
	// get every key with the name 'query' and call the toString method to get the path
	const transformedQuery = Object.fromEntries(
		Object.entries(query).map(([key, value]) => {
			if (key === 'query') {
				return [key, value.toString()];
			}
			if (typeof value === 'object') {
				return [key, transformQuery(value)];
			}
			return [key, value];
		})
	);
	return transformedQuery;
}

declare global {
	function page(page?: string): KirbyContext['page'];
	function site(): KirbyContext['site'];
	function kirby(): KirbyContext['kirby'];
	function file(): KirbyContext['file'];
}

export type AddUserDefinedProps<T> = T extends { __extra: infer Extra }
	? Omit<T, '__extra'> & { [key: string]: Extra }
	: T;

export type Expand<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: Expand<O[K]> }
		: never
	: T;

interface KirbyContext {
	page: AddUserDefinedProps<Page>;
	site: AddUserDefinedProps<Site>;
	kirby: App;
	file: AddUserDefinedProps<File>;
}
