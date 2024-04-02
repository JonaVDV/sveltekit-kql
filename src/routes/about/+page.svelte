<script lang="ts">
    import type { KirbyQuerySchema } from 'kirby-types';
    import type {KQLData} from './$kql'
	import {KirbyLayouts} from '$lib';
    export let data: KQLData
    // omit all the keys of pagedata that are of the type KirbyQuerySchema

    $: console.log(data);
    
    $: layouts = data['page("/about")'].result.layouts
    
    
</script>

<KirbyLayouts {layouts} class="test"/>

<style>
    .test{
        background-color: red;
    }
</style>