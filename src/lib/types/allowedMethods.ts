import type { Content } from './content';
import type { File, Files } from './file';
import type { Site } from './site';

export interface allowedMethodsForChildren {
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

export interface allowedMethodsForFiles {
	audio: () => Files;
	code: () => Files;
	documents: () => Files;
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
	hasImages: () => boolean;
	hasVideos: () => boolean;
	image: (filename?: string) => File | null;
	images: () => Files;
	videos: () => Files;
}

export interface allowedMethodsForModels {
	apiUrl: () => string;
	blueprint: () => any;
	content: () => Content;
	dragText: any;
	exists: any;
	id: () => string;
	mediaUrl: any;
	modified: any;
	permissions: any;
	panel: any;
	permalink: any;
	previewUrl: any;
	url: any;
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
	isLast: any;
	isNth: any;
}

export interface AllowedMethodsForParents {
	parent: any;
	parentId: any;
	parentModel: any;
	site: () => Site;
}
