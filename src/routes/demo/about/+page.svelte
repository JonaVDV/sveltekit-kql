<script lang="ts">
	import { run } from 'svelte/legacy';

	// import type { KQLData } from './$kql';
	import { KirbyLayouts } from '$lib';
	import KirbyComponents from '$lib/Blocks/kirby-components.svelte';
	import type { PageData } from './$types';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let layouts = $derived(data.kqlData.layouts);

	let aboutPage = $derived(data.kqlData);

	run(() => {
		console.log(data.kqlData.layouts[0].columns[0]);
	});
</script>

{#each layouts as { id, columns, attrs }}
	<section {id} class="grid-auto-columns">
		{#each columns as column}
			<div>
				<KirbyComponents blocks={column.blocks} class="text" />
			</div>
		{/each}
	</section>
{/each}

<aside class="contact">
	<h2 class="h1">Get in contact</h2>
	<div class="grid" style="--gutter: 1.5rem">
		<section class="column text" style="--columns: 4">
			<h3>Address</h3>
			<div>
				{@html aboutPage.address}
			</div>
		</section>

		<section class="column text" style="--columns: 4">
			<h3>Email</h3>
			<p>
				{@html aboutPage.email}
			</p>
			<h3>Phone</h3>
			<p>
				{@html aboutPage.phone}
			</p>
		</section>

		<section class="column text" style="--columns: 4">
			<h3>On the web</h3>
			<ul>
				{#each aboutPage.social as item, index}
					<li>
						<a href={item.url}>
							{item.platform}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</aside>

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
