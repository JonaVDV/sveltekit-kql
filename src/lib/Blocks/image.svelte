<script lang="ts">
	import {page} from '$app/stores';
	import ImageResolver from "./image-resolver.svelte";
	import type {KirbyBlock} from 'kirby-types'
	interface $$Props extends KirbyBlock<'image'> {
		id: string;
		alt: string;
		src: string;
		location: string;
		caption: string;
		ratio: string;
		image: string[];
	}
	export let id: $$Props['id'];
	export let alt: $$Props['alt'];
	export let src: $$Props['src'];
	export let location: $$Props['location'];
	export let caption: $$Props['caption'];
	export let ratio: $$Props['ratio'];
	export let image: $$Props['image'];
	
	let images = $page.data.page.result.images;

	let width: number
</script>

<figure bind:clientWidth={width}>
	<ImageResolver let:image collection={images} uuid={image[0]}>
		<img src="{image?.url}" {alt} {id}/>
	</ImageResolver>
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>


