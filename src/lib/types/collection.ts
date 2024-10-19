import type { Pages } from './page';

export interface Collection<TObject> {
	__collection: TObject;

	findBy: (attribute: string, value: any) => Array<any>;
	has: (key: string) => boolean;
	not: (keys: string[]) => Collection<TObject>;
	pagination: () => Array<any>;
	chunk: (size: number) => Array<any>;
	filterBy: (args: Array<any>) => Array<any>;
	find: (keys: Array<string>) => Array<any>;
	findByKey: (key: string) => Array<any>;
	first: () => TObject;
	flip: () => Collection<TObject>;
	groupBy: (args: Array<any>) => Array<any>;
	isEmpty: () => boolean;
	isEven: () => boolean;
	isNotEmpty: () => boolean;
	isOdd: () => boolean;
	last: () => Array<any>;
	limit: (limit: number) => Array<any>;
	nth: (n: number) => Array<any>;
	offset: (offset: number) => Array<any>;
	// pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (...args: Array<string>) => Pages;
	without: (keys: Array<any>) => Array<any>;
	keys: () => string[];
	prev: () => TObject | null;
	next: () => TObject | null;
	count: () => number;
}
