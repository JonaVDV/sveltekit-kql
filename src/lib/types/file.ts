import type { Collection } from './collection';
import type { Field } from './field';
import type { Page } from './page';
import type { Site } from './site';

export interface File {
	__extra: Field;
	__default: {
		extension: () => string;
		filename: () => string;
		height: () => number;
		id: () => string;
		mime: () => string;
		niceSize: () => string;
		template: () => string;
		type: () => string;
		url: () => string;
		width: () => number;
	};
	apiUrl: (relative: boolean) => string;
	blueprint: () => FileBlueprint;
	filename: () => string;
	files: () => Files;
	html: (attr: Array) => string;
	id: () => string;
	mediaUrl: () => string;
	modified: (
		format: string | null,
		handler: string,
		languageCode: string
	) => string | number | false;
	panel: () => File;
	parent: () => Page | Site | User;
	parentId: () => string;
	permalink: () => string;
	permissions: () => FilePermissions;
	site: () => Site;
	template: () => string;
	templateSiblings: (self: boolean) => Files;
	url: () => string;
	height: () => number;
	previewUrl: () => string;
	content: (languageCode: string) => Content;
	blur: (pixels: number | boolean) => File;
	bw: () => File;
	crop: (width: number, height: number, options: Array<any>) => File;
	grayscale: () => File;
	greyscale: () => File;
	resize: (width?: number, height?: number, quality?: number) => File;
	srcset: (sizes: Array<string> | string | null) => string;
	thumb: (options: Array<any> | string | null) => File;
	indexOf: (collection: Array<any>) => number | false;
	next: (collection: Array<any>) => Array<any>;
	nextAll: (collection: Array<any>) => Array<any>;
	prev: (collection: Array<any>) => Array<any>;
	prevAll: (collection: Array<any>) => Array<any>;
	siblings: (self: boolean) => Array<any>;
	hasNext: (collection: Array<any>) => boolean;
	hasPrev: (collection: Array<any>) => boolean;
	isFirst: (collection: Array<any>) => boolean;
	isLast: (collection: Array<any>) => boolean;
	isNth: (n: number, collection: Array<any>) => boolean;
	exists: () => boolean;
	type: () => string;
}

export interface Files extends Collection<File> {}
