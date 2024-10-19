<script lang="ts">
	import type { KirbyBlock } from 'kirby-types';
	import type { ComponentType } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { components } from '$lib';

	

	interface Props {
		blocks: KirbyBlock[];
		[key: string]: any
	}

	let { blocks, ...rest }: Props = $props();

	if (!Array.isArray(blocks)) {
		throw new TypeError('Blocks must be an array');
	}

	if (!$components) {
		throw new Error('No components provided');
	}
</script>

{#each blocks as block}
	{@const SvelteComponent = $components[block.type]}
	<div {...rest}>
		<SvelteComponent {...block.content} />
	</div>
{/each}
