<script lang="ts">
	import type { PageData } from './$types';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let layouts = $derived(data.page.layouts);

	let aboutPage = $derived(data.page);
</script>
