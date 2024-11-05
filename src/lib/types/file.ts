import type {
	allowedMethodsForModels,
	AllowedMethodsForParents,
	AllowedMethodsForSiblings
} from './allowedMethods';
import type { Collection } from './collection';
import type { Content } from './content';
import type { Field } from './field';
import type { Page } from './page';
import type { Site } from './site';

type CropPositions =
	| 'top left'
	| 'top'
	| 'top right'
	| 'left'
	| 'center'
	| 'right'
	| 'bottom left'
	| 'bottom'
	| 'bottom right';

export interface File
	extends allowedMethodsForModels,
		AllowedMethodsForParents,
		AllowedMethodsForSiblings {
	__extra: Field;
	__default: {
		extension: string;
		filename: string;
		height: number;
		id: string;
		mime: string;
		niceSize: string;
		template: string;
		type: string;
		url: string;
		width: number;
	};
	blur: (pixels: number | boolean) => File;
	bw: () => File;
	crop: (width: number, height: number, options?: CropPositions | string) => File;
	extension: () => string;
	filename: () => string;
	files: () => Files;
	// html: (attr: Array) => string;
	id: () => string;
	mediaUrl: () => string;
	parentId: () => string;
	permalink: () => string;
	template: () => string;
	templateSiblings: (self: boolean) => Files;
	url: () => string;
	height: () => number;
	previewUrl: () => string;
	grayscale: () => File;
	greyscale: () => File;
	resize: (width?: number, height?: number, quality?: number) => File;
	srcset: (sizes: Array<string> | string | null) => string;
	thumb: (options?: Array<any> | string | null) => File;
	indexOf: (collection: Array<any>) => number | false;
	next: (collection: Array<any>) => Array<any>;
	nextAll: (collection: Array<any>) => Array<any>;
	prev: (collection: Array<any>) => Array<any>;
	prevAll: (collection: Array<any>) => Array<any>;
	exists: () => boolean;
	type: () => string;
}

export interface Files extends Collection<File> {}
