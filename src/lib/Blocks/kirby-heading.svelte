<script lang='ts'>
	import type { KirbyBlock } from "kirby-types";

  interface $$Props extends KirbyBlock<'heading'> {
    text: string;
    level: string;
  }

  export let text: $$Props['content']['text'];
  export let level: $$Props['content']['level'];
  
</script>

<svelte:element this="{level}">
  {text}
</svelte:element>