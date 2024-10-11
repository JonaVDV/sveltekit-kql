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

interface LayoutColumn {}

interface LayoutColumns {}
