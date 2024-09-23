import type { App, Page, Site, File } from '$lib/types/testing';

export const kirbyContext: KirbyContext = {
	page: createKQLProxy('page'),
	site: createKQLProxy('site'),
	kirby: createKQLProxy('kirby'),
	file: createKQLProxy('file')
};

function createKQLProxy(path = ''): any {
	return new Proxy(() => {}, {
		get: (target, prop) => {
			// Return a new proxy with the property appended to the current path
			if (prop === 'toString') {
				// When 'toString' is accessed, return the path as the final string
				return () => path;
			}
			// Accumulate the method/property name
			return createKQLProxy(path + (path ? '.' : '') + String(prop));
		},
		apply: (target, thisArg, args) => {
			// this could break if the arguments are functions since they can not be serialized
			const argsString = args.length
				? `(${args.map((arg) => JSON.stringify(arg)).join(', ')})`
				: '()';
			return createKQLProxy(path + argsString);
		}
	});
}

declare global {
	function page(page?: string): KirbyContext['page'];
	function site(): KirbyContext['site'];
	function kirby(): KirbyContext['kirby'];
	function file(): KirbyContext['file'];
}

interface KirbyContext {
	page: Page;
	site: Site;
	kirby: App;
	file: File;
}
