<script lang='ts'>
  import type { KirbyBlock } from "kirby-types";

  interface $$Props extends KirbyBlock<'text'> {
    text: string;
  }

  export let text: $$Props['content']['text'];

</script>

{@html text}

