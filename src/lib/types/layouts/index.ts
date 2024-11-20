import type { KirbyBlock } from '../blocks';

interface KirbyLayout {
	id: string;
	columns: KirbyColumn[];
	attrs: any;
}

interface KirbyColumn {
	id: string;
	width: string;
	blocks: KirbyBlock<any>[];
}

export type { KirbyLayout, KirbyColumn };
