import type { AllowedMethodsForSiblings } from './allowedMethods';
import type { Collection } from './collection';
import type { Content } from './content';
import type { Field } from './field';

export interface Block extends AllowedMethodsForSiblings {
	__default: {
		content: () => Content;
		id: () => string;
		isEmpty: () => boolean;
		isHidden: () => boolean;
		type: () => string;
	};

	content: () => Content;
	id: () => string;
	isEmpty: () => boolean;
	isHidden: () => boolean;
	isNotEmpty: () => boolean;
	toField: () => Field;
	toHtml: () => string;
	parent: () => Content;
	type: () => string;
}

export interface Blocks extends Collection<Block> {
	/**Creates an excerpt of the field value without html or any other formatting. */
	excerpt: (chars: number, strip: boolean, rep: string) => Field;
	toHtml: () => string;
}
