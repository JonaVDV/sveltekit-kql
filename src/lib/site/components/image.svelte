<script lang="ts">
	import type { KirbyComponentProps } from '$lib/types/blocks';

	interface Props extends KirbyComponentProps<'image'> {}
	import { page } from '$app/state';
	import type { Image } from '$lib/types/blocks';
	import { fade } from 'svelte/transition';

	let { block }: Props = $props();

	let imageCollection = page.data.page.images;

	function resolveImage(image: string, collection: Image[]) {
		const resolved = collection.find((img) => img.uuid === image);
		if (!resolved) {
			console.error(`Image with UUID ${image} not found in collection`);
			return null;
		}

		return resolved;
	}

	let image = resolveImage(block.content.image[0], imageCollection);

	let imageLoaded = $state(false);
</script>

<figure>
	{#if image}
		{#key imageLoaded}
			<img
				in:fade={{ duration: 500, delay: 200 }}
				onload={() => (imageLoaded = true)}
				src={image.url}
				alt={image.alt}
			/>
		{/key}
	{/if}
	{#if block.content.caption}
		<figcaption>{block.content.caption}</figcaption>
	{/if}
</figure>
