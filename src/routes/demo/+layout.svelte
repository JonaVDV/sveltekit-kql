<script lang="ts">
	import '../../styles/main.css';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}
	import { setBlocksContext } from '$lib/components/kirby-blocks/state.svelte';
	import Heading from '$lib/site/components/heading.svelte';
	import Quote from '$lib/site/components/quote.svelte';
	import Text from '$lib/site/components/text.svelte';
	import Image from '$lib/site/components/image.svelte';
	import type { LayoutData } from './$types';
	import Footer from '$demo-site/components/footer.svelte';

	let { data, children }: Props = $props();

	setBlocksContext({
		heading: Heading,
		quote: Quote,
		text: Text,
		image: Image
	});
</script>

<main class="main">
	{@render children?.()}
</main>

<Footer />
