<script lang="ts">
	import type { KirbyBlock } from 'kirby-types';

	interface Props {
		text: string;
		citation: string;
	}

	let { text, citation }: Props = $props();
</script>

<blockquote>
	<p>
		{text}
	</p>
	<footer>
		{citation}
	</footer>
</blockquote>
