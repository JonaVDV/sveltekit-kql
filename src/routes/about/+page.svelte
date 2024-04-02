<script lang="ts">
    import type { KirbyQuerySchema } from 'kirby-types';
    import type {KQLData} from './$kql'
    export let data: KQLData
    // omit all the keys of pagedata that are of the type KirbyQuerySchema


    console.log(data);
    
    
</script>