<script lang='ts'>
	import type { KirbyBlock } from "kirby-types";

  interface $$Props extends KirbyBlock<'quote'> {
    text: string;
    citation: string;
  }

  export let text: $$Props['content']['text'];
  export let citation: $$Props['content']['citation'];
</script>

<blockquote>
  <p>
    {text}
  </p>
  <footer>
    {citation}
  </footer>
</blockquote>