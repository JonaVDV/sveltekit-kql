/**
 * @fileoverview Block types
 * these types were inspired (and mostly copied from) [these types](https://github.com/johannschopplich/kirby-types/blob/main/src/blocks.d.ts) from Johann Schopplich
 *
 * this file defines the block types from kirby with their content properties. these can be used in order to make components.
 */

/**
 * Default block types with their content properties
 *
 * @todo (1.0 / 1.x / 2.0)make users able to add their own block types using the KQL namespace
 */
interface KirbyDefaultBlocks {
	code: {
		code: string;
		language: string;
	};
	gallery: { images: string[] };

	heading: {
		level: string;
		text: string;
	};

	text: {
		text: string;
	};

	quote: {
		text: string;
		citation: string;
	};

	list: { text: string };
	markdown: { text: string };

	image: {
		alt: string;
		caption: string;
		crop: boolean;
		image: string[] | `file://${string}`[];
		link: string;
		location: string;
		ratio: string;
		src: string;
	};

	video: { url: string; caption: string };
}

/**
 * Base block type
 *
 * @param TType - Type of the block
 * @param TContent - Type of the content
 */
export interface KirbyBlock<TType extends keyof KirbyDefaultBlocks> {
	id: string;
	type: TType;
	isHidden: boolean;
	content: KirbyDefaultBlocks[TType];
}
