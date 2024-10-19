<script lang="ts">
	import {page} from '$app/stores';
	import ImageResolver from "./image-resolver.svelte";
	import type {KirbyBlock} from 'kirby-types'
	
	interface Props {
		id: string;
		alt: string;
		src: string;
		location: string;
		caption: string;
		ratio: string;
		image: string[];
	}

	let {
		id,
		alt,
		src,
		location,
		caption,
		ratio,
		image
	}: Props = $props();
	
	let images = $page.data.page.result.images;

	let width: number = $state()
</script>

<figure bind:clientWidth={width}>
	<ImageResolver  collection={images} uuid={image[0]}>
		{#snippet children({ image })}
				<img src="{image?.url}" {alt} {id}/>
					{/snippet}
		</ImageResolver>
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>


