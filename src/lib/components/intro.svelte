<script lang="ts">
	import { page } from '$app/stores';
	let subheadline = $page.data.kqlData.subheadline;
	let headline = $page.data.kqlData.headline;
	let title = $page.data.kqlData.title;
</script>

<header class="h1">
	<h1>
		{title || headline}
	</h1>
	{#if subheadline}
		<p class="color-grey">{{ subheadline }}</p>
	{/if}
</header>
