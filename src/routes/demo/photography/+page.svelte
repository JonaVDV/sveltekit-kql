<script lang="ts">
	import Intro from '$lib/components/intro.svelte';
	import type { PageData } from './$types';

	let { data } = $props();

	let cmsData = $derived(data.kqlData);
	let photography = $derived(cmsData.children);
</script>

<div>
	<Intro />

	<ul class="grid" style="--gutter: 1.5rem">
		{#each photography as album, index}
			<li class="column" style:--columns={3} id={index.toString()}>
				<a href="/{album.id}">
					<figure>
						<span class="img" style="--w: 4; --h: 5">
							<img src={album.cover.cropped.url} alt={album.cover.alt} loading="lazy" />
						</span>
						<figcaption class="img-caption">
							{album.title}
						</figcaption>
					</figure>
				</a>
			</li>
		{/each}
	</ul>
</div>
