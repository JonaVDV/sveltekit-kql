import type { AllowedMethodsForSiblings } from './allowedMethods';
import type { Content } from './content';
import type { Field } from './field';

export interface StructureObject extends AllowedMethodsForSiblings {
	__extra: Field;
	/**Returns the unique item id (UUID v4)*/
	id: () => string;
	/**Returns the content*/
	content: () => Content;

	__default: {
		[key: string]: string;
	};
}
