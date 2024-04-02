import { createKql } from '$lib/kql/fetch.js';
import type { KirbyQuerySchema } from 'kirby-types';
import type { LayoutServerLoad } from './$types.d.ts';


export const load = createKql(async () => {
    let query = {
        query: 'site',
    }
    return {
        testing: 'test',
        query
    };
}) satisfies LayoutServerLoad;