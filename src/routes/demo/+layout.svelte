<script lang="ts">
	import '../../styles/main.css';

	interface Props {
		data: any;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<main class="main">
	{@render children?.()}
</main>
