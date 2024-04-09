<script lang="ts">
    import type {KQLData} from './$kql'
	import {KirbyLayouts} from '$lib';
    export let data: KQLData

    $: layouts = data['page("/about")'].result.layouts
    
    
</script>

<KirbyLayouts --grid-gap="3rem" {layouts}/>