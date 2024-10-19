import type { Blocks } from './block';
import type { Collection } from './collection';
import type { Content } from './content';
import type { File } from './file';
import type { Layout, Layouts } from './layout';
import type { Page, Pages } from './page';
import type { StructureObject } from './structure';

type EscapeContext = 'html' | 'attr' | 'js' | 'css' | 'url' | 'xml';
type Validators =
	| 'accepted'
	| 'alpha'
	| 'alphanum'
	| 'between'
	| 'callback'
	| 'contains'
	| 'date'
	| 'denied'
	| 'different'
	| 'email'
	| 'empty'
	| 'endsWith'
	| 'filename'
	| 'in'
	| 'integer'
	| 'ip'
	| 'json'
	| 'less'
	| 'match'
	| 'max'
	| 'maxLength'
	| 'maxWords'
	| 'min'
	| 'minLength'
	| 'minWords'
	| 'more'
	| 'notContains'
	| 'notEmpty'
	| 'notIn'
	| 'num'
	| 'required'
	| 'same'
	| 'size'
	| 'startsWith'
	| 'tel'
	| 'time'
	| 'url'
	| 'uuid';

export interface Field {
	__default: string;
	/**Escapes the field value to be safely used in HTML templates without the risk of XSS attacks @param context - The context to escape the field value for @alias `esc`*/
	escape: (context: EscapeContext) => Field;
	/**alias for escape */
	esc: (context: EscapeContext) => Field;
	/**Creates an excerpt of the field value without html or any other formatting. */
	excerpt: (chars: number, strip: boolean, rep: string) => Field;
	/**Checks if the field exists in the content data array */
	exists: () => boolean;
	/**Converts the field content to a valid HTML*/
	html: () => Field;
	/**
	 * Strips all block-level HTML elements from the field value,
	 * it can be safely placed inside of other inline elements without the risk of breaking the HTML structure.
	 */
	inline: () => Field;
	/**Checks if the field content is empty */
	isEmpty: () => boolean;
	/** Converts the field content from inline Markdown/Kirbytext to valid HTML
	 * @alias kti
	 */
	/**Converts the field value into a proper boolean and inverts it*/
	isFalse: () => boolean;
	/**Checks if the field content is not empty */
	isNotEmpty: () => boolean;
	/**Converts the field value into a proper boolean */
	isTrue: () => boolean;
	/**Validates the field content with the given validator and parameters */
	isValid: (validator: Validators, ...args: any[]) => boolean;
	/**alias for isValid */
	v: (validator: Validators, ...args: any[]) => boolean;
	/**Returns the name of the field */
	key: () => string;
	/**Parses all KirbyTags without also parsing Markdown*/
	kirbytags: () => Field;
	/**Converts the field content from Markdown/Kirbytext to valid HTML */
	kirbytext: () => Field;
	/**alias for kirbyText */
	kt: () => Field;
	/**Converts the field content from inline Markdown/Kirbytext to valid HTML */
	kirbytextinline: () => Field;
	/** alias for kirbytextinline */
	kti: () => Field;
	/**Returns the length of the field content*/
	length: () => number;
	/** Converts the field content to lowercase */
	lower: () => Lowercase<string>;
	/**Converts markdown to valid HTML*/
	markdown: () => Field;
	/**alias for markdown() */
	md: () => Field;
	/**@todo need a type here */
	model: () => any;
	/**Converts all line breaks in the field content to `<br>` tags. */
	nl2br: () => Field;
	/**Provides a fallback if the field value is empty */
	or: (fallback: any) => Field;
	/**It parses any queries found in the field value.*/
	replace: () => Field;

	/**Cuts the string after the given length and adds "…" if it is longer
	 * @param length - The number of characters in the string
	 * @param appendix - An optional replacement for the missing rest
	 */
	short: (length: number, appendix: string) => Field;
	/**Converts the field content to a slug*/
	slug: () => Field;
	/**
	 * Converts the field content to title case
	 * @see https://getkirby.com/docs/reference/system/options/smartypants
	 */
	smartypants: () => Field;
	/**Splits the field content into an array */
	split: (separator: string) => Array<string>;
	/** Converts the Field object to an array
	 * @todo maybe a type for this?
	 */
	toArray: () => any[];
	/** Converts a yaml or json field to a Blocks object*/
	toBlocks: () => Blocks;
	/** Converts the field value into a proper boolean
	 * @todo find a proper replacement name for the parameter
	 */
	toBool: ($default: boolean) => boolean;
	/**Parses the field value with the given method
	 * ## available methods are:
	 * - ',' - Comma separated values
	 * - 'yaml' - YAML formatted values
	 * - 'json' - JSON formatted values
	 * @param method - The method to parse the field value with
	 * @returns The parsed field value
	 */
	toData: (method: ',' | 'yaml' | 'json') => Field;
	/**Converts the field value to a timestamp or a formatted date*/
	toDate: (format?: string, fallback?: string) => string | number | null;

	/**Returns a file object from a filename in the field*/
	toFile: () => File;
	/**Returns a file collection from a yaml list of filenames in the field */
	toFiles: (separator: string) => File[];
	/**Converts the field value into a proper float */
	toFloat: ($default: 0.0 | number) => number;
	/**Converts the field value into a proper integer */
	toInt: ($default: 0 | number) => number;
	/**Parse layouts and turn them into Layout objects */
	toLayouts: () => Layouts;
	/**Wraps a link tag around the field value. The field value is used as the link text
	 * @param attr1 - Can be an optional Url. If no Url is set, the Url of the Page, File or Site will be used. Can also be an array of link attributes
	 * @param attr2 - If `$attr1 `is used to set the Url, you can use `$attr2` to pass an array of additional attributes.
	 */
	toLink: (attr1?: string | string[], attr2?: string[]) => Field;
	/**Parse yaml data and convert it to a content object*/
	toObject: () => Content;
	/**Returns a page object from a page id in the field */
	toPage: () => Page | null;
	/**Returns a pages collection from a yaml list of page ids in the field */
	toPages: () => Pages;
	/** Turns the field value into an QR code object*/
	toQrCode: () => QrCode;
	/**
	 * Returns the field value as string
	 */
	toString: () => string;
	/**Converts a yaml field to a Structure object*/
	toStructure: () => Collection<StructureObject>;
	/**Converts the field value to a Unix timestamp*/
	toTimestamp: () => number | false;
	/**Turns the field value into an absolute Url*/
	toUrl: () => string | null;
	/**Converts a user email address to a user object*/
	toUser: () => User | null;
	/**Returns a users collection from a yaml list of user email addresses in the field */
	toUsers: (separator?: string) => User[];
	/**
	 * Converts the field content to uppercase
	 */
	upper: () => Uppercase<string>;
	/**Returns the field content. If a new value is passed, the modified field will be returned. Otherwise it will return the field value. */
	value: (value?: string) => Field;
	/**
	 * Avoids typographical widows in strings by replacing the last space with `&nbsp;`
	 */
	widont: () => Field;
	/** Returns the number of words in the text*/
	words: () => number;
	/**Converts the field content to valid XML */
	xml: () => Field;
	yaml: () => Field[];
}

/**@todo make a proper interface for the following interfaces */
interface User {}
// not sure if we should include this
interface QrCode {}
