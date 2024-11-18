<!-- we use any here because we don't know the type of the blocks yet and the type will be too complex to define -->
<script lang="ts" generics="TBlocks extends KirbyBlock<any>[]">
	import type { KirbyBlock } from '$lib/types/blocks';

	import { getBlocksContext } from './state.svelte';

	const components = getBlocksContext();

	type Props = {
		/**
		 * An array of blocks to render.
		 */
		blocks: TBlocks;
		/** --- css props --- */

		/** The padding of the error message */
		'--error-padding'?: string;
		/** The margin of the error message */
		'--error-margin'?: string;
		/** The border radius of the error message */
		'--error-border-radius'?: string;
		/** The border width of the error message */
		'--error-border-width'?: string;
		/** The border color of the error message */
		'--error-border-color'?: string;
		/** The background color of the error message */
		'--error-background-color'?: string;
		/** The text color of the error message */
		'--error-text-color'?: string;
	};
	let { blocks }: Props = $props();
</script>

{#if !components || !components.blocks}
	<pre class="error">No blocks context found. Did you forget to set the blocks context?</pre>
{:else}
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
{/if}

<!-- 
@component KirbyBlocks

@description - A component that renders a list of blocks based on their type.

@param blocks - An array of blocks to render.

@example
```svelte
<script>
	import KirbyBlocks from 'sveltekit-kql/components';
	import { setBlocksContext } from 'sveltekit-kql/components/';

	//your components
	import Heading from './Heading.svelte';
	import Paragraph from './Paragraph.svelte';
	import Image from './Image.svelte';

	// Define the blocks context
	setBlocksContext({
		heading: Heading,
		paragraph: Paragraph,
		image: Image,
	});
</script>

<KirbyBlocks {blocks} />

```

@css variables you can adjust:
```css
	--error-padding: 1rem;
	--error-margin: 0.5rem;
	--error-border-radius: 4px;
	--error-border-width: 4px;
	--error-border-color: #ff4444;
	--error-background-color: #2a1717;
	--error-text-color: #f8d7da;
```

@errors **The component will display an error message if:**
	- The blocks context is not set.
	- A block type is not found in the blocks context.
	
-->

<style>
	.error {
		/* Container styling */
		padding: var(--error-padding, 1rem);
		border-radius: var(--error-border-radius, 4px);
		border-left-width: var(--error-border-width, 4px);
		border-left-color: var(--error-border-color, #ff4444);
		border-left-style: solid;

		/* Background and text */
		background-color: var(--error-background-color, #2a1717);
		color: var(--error-text-color, #f8d7da);
		font-family:
			system-ui,
			-apple-system,
			sans-serif;

		/* Layout */
		width: fit-content;
		white-space-collapse: initial;
		text-wrap: wrap;

		/* Font settings */
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.error span {
		/* Technical details styling */
		display: inline-block;
		padding: 0.2rem 0.4rem;
		background-color: hsla(0, 0%, 100%, 0.1);
		border-radius: 3px;
		font-family: monospace;
		font-size: 0.85em;
	}
</style>
