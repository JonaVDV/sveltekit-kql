import { getContext, setContext, type Component } from 'svelte';
import type { BlocksMap, KirbyBlockType, KirbyComponentProps } from '$lib/types/blocks';

export class KirbyBlocks {
	blocks: BlocksMap = $state({});

	constructor(blocks: BlocksMap) {
		this.blocks = blocks;
	}

	setBlocks(blocks: BlocksMap) {
		this.blocks = blocks;
	}

	getAllBlocks() {
		// get all the keys together with the name of the component
		return Object.keys(this.blocks);
	}

	getBlock<T extends KirbyBlockType>(name: T): Component<KirbyComponentProps<T>> | undefined {
		return this.blocks[name];
	}
}

const KEY = Symbol('kirby-blocks' as const);

export function setBlocksContext(blocks: BlocksMap) {
	return setContext(KEY, new KirbyBlocks(blocks));
}

export function getBlocksContext() {
	return getContext<ReturnType<typeof setBlocksContext>>(KEY);
}
