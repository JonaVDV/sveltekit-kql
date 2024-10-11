import type { Field } from './field';

export type Content = {
	data: Record<string, Field>;
	fields: () => {
		[key: string]: Field;
	}[];
	/**Checks if a content field is set*/
	has: (key: string) => boolean;
	/**Returns all field keys*/
	keys: () => string[];
	/**Returns a clone of the content object without the fields, specified by the passed key(s) */
	not: (...keys: string[]) => Content;
} & { [key: string]: Field };
