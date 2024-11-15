import { getContext, setContext, type Component } from 'svelte';

export class KirbyBlocks {
	blocks: Record<string, Component> = $state({});

	constructor(blocks: Record<string, Component>) {
		this.blocks = blocks;
	}

	setBlocks(blocks: Record<string, Component>) {
		this.blocks = blocks;
	}

	getAllBlocks() {
		// get all the keys together with the name of the component
		return Object.keys(this.blocks);
	}

	getBlock(name: string) {
		return this.blocks[name];
	}
}

const KEY = Symbol('kirby-blocks' as const);

export function setBlocksContext(blocks: Record<string, Component>) {
	return setContext(KEY, new KirbyBlocks(blocks));
}

export function getBlocksContext() {
	return getContext<ReturnType<typeof setBlocksContext>>(KEY);
}
