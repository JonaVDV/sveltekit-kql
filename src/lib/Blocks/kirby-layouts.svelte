<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { KirbyBlock } from 'kirby-types';
	import KirbyComponents from './kirby-components.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';

	interface KirbyLayoutColumn {
		id: string;
		width: `${string}/${string}` | string;
		blocks: KirbyBlock<any>[];
	}

	interface KirbyLayout {
		id: string;
		attrs: Record<string, any> | string[];
		columns: KirbyLayoutColumn[];
		isEmpty: boolean;
	}

	

	/**
	 * **Custom layout component**
	 *
	 * usefull for if you want to render a custom layout in place of the default layout
	 *
	 */
	interface Props {
		layouts: KirbyLayout[];
		customLayout?: ComponentType<
			SvelteComponent<
				{ columns: KirbyLayoutColumn[]; id: string; attrs: KirbyLayout['attrs'] } & Record<
					string,
					any
				>
			>
		>;
		undefined?: string;
		components?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		layouts,
		customLayout = undefined,
		components,
		...rest
	}: Props = $props();
</script>

<div>
	{#each layouts as { id, columns, attrs }}
		<section
			{...rest}
			class={rest['class'] ?? ''}
			class:grid-auto-columns={columns.length > 1 ?? null}
			{id}
		>
			{#each columns as column}
				<div>
					{#if components}{@render components()}{:else}
						<KirbyComponents blocks={column.blocks} class="text" />
					{/if}
				</div>
			{/each}
		</section>

		{#if customLayout}
			{@const SvelteComponent_1 = customLayout}
			<SvelteComponent_1 {id} {columns} {attrs} {rest} />
		{/if}
	{/each}
</div>

<style>
	.grid-auto-columns {
		display: grid;
		grid-auto-columns: 1fr;
		gap: var(--grid-gap, 2rem);
		margin-block: calc(var(--grid-gap, 2rem) / 2);
	}

	@media (min-width: 60rem) {
		.grid-auto-columns {
			grid-auto-flow: column;
		}
	}
</style>
