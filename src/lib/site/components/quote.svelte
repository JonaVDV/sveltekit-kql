<script lang="ts">
	import type { KirbyComponentProps } from '$lib/types/blocks';

	interface Props extends KirbyComponentProps<'quote'> {}

	let { block }: Props = $props();
</script>

<blockquote>
	<div>
		{@html block.content.text}
	</div>

	{#if block.content.citation}
		<footer>
			<cite>{block.content.citation}</cite>
		</footer>
	{/if}
</blockquote>

<style>
	blockquote {
		font-size: 1.25rem;
		line-height: 1.325em;
		border-left: 2px solid black;
		padding-left: 1rem;
		margin: 3rem 0;
		max-width: 25rem;
	}
	blockquote footer {
		font-size: 0.875rem;
		font-style: italic;
	}
</style>
