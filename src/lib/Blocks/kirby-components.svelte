<script lang='ts'>
	import type { KirbyBlock } from "kirby-types";
	import type { ComponentType } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
  import { components } from "$lib";

  interface $$Props extends HTMLAttributes<HTMLElement> {
    blocks: KirbyBlock[];
  }

  export let blocks: $$Props['blocks'];
  
</script>

<div {...$$restProps}>
  {#each blocks as block}
    <div>
      <svelte:component this={$components[block.type]} {...block.content} />
    </div>
  {/each}
</div>

