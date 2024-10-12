import type { AllowedMethodsForSiblings } from './allowedMethods';
import type { Collection } from './collection';
import type { Content } from './content';

export interface Layout extends AllowedMethodsForSiblings {
	__default: {
		attrs: () => Content;
		columns: () => LayoutColumns;
		id: () => string;
		isEmpty: () => boolean;
		isNotEmpty: () => boolean;
		parent: () => Content;
	};
}

export interface Layouts extends Collection<Layout> {}

interface LayoutColumn extends AllowedMethodsForSiblings {
	blocks: () => any;
	id: () => string;
	isEmpty: () => boolean;
	isNotEmpty: () => boolean;
	span: () => number;
	width: () => string;
}

interface LayoutColumns extends Collection<LayoutColumn> {}
