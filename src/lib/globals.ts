import type { Site } from './types/site';
import type { Page } from './types/page';
import type { App } from './types/app';
import type { File } from './types/file';

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

declare global {
	function page(page?: string): KirbyContext['page'];
	function site(): KirbyContext['site'];
	function kirby(): KirbyContext['kirby'];
	function file(): KirbyContext['file'];
}

export type AddUserDefinedProps<T> = T extends { __extra: infer Extra }
	? Omit<T, '__extra'> & { [key: string]: Extra }
	: T;

interface KirbyContext {
	page: AddUserDefinedProps<Page>;
	site: AddUserDefinedProps<Site>;
	kirby: App;
	file: AddUserDefinedProps<File>;
}

globalThis.page = kirbyContext.page;
globalThis.site = kirbyContext.site;
globalThis.kirby = kirbyContext.kirby;
globalThis.file = kirbyContext.file;
