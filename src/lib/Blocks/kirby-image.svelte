<script lang="ts">
	import type { KirbyBlock } from "kirby-types";
	import {page} from '$app/stores';
	import ImageResolver from "./image-resolver.svelte";
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
	export let alt: $$Props['content']['alt'];
	export let src: $$Props['content']['src'];
	export let location: $$Props['content']['location'];
	export let caption: $$Props['content']['caption'];
	export let ratio: $$Props['content']['ratio'];
	export let image: $$Props['content']['image'];
	
	let images = $page.data['page("/about")'].result.images;
	
	let width: number
</script>

<figure bind:clientWidth={width}>
	<ImageResolver let:image collection={images} uuid={image[0]}>
		<img src="{image?.url}" alt="">
	</ImageResolver>
</figure>


