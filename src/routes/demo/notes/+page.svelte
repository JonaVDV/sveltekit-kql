<script lang="ts">
	import Note from '$lib/components/note.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Intro from '$lib/components/intro.svelte';

	let { data } = $props();

	let cmsData = $derived(data.kqlData);

	let tag = $page.params.tag;

	let notes = $derived.by(() => {
		const filtered = (cmsData.children ?? []).filter((note) => {
			tag ? note.tags.includes(tag) : true;
		});

		return filtered.length ? filtered : cmsData.children;
	});
	let route = $page.url.pathname;

	// $: console.log(cmsData.children[0]);
</script>

<div>
	{#if tag}
		<header class="h1">
			<h1>
				<small>Tag:</small>
				{tag}
				<a href={route} aria-label="All notes"> &times; </a>
			</h1>
		</header>
	{:else}
		<Intro />
	{/if}
	<ul class="grid">
		{#each notes as note}
			<li class="column" style="--columns: 4">
				<Note excerpt {note} />
			</li>
		{/each}
	</ul>
</div>
