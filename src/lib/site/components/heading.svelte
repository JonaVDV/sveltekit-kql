<script lang="ts">
	import type { KirbyBlock, KirbyComponentProps } from '$lib/types/blocks';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends KirbyComponentProps<'heading'>, HTMLAttributes<HTMLHeadingElement> {
		level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	}

	let { block, level, children, ...rest }: Props = $props();
</script>

<svelte:element this={block?.content.level || level} id={block?.id} {...rest}>
	{#if !block && children}
		{@render children()}
	{:else}
		{block?.content.text}
	{/if}
</svelte:element>

<style>
	h1 {
		font-size: 2rem;
		margin-bottom: 3rem;
		line-height: 1.25em;
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-block-end: 1.25rem;
	}
</style>
