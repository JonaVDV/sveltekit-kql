<script lang="ts">
	import type { KirbyComponentProps } from '$lib/types/blocks';

	interface Props extends KirbyComponentProps<'text'> {}

	let { block }: Props = $props();
</script>

<div style="display: contents;">
	{@html block.content.text}
</div>

<style>
	div {
	}
</style>
