<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { KirbyBlock } from 'kirby-types';
	import KirbyComponents from './kirby-components.svelte';

	interface KirbyLayoutColumn {
		id: string;
		width: `${string}/${string}` | string;
		blocks: KirbyBlock[];
	}

	interface KirbyLayout {
		id: string;
		attrs: Record<string, any> | string[];
		columns: KirbyLayoutColumn[];
	}

	interface $$Props extends HTMLAttributes<HTMLElement> {
		layouts: KirbyLayout[];
	}

	export let layouts: $$Props['layouts'];
	function span(width: string, columns = 12) {
		const [a, b] = width.split('/');		
		return columns * (Number.parseInt(a) / Number.parseInt(b));
	}

	
	
</script>

<div>
	
	{#each layouts as { id, columns, attrs }}
		<section {...$$restProps} class="grid margin-xl" {id}>
			{#each columns as column}
				<div class="column" style="--columns: {span(column.width)};">
					<KirbyComponents blocks={column.blocks} class="text" />
				</div>
			{/each}
		</section>
	{/each}
</div>
