<script lang="ts">
	import '../../styles/main.css';
	import { components } from '$lib';
	import KirbyImage from '$lib/Blocks/kirby-image.svelte';
	import KirbyText from '$lib/Blocks/kirby-text.svelte';
	import KirbyQuote from '$lib/Blocks/kirby-quote.svelte';
	import KirbyHeading from '$lib/Blocks/kirby-heading.svelte';

	export let data;

	$components = {
		image: KirbyImage,
		text: KirbyText,
		quote: KirbyQuote,
		heading: KirbyHeading
	};
</script>

<!-- <svelte:head>
    <title>
        {data.kqlData.title}
    </title>
</svelte:head> -->

<main class="main">
	<slot />
</main>
