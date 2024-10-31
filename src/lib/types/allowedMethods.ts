import type { Content } from './content';
import type { File, Files } from './file';
import type { Page, Pages } from './page';
import type { Site } from './site';

export interface allowedMethodsForChildren {
	/**Returns all published children*/
	children: () => Pages;
	/**
	 * Returns all published and draft children at the same time
	 */
	childrenAndDrafts: () => Pages;
	/**
	 * Searches for a draft child by ID
	 * @param path the id of the child
	 * @returns the found page or null if not found
	 */
	draft: (path: string) => Page | null;
	/**
	 * Returns all draft children
	 * @returns the draft children
	 */
	drafts: () => Pages;
	/**
	 * Finds one or multiple published children by their id
	 * @param args
	 * @returns the found page or pages or null if not found
	 */
	find: (...args: string[]) => Page | Pages | null;
	/**
	 * Finds a single published or draft child
	 * @param path the path of the child
	 */
	findPageOrDraft: (path: string) => Page | null;
	/**
	 * Returns a collection of all published children of published children
	 */
	grandChildren: () => Pages;
	/**
	 * Checks if the model has any published children
	 */
	hasChildren: () => boolean;
	/**
	 * Checks if the model has any draft children
	 */
	hasDrafts: () => boolean;
	/**
	 * Checks if the model has any listed children
	 */
	hasListedChildren: () => boolean;
	/**
	 * Checks if the model has any unlisted children
	 */
	hasUnlistedChildren: () => boolean;
	/**
	 * Creates a flat child index
	 * @param drafts if set to true, draft children are included
	 * @returns the child index
	 */
	index: (drafts?: boolean) => Pages;
	/**
	 * Search all pages within the current page
	 * @param query the search query
	 * @returns the search result
	 */
	search: (query?: string) => Pages;
}

export interface allowedMethodsForFiles {
	/** Filters the Files collection by type audio*/
	audio: () => Files;
	/**Filters the Files collection by type code*/
	code: () => Files;
	/**
	 * Filters the Files collection by type document
	 */
	documents: () => Files;
	/**Returns a specific file by filename or the first one*/
	file: (filename?: string) => File;
	/**Returns the Files collection */
	files: () => Files;
	hasAudio: () => boolean;
	/**Checks if the Files collection has any code files*/
	hasCode: () => boolean;
	/**Checks if the Files collection has any document files*/
	hasDocuments: () => boolean;
	/**Checks if the Files collection has any files*/
	hasFiles: () => boolean;
	/**Checks if the Files collection has any images*/
	hasImages: () => boolean;
	/**Checks if the Files collection has any video */
	hasVideos: () => boolean;
	/**
	 * Returns a specific image by filename or the first one
	 * @param filename the filename of the image
	 * @returns the image or null if not found
	 */
	image: (filename?: string) => File | null;
	/**
	 * Filters the Files collection by type image
	 * @returns the filtered collection
	 */
	images: () => Files;
	/**
	 * Filters the Files collection by type video
	 * @returns the filtered collection
	 */
	videos: () => Files;
}

export interface allowedMethodsForModels {
	apiUrl: () => string;
	blueprint: () => any;
	/**Returns the content */
	content: () => Content;
	dragText: any;
	exists: any;
	id: () => string;
	mediaUrl: any;
	modified: any;
	permissions: any;
	panel: any;
	/**
	 * Return the permanent URL to the page using its UUID
	 */
	permalink: () => string | null;
	previewUrl: any;
	/**
	 * Returns the Url
	 */
	url: () => string;
}

export interface AllowedMethodsForSiblings {
	indexOf: any;
	next: any;
	nextAll: any;
	prev: any;
	prevAll: any;
	siblings: any;
	hasNext: any;
	hasPrev: any;
	isFirst: any;
	/**
	 * Checks if the item is the last in the collection
	 */
	isLast: () => boolean;
	/**
	 * Checks if the item is at a certain position
	 * @param n
	 * @returns
	 */
	isNth: (n: number) => boolean;
}

export interface AllowedMethodsForParents {
	parent: any;
	parentId: any;
	parentModel: any;
	site: () => Site;
}
