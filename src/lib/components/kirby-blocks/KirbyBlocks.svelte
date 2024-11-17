<!-- we use any here because we don't know the type of the blocks yet and the type will be too complex to define -->
<script lang="ts" generics="TBlocks extends KirbyBlock<any>[]">
	import type { KirbyBlock } from '$lib/types/blocks';

	import { getBlocksContext } from './state.svelte';

	const components = getBlocksContext();
	type Props = { blocks: TBlocks };
	let { blocks }: Props = $props();
</script>

{#each blocks as block}
	{#if block.type in components.blocks}
		{@const Component = components.getBlock(block.type)}
		<Component {block} />
	{:else}
		<pre class="error">
			Component not found: <span>{block.type}</span> in <span
				>{JSON.stringify(components.getAllBlocks())}</span
			>
			Did you forget to add it to the blocks context?
		</pre>
	{/if}
{/each}

<!-- 
@component KirbyBlocks

@description - A component that renders a list of blocks based on their type.


	
	
-->

<style>
	.error {
		background-color: hsl(0, 0%, 20%);
		color: aliceblue;
	}
</style>
