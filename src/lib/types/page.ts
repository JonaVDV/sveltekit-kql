import type {
	allowedMethodsForChildren,
	allowedMethodsForFiles,
	allowedMethodsForModels,
	AllowedMethodsForParents,
	AllowedMethodsForSiblings
} from './allowedMethods';
import type { Collection } from './collection';
import type { Content } from './content';
import type { Field } from './field';
import type { Files } from './file';
import type { Site } from './site';

export interface Page
	extends allowedMethodsForChildren,
		allowedMethodsForFiles,
		allowedMethodsForModels,
		AllowedMethodsForSiblings,
		AllowedMethodsForParents {
	__extra: Field;
	__default: {
		children: string[];
		content: {
			[key: string]: string;
		};
		drafts: string[];
		files: any[];
		id: string;
		intendedTemplate: string;
		isHomePage: boolean;
		isErrorPage: boolean;
		num: number;
		template: string;
		title: string;
		slug: string;
		status: string;
		uid: string;
		url: string;
	};
	// apiUrl: (relative: boolean | true) => string;
	blueprint: () => Blueprint;
	blueprints: (inSection: string) => Array<Blueprint>;
	depth: () => number;
	exists: () => boolean;
	hasTemplate: () => boolean;
	id: () => string;
	// intendedTemplate: () => Template;
	isDraft: () => boolean;
	isErrorPage: () => boolean;
	isHomePage: () => boolean;
	isHomeOrErrorPage: () => boolean;
	isListed: () => boolean;
	isReadable: () => boolean;
	isSortable: () => boolean;
	isUnlisted: () => boolean;
	mediaUrl: () => string;
	modified: (
		format: string,
		handler: string,
		languageCode: string
	) => string | number | false | null;
	num: () => number;
	panel: () => Page;
	parent: () => Page;
	parentId: () => string;
	parentModel: () => Page | Site;
	permalink: () => string;
	permissions: () => any;
	previewUrl: () => string;
	// search: (query: string, params: Array | string) => Pages;
	slug: (languageCode: string) => string;
	status: () => string;
	// template: () => Template;
	title: Field;
	uid: () => string;
	uri: (languageCode: string) => string;
	url: (options: Array<any>) => string;
	content: (languageCode?: string) => Content & { [key: string]: Field };
	site: () => Site;
	children: () => Pages;
	childrenAndDrafts: () => Pages;
	draft: (path: string) => Page;
	drafts: () => Pages;
	// find: (arguments: Array | string) => Page | Pages | null;
	findPageOrDraft: (path: string) => Page;
	grandChildren: () => Pages;
	hasChildren: () => boolean;
	hasDrafts: () => boolean;
	hasListedChildren: () => boolean;
	hasUnlistedChildren: () => boolean;
	index: (drafts: boolean) => Pages;
	indexOf: (collection: Array<any>) => number | false;
	next: (collection: Array<any>) => Array<any>;
	nextAll: (collection: Array<any>) => Array<any>;
	prev: (collection: Array<any>) => Array<any>;
	prevAll: (collection: Array<any>) => Array<any>;
	siblings: (self: boolean) => Array<any>;
	hasNext: (collection: Array<any>) => boolean;
	hasPrev: (collection: Array<any>) => boolean;
	isFirst: (collection: Array<any>) => boolean;
	// isLast: (collection: Array<any>) => boolean;
	isNth: (n: number, collection: Array<any>) => boolean;
}

export interface Pages extends Collection<Page> {
	listed: () => Pages;
}
