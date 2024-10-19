<script lang='ts'>
	import type { KirbyBlock } from "$lib";

  

  interface Props {
    text: string;
    level: string;
  }

  let { text, level }: Props = $props();
  
</script>

<svelte:element this="{level}">
  {text}
</svelte:element>