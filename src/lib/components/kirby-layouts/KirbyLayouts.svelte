<script lang="ts" generics="TLayouts extends KirbyLayout[]">
	import type { KirbyLayout } from '$lib/types/layouts';
	import type { Snippet } from 'svelte';

	type TColumn = TLayouts[number]['columns'][number];
	type TLayout = TLayouts[number];

	interface Props {
		layouts: TLayouts;
		layoutWrapper?: Snippet<[layoutSnippet: Snippet<[layoutData: TLayout]>, layout: TLayout]>;
		children: Snippet<[columnData: TColumn]>;
		columnWrapper?: Snippet<[columnSnippet: Snippet<[columnData: TColumn]>, column: TColumn]>;
		'--grid-gap'?: string;
	}

	let { layouts, layoutWrapper, columnWrapper, children }: Props = $props();
</script>

{#each layouts as layout}
	{#if layoutWrapper}
		{@render layoutWrapper(layoutSnippet, layout)}
	{:else}
		<div class="layout-wrapper-grid" style="--columns: {layout.columns.length}">
			{@render layoutSnippet(layout)}
		</div>
	{/if}

	{#snippet layoutSnippet(layoutData: TLayout)}
		{#each layoutData.columns as column}
			{#if columnWrapper}
				{@render columnWrapper(columnSnippet, column)}
			{:else}
				{@const { id, width } = column}
				<section {id} data-column-span={width}>
					{@render columnSnippet(column)}
				</section>
			{/if}
		{/each}
	{/snippet}

	{#snippet columnSnippet(columnData: TColumn)}
		{@render children?.(columnData)}
	{/snippet}
{/each}

<!-- 
@component KirbyLayouts

@description 
A component that renders Kirby CMS layouts with a flexible column system.
Supports both default grid layouts and custom layout rendering through snippets.
	
@props
- `layouts`: {TLayouts} `(required)` - Array of layout configurations
- `layoutWrapper`: Snippet `(optional)` - Custom wrapper for layout rendering
- `columnWrapper`: Snippet `(optional)` - Custom wrapper for column rendering
- `children`: Snippet `(required)` - Renders column content, typically Kirby blocks

@structure
Layout → Columns → Blocks hierarchy:
1. each layout contains multiple columns
2. each column has a width and contains multiple blocks
3. blocks are rendered using the children snippet in combination with the `KirbyBlocks` component

@css
- `--grid-gap` - the gap between columns in the default grid layout

@example
```svelte
	<script>
		// this example uses snippets to customize the rendering of the layouts, columns and children
		import { KirbyLayouts } from 'sveltekit-kql/components';

		// the layouts come from the page data usually
		let layouts = $derived(data.page.layouts);
	</script>

	<KirbyLayouts {layouts}>
		{#snippet layoutWrapper(snippet, layout)}
			<div class="grid">
				{@render snippet(layout)}
			</div>
		{/snippet}

		{#snippet columnWrapper(snippet, column)}
			{@const columnSpan = spanColumns(column.width)}
			<div class="column" style="--columns: {columnSpan}">
				{@render snippet(column)}
			</div>
		{/snippet}

		
		{#snippet children(column)}
			{@const blocks = column.blocks}

			<KirbyBlocks {blocks} />
		{/snippet}
	</KirbyLayouts>
```

@example 
```svelte
	<script>
		// this example uses the default grid layout
		import { KirbyLayouts } from 'sveltekit-kql/components';

		// the layouts come from the page data usually
		let layouts = $derived(data.page.layouts);

		// the children snippet is required to render the blocks. without this snippet, the blocks will not be rendered.
	</script>
	<KirbyLayouts {layouts}>
		{#snippet children(column)}
			{@const blocks = column.blocks}

			<KirbyBlocks {blocks} />
		{/snippet}
	</KirbyLayouts>
```
-->

<style>
	.layout-wrapper-grid {
		--columns: 1;
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		grid-gap: var(--grid-gap, 1rem);
	}
</style>
