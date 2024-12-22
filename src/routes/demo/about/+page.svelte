<script lang="ts">
	import { KirbyLayouts } from '$lib/components';
	import type { PageData } from './$types';
	import { KirbyBlocks } from '$lib/components';
	import Header from '$demo-site/components/header.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let layouts = $derived(data.page.layouts);

	let aboutPage = $derived(data.page);
</script>

<Header />
<div class="wrapper">
	<KirbyLayouts {layouts}>
		{#snippet layoutWrapper(snippet, layout)}
			{@const columns = layout.columns.length}
			<div class="grid" style="--max-columns: {columns}">
				{@render snippet(layout)}
			</div>
		{/snippet}

		{#snippet columnWrapper(snippet, column)}
			<div class="column">
				{@render snippet(column)}
			</div>
		{/snippet}

		{#snippet children(column)}
			{@const blocks = column.blocks}

			<KirbyBlocks {blocks} />
		{/snippet}
	</KirbyLayouts>
</div>

<style>
	.grid {
		--max-columns: 1;
		display: grid;
		gap: 3rem;
	}

	@media (min-width: 768px) {
		.grid {
			display: grid;
			grid-template-columns: repeat(var(--max-columns), 1fr);
		}
	}

	.grid > .column {
		margin-block-end: 3rem;
	}
</style>
