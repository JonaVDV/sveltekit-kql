<script lang="ts">
	import type { KirbyBlock } from 'kirby-types';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

{@html text}
