import type { AllowedMethodsForSiblings } from './allowedMethods';
import type { Blocks } from './block';
import type { Collection } from './collection';
import type { Content } from './content';
import type { Field } from './field';

export interface Layout extends AllowedMethodsForSiblings {
	__default: {
		attrs: () => Content;
		columns: () => LayoutColumns;
		id: () => string;
	};
	__extra: Field;
	attrs: () => Content;
	columns: () => LayoutColumns;
	id: () => string;
	isEmpty: () => boolean;
	isNotEmpty: () => boolean;
	parent: () => Content;
}

export interface Layouts extends Collection<Layout> {}

interface LayoutColumn extends AllowedMethodsForSiblings {
	__default: {
		blocks: () => Blocks;
		id: () => string;
		width: () => string;
	};
	blocks: () => Blocks;
	id: () => string;
	isEmpty: () => boolean;
	isNotEmpty: () => boolean;
	span: () => number;
	width: () => string;
}

interface LayoutColumns extends Collection<LayoutColumn> {}
