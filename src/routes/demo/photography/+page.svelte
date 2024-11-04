<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props();

	let cmsData = $derived(data.page);
	let photography = $derived(cmsData.children);
</script>
