<script lang="ts">
	import type { KirbyBlock } from '$lib/types';
	import { page } from '$app/stores';
	import ImageResolver from './image-resolver.svelte';

	interface Props {
		id: string;
		alt: string;
		src: string;
		caption: string;
		ratio: string;
		image: string[];
		link: string;
		location: string;
	}

	let { id, alt, caption, ratio, image, link }: Props = $props();

	let images = $page.data.kqlData.images;

	if (!alt) {
		console.warn('The alt attribute is missing on the image');
	}

	if (ratio && ratio.match(/^\d+\/\d+$/) === null) {
		throw new TypeError('The ratio attribute must be in the format "width/height"');
	}
</script>

<figure>
	{#if link}
		<a href={link}>
			<ImageResolver collection={images} uuid={image[0]}>
				{#snippet children({ image })}
					<img src={image?.url} {alt} {id} />
				{/snippet}
			</ImageResolver>
		</a>
	{:else}
		<ImageResolver collection={images} uuid={image[0]}>
			{#snippet children({ image })}
				<img src={image?.url} {alt} {id} />
			{/snippet}
		</ImageResolver>
	{/if}
	{#if caption}
		<figcaption>
			{caption}
		</figcaption>
	{/if}
</figure>
