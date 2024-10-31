/**
 * @fileoverview Provides proxy-based query builders for the Kirby Query Language (KQL)
 * This module enables type-safe querying of Kirby CMS objects using JavaScript functions
 * instead of raw strings.
 */
import type { Site } from '../types/site';
import type { Page } from '../types/page';
import type { App } from '../types/app';
import type { File } from '../types/file';

/**
 * Defines the structure for a proxy handler that intercepts property access and function calls
 * @template T The type of object being proxied
 */
type ProxyHandler<T> = {
	get(target: T, prop: string | symbol, receiver: any): any;
	apply(target: T, thisArg: any, argArray?: any): any;
};
/**
 * Adds dynamic property access to a type that may have extra properties
 * @template T The base type that may contain an __extra property
 * @property `{T['__extra'] | any}` `[key: string]` Dynamic property accessor
 */
type WithDynamicProps<T extends { __extra?: any }> = T & {
	[key: string]: T extends { __extra: any } ? T['__extra'] : any;
};

/**
 * Creates a recursive proxy handler for building KQL queries
 * @template T The type of object being proxied
 * @param {string} path The current path in the query being built
 * @returns {ProxyHandler<T>} A proxy handler that builds the query string
 * @example
 * const handler = proxyHandler<Site>('site');
 * const proxy = new Proxy(target, handler);
 * proxy.title.toString() // Returns "site.title"
 */
function proxyHandler<T extends { __extra?: any }>(path: string): ProxyHandler<T> {
	return {
		get(_target, prop: string | symbol) {
			if (prop === 'toString') {
				return () => path;
			}
			return createKQLProxy(path + (path ? '.' : '') + String(prop));
		},
		apply(_target, _thisArg, args: unknown[]) {
			const argsString =
				args.length > 0 ? `(${args.map((arg) => JSON.stringify(arg)).join(', ')})` : '';
			return createKQLProxy(path + argsString);
		}
	};
}
/**
 * Creates a proxied object for building KQL queries
 * @template T The type of object to create a proxy for
 * @param {string} [path=''] The initial path for the query
 * @returns {WithDynamicProps<T>} A proxy object that can be used to build queries
 */
function createKQLProxy<T extends { __extra?: any }>(path: string = ''): WithDynamicProps<T> {
	// important to use Object.assign here to make sure that the target is a function
	const target = Object.assign(() => {}, {} as WithDynamicProps<T>);
	return new Proxy(target, proxyHandler<T>(path));
}

/**
 * Creates a query builder for the Kirby site object
 * @returns {WithDynamicProps<Site>} A proxy object for querying site properties
 * @example
 * site().title.toString() // Returns "site.title"
 */
export const site = (): WithDynamicProps<Site> => createKQLProxy<Site>('site');

/**
 * Creates a query builder for Kirby page objects
 * @param {string} [page] Optional page identifier
 * @returns {WithDynamicProps<Page>} A proxy object for querying page properties
 * @example
 * page().title.toString() // Returns "page.title"
 */
export const page = (page?: string): WithDynamicProps<Page> => createKQLProxy<Page>('page');

/**
 * Creates a query builder for the Kirby application object
 * @returns {WithDynamicProps<App>} A proxy object for querying Kirby app properties
 * @example
 * kirby().version().toString() // Returns "kirby.version()"
 */
export const kirby = (): WithDynamicProps<App> => createKQLProxy<App>('kirby');

/**
 * Creates a query builder for Kirby file objects
 * @returns {WithDynamicProps<File>} A proxy object for querying file properties
 * @example
 * file().filename.toString() // Returns "file.filename"
 */
export const file = (): WithDynamicProps<File> => createKQLProxy<File>('file');
