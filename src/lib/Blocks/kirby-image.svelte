<script lang="ts">
	import type { KirbyBlock } from '$lib/types';
	import { page } from '$app/stores';
	import ImageResolver from './image-resolver.svelte';
	interface $$Props extends KirbyBlock<'image'> {
		id: string;
		alt: string;
		src: string;
		caption: string;
		ratio: string;
		image: string[];
		link: string
		location: string;
	}
	export let id: $$Props['id'];
	export let alt: $$Props['alt'];
	export let caption: $$Props['caption'];
	export let ratio: $$Props['ratio'];
	export let image: $$Props['image'];
	export let link: $$Props['link'];
	export const location: $$Props['location'] = '';
	export const src: $$Props['src'] = '';

	let images = $page.data['page("/about")'].result.images;

	if (!alt) {
		console.warn('The alt attribute is missing on the image');
	}

	if (ratio && ratio.match(/^\d+\/\d+$/) === null) {
		throw new TypeError('The ratio attribute must be in the format "width/height"');
	}
</script>

<figure>
	{#if link}
		<a href="{link}">
			<ImageResolver let:image collection={images} uuid={image[0]}>
				<img src={image?.url} {alt} {id} />
			</ImageResolver>
		</a>
	{:else}
		<ImageResolver let:image collection={images} uuid={image[0]}>
			<img src={image?.url} {alt} {id} />
		</ImageResolver>
	{/if}
	{#if caption}
		<figcaption>
			{caption}
		</figcaption>
	{/if}
</figure>
