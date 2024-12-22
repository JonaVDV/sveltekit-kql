<script lang="ts">
	import { page } from '$app/state';

	let currentPage = page.data.page;
</script>

<header>
	<h1>{currentPage.headline ?? currentPage.title}</h1>
	{#if currentPage.subheadline}
		<p style="color: var(--color-text-grey);">
			{currentPage.subheadline}
		</p>
	{/if}
</header>
