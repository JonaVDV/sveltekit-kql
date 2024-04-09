<script lang="ts">
	import type { KirbyBlock } from 'kirby-types';
	import type { ComponentType } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { components } from '$lib';

	interface $$Props extends HTMLAttributes<HTMLElement> {
		blocks: KirbyBlock[];
	}

	export let blocks: $$Props['blocks'];

	if (!Array.isArray(blocks)) {
		throw new TypeError('Blocks must be an array');
	}

	if (!$components) {
		throw new Error('No components provided');
	}
</script>

{#each blocks as block}
	<div {...$$restProps}>
		<svelte:component this={$components[block.type]} {...block.content} />
	</div>
{/each}
