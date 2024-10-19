<script lang="ts">
	import Note from '$lib/components/note.svelte';
	import type { PageData } from './$types';
	export let data;

	$: cmsData = data.kqlData;

	$: notes = cmsData.children;

	// $: console.log(cmsData.children[0]);
</script>

<div>
	<ul class="grid">
		{#each notes as note}
			<li class="column">
				<Note {note} />
			</li>
			<!-- <Note {note} /> -->
		{/each}
	</ul>
	<!-- {#if }
        
    {/if} -->
</div>
<!-- <Note note={cmsData} /> -->
