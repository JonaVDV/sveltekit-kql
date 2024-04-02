<script lang="ts">
    import type { LayoutData } from './$types.d.ts';
    import '../styles/main.css'
    
    export let data: LayoutData;
</script>
<main class="main">
    <slot/>
</main>