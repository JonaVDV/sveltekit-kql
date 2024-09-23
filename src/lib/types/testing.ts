import type { SiteModel } from './models';

const testingQuery = {
	query: page('home'),
	select: {
		title: true
	}
};

console.log(JSON.stringify(testingQuery));

interface allowedMethodsForChildren {
	children: any;
	childrenAndDrafts: any;
	draft: any;
	drafts: any;
	find: any;
	findPageOrDraft: any;
	grandChildren: any;
	hasChildren: any;
	hasDrafts: any;
	hasListedChildren: any;
	hasUnlistedChildren: any;
	index: any;
	search: any;
}

interface allowedMethodsForFiles {
	audio: any;
	code: any;
	documents: any;
	file: any;
	files: any;
	hasAudio: any;
	hasCode: any;
	hasDocuments: any;
	hasFiles: any;
	hasImages: any;
	hasVideos: any;
	image: any;
	images: any;
	videos: any;
}

interface allowedMethodsForModels {
	apiUrl: any;
	blueprint: any;
	content: any;
	dragText: any;
	exists: any;
	id: any;
	mediaUrl: any;
	modified: any;
	permissions: any;
	panel: any;
	permalink: any;
	previewUrl: any;
	url: any;
}

interface AllowedMethodsForSiblings {
	indexOf: any;
	next: any;
	nextAll: any;
	prev: any;
	prevAll: any;
	siblings: any;
	hasNext: any;
	hasPrev: any;
	isFirst: any;
	isLast: any;
	isNth: any;
}

interface AllowedMethodsForParents {
	parent: any;
	parentId: any;
	parentModel: any;
	site: any;
}

interface PageToArray {
	children: any;
	content: any;
	drafts: any;
	files: any;
	id: any;
	intendedTemplate: any;
	isHomePage: any;
	isErrorPage: any;
	num: any;
	template: any;
	title: any;
	slug: any;
	status: any;
	uid: any;
	url: any;
}

export interface Page
	extends allowedMethodsForChildren,
		allowedMethodsForFiles,
		allowedMethodsForModels,
		AllowedMethodsForSiblings,
		AllowedMethodsForParents {
	apiUrl: (relative: boolean | true) => string;
	blueprint: () => Blueprint;
	blueprints: (inSection: string) => Array<Blueprint>;
	depth: () => number;
	exists: () => boolean;
	hasTemplate: () => boolean;
	id: () => string;
	intendedTemplate: () => Template;
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
	search: (query: string, params: Array | string) => Pages;
	slug: (languageCode: string) => string;
	status: () => string;
	template: () => Template;
	title: () => Field;
	uid: () => string;
	uri: (languageCode: string) => string;
	url: (options: Array<any>) => string;
	content: (languageCode: string) => Content;
	site: () => Site;
	children: () => Pages;
	childrenAndDrafts: () => Pages;
	draft: (path: string) => Page;
	drafts: () => Pages;
	find: (arguments: Array | string) => Page | Pages | null;
	findPageOrDraft: (path: string) => Page;
	grandChildren: () => Pages;
	hasChildren: () => boolean;
	hasDrafts: () => boolean;
	hasListedChildren: () => boolean;
	hasUnlistedChildren: () => boolean;
	index: (drafts: boolean) => Pages;
	audio: () => Files;
	code: () => Files;
	documents: () => Files;
	// file: (filename: string, in: string) => File,
	files: () => Files;
	hasAudio: () => boolean;
	hasCode: () => boolean;
	hasDocuments: () => boolean;
	hasFiles: () => boolean;
	hasImages: () => boolean;
	hasVideos: () => boolean;
	image: (filename: string) => File;
	images: () => Files;
	videos: () => Files;
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
}

interface Blocks {
	excerpt: (args: any) => string;
	toHtml: () => string;
	findBy: (attribute: string, value: Array<any>) => Array<any>;
	has: (key: Array<any>) => boolean;
	not: (keys: Array<any>) => Array<any>;
	pagination: () => Array<any>;
	chunk: (size: number) => Array<any>;
	filterBy: (args: Array<any>) => Array<any>;
	find: (keys: Array<any>) => Array<any>;
	findByKey: (key: string) => Array<any>;
	first: () => Array<any>;
	flip: () => Array<any>;
	groupBy: (args: Array<any>) => Array<any>;
	isEmpty: () => boolean;
	isEven: () => boolean;
	isNotEmpty: () => boolean;
	isOdd: () => boolean;
	last: () => Array<any>;
	limit: (limit: number) => Array<any>;
	nth: (n: number) => Array<any>;
	offset: (offset: number) => Array<any>;
	pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (args: Array<any>) => Array<any>;
	without: (keys: Array<any>) => Array<any>;
	keys: () => Array;
	prev: () => any;
	next: () => any;
	count: () => number;
}

type MightReturnNull<T> = T | null;

interface Collection<TObject> {
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
	pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (args: Array<any>) => Array<any>;
	without: (keys: Array<any>) => Array<any>;
	keys: () => string[];
	prev: () => MightReturnNull<TObject>;
	next: () => MightReturnNull<TObject>;
	count: () => number;
}

interface Files extends Collection<File> {}

interface Layouts {
	findBy: (attribute: string, value: Array<any>) => Array<any>;
	has: (key: Array<any>) => boolean;
	not: (keys: Array<any>) => Array<any>;
	pagination: () => Array<any>;
	chunk: (size: number) => Array<any>;
	filterBy: (args: Array<any>) => Array<any>;
	find: (keys: Array<any>) => Array<any>;
	findByKey: (key: string) => Array<any>;
	first: () => Array<any>;
	flip: () => Array<any>;
	groupBy: (args: Array<any>) => Array<any>;
	isEmpty: () => boolean;
	isEven: () => boolean;
	isNotEmpty: () => boolean;
	isOdd: () => boolean;
	last: () => Array<any>;
	limit: (limit: number) => Array<any>;
	nth: (n: number) => Array<any>;
	offset: (offset: number) => Array<any>;
	pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (args: Array<any>) => Array<any>;
	without: (keys: Array<any>) => Array<any>;
	keys: () => Array;
	prev: () => any;
	next: () => any;
	count: () => number;
}

interface Pages {
	audio: () => Files;
	children: () => Pages;
	code: () => Files;
	documents: () => Files;
	drafts: () => Pages;
	files: () => Files;
	findByKey: (key: string) => Page;
	images: () => Files;
	index: (drafts: boolean) => Array<any>;
	listed: () => Pages;
	unlisted: () => static;
	notTemplate: (templates: Array<any>) => Array<any>;
	nums: () => Array;
	published: () => static;
	template: (templates: Array<any>) => Array<any>;
	videos: () => Files;
	findBy: (attribute: string, value: Array<any>) => Array<any>;
	has: (key: Array<any>) => boolean;
	not: (keys: Array<any>) => Array<any>;
	pagination: () => Array<any>;
	search: (query: string, params: Array | string) => static;
	chunk: (size: number) => Array<any>;
	filterBy: (args: Array<any>) => Array<any>;
	find: (keys: Array<any>) => Array<any>;
	first: () => Array<any>;
	flip: () => Array<any>;
	groupBy: (args: Array<any>) => Array<any>;
	isEmpty: () => boolean;
	isEven: () => boolean;
	isNotEmpty: () => boolean;
	isOdd: () => boolean;
	last: () => Array<any>;
	limit: (limit: number) => Array<any>;
	nth: (n: number) => Array<any>;
	offset: (offset: number) => Array<any>;
	pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (args: Array<any>) => Array<any>;
	without: (keys: Array<any>) => Array<any>;
	keys: () => Array;
	prev: () => any;
	next: () => any;
	count: () => number;
}

interface User {
	apiUrl: (relative: boolean) => string;
	avatar: () => File;
	blueprint: () => UserBlueprint;
	email: () => string;
	exists: () => boolean;
	id: () => string;
	isAdmin: () => boolean;
	language: () => string;
	mediaUrl: () => string;
	modified: (format: string, handler: string, languageCode: string) => string | number | false;
	name: () => Field;
	panel: () => User;
	permissions: () => UserPermissions;
	role: () => Role;
	username: () => string;
	content: (languageCode: string) => Content;
	audio: () => Files;
	code: () => Files;
	documents: () => Files;
	// file: (filename: string, in: string) => File,
	files: () => Files;
	hasAudio: () => boolean;
	hasCode: () => boolean;
	hasDocuments: () => boolean;
	hasFiles: () => boolean;
	hasImages: () => boolean;
	hasVideos: () => boolean;
	image: (filename: string) => File;
	images: () => Files;
	videos: () => Files;
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
}

export interface File {
	// apiUrl: (relative: boolean) => string,
	// blueprint: () => FileBlueprint,
	// filename: () => string,
	// files: () => Files,
	// html: (attr: Array) => string,
	// id: () => string,
	// mediaUrl: () => string,
	// modified: (format: IntlDateFormatter|string|null, handler: string, languageCode: string) => string|number|false,
	// panel: () => File,
	// parent: () => Page|Site|User,
	// parentId: () => string,
	// permalink: () => string,
	// permissions: () => FilePermissions,
	// site: () => Site,
	// template: () => string,
	// templateSiblings: (self: boolean) => Files,
	// url: () => string,
	// previewUrl: () => string,
	// content: (languageCode: string) => Content,
	// blur: (pixels: number|boolean) => FileVersion|File|Asset,
	// bw: () => FileVersion|File|Asset,
	// crop: (width: number, height: number, options: Array<any>) => FileVersion|File|Asset,
	// grayscale: () => FileVersion|File|Asset,
	// greyscale: () => FileVersion|File|Asset,
	// resize: (width: number, height: number, quality: number) => FileVersion|File|Asset,
	// srcset: (sizes: Array<string>|string|null) => string,
	// thumb: (options: Array<any>|string|null) => FileVersion|File|Asset,
	// indexOf: (collection: Array<any>) => number|false,
	// next: (collection: Array<any>) => Array<any>,
	// nextAll: (collection: Array<any>) => Array<any>,
	// prev: (collection: Array<any>) => Array<any>,
	// prevAll: (collection: Array<any>) => Array<any>,
	// siblings: (self: boolean) => Array<any>,
	// hasNext: (collection: Array<any>) => boolean,
	// hasPrev: (collection: Array<any>) => boolean,
	// isFirst: (collection: Array<any>) => boolean,
	// isLast: (collection: Array<any>) => boolean,
	// isNth: (n: number, collection: Array<any>) => boolean,
	// exists: () => boolean,
	// type: () => string,
}

interface Structure {
	findBy: (attribute: string, value: Array<any>) => Array<any>;
	has: (key: Array<any>) => boolean;
	not: (keys: Array<any>) => Array<any>;
	pagination: () => Array<any>;
	chunk: (size: number) => Array<any>;
	filterBy: (args: Array<any>) => Array<any>;
	find: (keys: Array<any>) => Array<any>;
	findByKey: (key: string) => Array<any>;
	first: () => Array<any>;
	flip: () => Array<any>;
	groupBy: (args: Array<any>) => Array<any>;
	isEmpty: () => boolean;
	isEven: () => boolean;
	isNotEmpty: () => boolean;
	isOdd: () => boolean;
	last: () => Array<any>;
	limit: (limit: number) => Array<any>;
	nth: (n: number) => Array<any>;
	offset: (offset: number) => Array<any>;
	pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (args: Array<any>) => Array<any>;
	without: (keys: Array<any>) => Array<any>;
	keys: () => Array<string>;
	prev: () => any;
	next: () => any;
	count: () => number;
}

interface Users {
	findByKey: (key: string) => User;
	role: (role: string) => static;
	findBy: (attribute: string, value: Array<any>) => Array<any>;
	has: (key: Array<any>) => boolean;
	not: (keys: Array<any>) => Array<any>;
	pagination: () => Array<any>;
	chunk: (size: number) => Array<any>;
	filterBy: (args: Array<any>) => Array<any>;
	find: (keys: Array<any>) => Array<any>;
	first: () => Array<any>;
	flip: () => Array<any>;
	groupBy: (args: Array<any>) => Array<any>;
	isEmpty: () => boolean;
	isEven: () => boolean;
	isNotEmpty: () => boolean;
	isOdd: () => boolean;
	last: () => Array<any>;
	limit: (limit: number) => Array<any>;
	nth: (n: number) => Array<any>;
	offset: (offset: number) => Array<any>;
	pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (args: Array<any>) => Array<any>;
	without: (keys: Array<any>) => Array<any>;
	keys: () => Array;
	prev: () => any;
	next: () => any;
	count: () => number;
}

interface FileVersion {
	id: () => string;
	exists: () => boolean;
	type: () => string;
	url: () => string;
}

interface StructureObject {
	content: () => Content;
	id: () => string;
	parent: () => ModelWithContent;
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
}

export interface App {
	collection: (name: string, options: Array) => Array<any>;
	defaultLanguage: () => Language;
	detectedLanguage: () => Language;
	file: (path: string, parent: any, drafts: boolean) => File;
	language: (code: string) => Language;
	languageCode: (languageCode: string) => string;
	languages: (clone: boolean) => Languages;
	multilang: () => boolean;
	page: (id: string, parent: Page | Site | null, drafts: boolean) => Page;
	roles: () => Roles;
	site: () => Site;
	url: (type: string, object: boolean) => Uri | string | null;
	version: () => string;
	translation: (locale: string) => Translation;
	translations: () => Translations;
	user: (id: string, allowImpersonation: boolean) => User;
	users: () => Users;
}

interface LayoutColumn {
	blocks: (includeHidden: boolean) => Blocks;
	isEmpty: () => boolean;
	isNotEmpty: () => boolean;
	span: (columns: number) => number;
	width: () => string;
	id: () => string;
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
}

interface Blueprint {
	field: (name: string) => Array;
	fields: () => Array;
	isDefault: () => boolean;
	name: () => string;
	section: (name: string) => Section;
	sections: () => Array;
	tab: (name: string) => Array;
	tabs: () => Array;
	title: () => string;
}

interface Translation {
	author: () => string;
	code: () => string;
	data: () => Array;
	dataWithFallback: () => Array;
	direction: () => string;
	// get: (key: string, default: string) => string,
	id: () => string;
	locale: () => string;
	name: () => string;
}

interface Block {
	content: () => Content;
	isEmpty: () => boolean;
	isHidden: () => boolean;
	isNotEmpty: () => boolean;
	type: () => string;
	toField: () => Field;
	toHtml: () => string;
	id: () => string;
	parent: () => ModelWithContent;
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
}

interface Layout {
	attrs: () => Content;
	columns: () => LayoutColumns;
	isEmpty: () => boolean;
	isNotEmpty: () => boolean;
	id: () => string;
	parent: () => ModelWithContent;
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
}

interface Files {
	// findByKey: (key: string) => File,
	// template: (template: Array|string|null) => static,
	// findBy: (attribute: string, value: Array<any>) => Array<any>,
	// has: (key: Array<any>) => boolean,
	// not: (keys: Array<any>) => Array<any>,
	// pagination: () => Array<any>,
	// chunk: (size: number) => Array<any>,
	// filterBy: (args: Array<any>) => Array<any>,
	// find: (keys: Array<any>) => Array<any>,
	// first: () => Array<any>,
	// flip: () => Array<any>,
	// groupBy: (args: Array<any>) => Array<any>,
	// isEmpty: () => boolean,
	// isEven: () => boolean,
	// isNotEmpty: () => boolean,
	// isOdd: () => boolean,
	// last: () => Array<any>,
	// limit: (limit: number) => Array<any>,
	// nth: (n: number) => Array<any>,
	// offset: (offset: number) => Array<any>,
	// pluck: (field: string, split: string, unique: boolean) => Array<any>,
	// shuffle: () => Array<any>,
	// slice: (offset: number, limit: number) => Array<any>,
	// sortBy: (args: Array<any>) => Array<any>,
	// without: (keys: Array<any>) => Array<any>,
	// keys: () => Array<string>,
	// prev: () => any,
	// next: () => any,
	// count: () => number,
}

export interface Site {
	apiUrl: (relative: boolean) => string;
	blueprint: () => Blueprint;
	breadcrumb: () => Pages;
	errorPage: () => Page;
	errorPageId: () => string;
	exists: () => boolean;
	homePage: () => Page;
	homePageId: () => string;
	mediaUrl: () => string;
	modified: (format: string, handler: string) => string | number;
	page: (path: string) => Page;
	pages: () => Pages;
	panel: () => Site;
	permissions: () => SitePermissions;
	previewUrl: () => string;
	search: (query: string, params: Array | string) => Pages;
	url: (language: string) => string;
	blueprints: (inSection: string) => Array;
	content: (languageCode: string) => Content;
	id: () => string;
	children: () => Pages;
	childrenAndDrafts: () => Pages;
	draft: (path: string) => Page;
	drafts: () => Pages;
	find: (arguments: Array<string> | string) => Page | Pages | null;
	findPageOrDraft: (path: string) => Page;
	grandChildren: () => Pages;
	hasChildren: () => boolean;
	hasDrafts: () => boolean;
	hasListedChildren: () => boolean;
	hasUnlistedChildren: () => boolean;
	index: (drafts: boolean) => Pages;
	audio: () => Files;
	code: () => Files;
	documents: () => Files;
	// file: (filename: string, in: string) => File,
	files: () => Files;
	hasAudio: () => boolean;
	hasCode: () => boolean;
	hasDocuments: () => boolean;
	hasFiles: () => boolean;
	hasImages: () => boolean;
	hasVideos: () => boolean;
	image: (filename: string) => File;
	images: () => Files;
	videos: () => Files;
}

interface LayoutColumns {
	findBy: (attribute: string, value: Array<any>) => Array<any>;
	has: (key: Array<any>) => boolean;
	not: (keys: Array<any>) => Array<any>;
	pagination: () => Array<any>;
	chunk: (size: number) => Array<any>;
	filterBy: (args: Array<any>) => Array<any>;
	find: (keys: Array<any>) => Array<any>;
	findByKey: (key: string) => Array<any>;
	first: () => Array<any>;
	flip: () => Array<any>;
	groupBy: (args: Array<any>) => Array<any>;
	isEmpty: () => boolean;
	isEven: () => boolean;
	isNotEmpty: () => boolean;
	isOdd: () => boolean;
	last: () => Array<any>;
	limit: (limit: number) => Array<any>;
	nth: (n: number) => Array<any>;
	offset: (offset: number) => Array<any>;
	pluck: (field: string, split: string, unique: boolean) => Array;
	shuffle: () => Array<any>;
	slice: (offset: number, limit: number) => Array<any>;
	sortBy: (args: Array<any>) => Array<any>;
	without: (keys: Array<any>) => Array<any>;
	keys: () => Array;
	prev: () => any;
	next: () => any;
	count: () => number;
}
