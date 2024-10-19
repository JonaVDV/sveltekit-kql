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

	interface $$Props extends HTMLAttributes<HTMLElement> {
		layouts: KirbyLayout[];
		customLayout?: ComponentType<
			SvelteComponent<
				{ columns: KirbyLayoutColumn[]; id: string; attrs: KirbyLayout['attrs'] } & Record<
					string,
					any
				>
			>
		>;
		// css props
		'--grid-gap'?: string;
	}

	export let layouts: NonNullable<$$Props['layouts']>;
	/**
	 * **Custom layout component**
	 *
	 * usefull for if you want to render a custom layout in place of the default layout
	 *
	 */
	export let customLayout: $$Props['customLayout'] = undefined;
</script>

<div>
	{#each layouts as { id, columns, attrs }}
		<section
			{...$$restProps}
			class={$$restProps['class'] ?? ''}
			class:grid-auto-columns={columns.length > 1 ?? null}
			{id}
		>
			{#each columns as column}
				<div>
					<slot name="components">
						<KirbyComponents blocks={column.blocks} class="text" />
					</slot>
				</div>
			{/each}
		</section>

		{#if customLayout}
			<svelte:component this={customLayout} {id} {columns} {attrs} {$$restProps} />
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
