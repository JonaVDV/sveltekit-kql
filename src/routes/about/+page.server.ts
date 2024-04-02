import { createKql } from '$lib';
import type { KirbyQuerySchema } from 'kirby-types';
import type { PageServerLoad } from './$types';
// import type {Data} from './$kql'

export const load = createKql(async ({route}) => {
    const AboutQuery = {
        query: `page("${route.id}")`,
        select: {
          id: true,
          title: true,
          intendedTemplate: true,
          // description: true,
          layouts: 'page.layout.toLayouts',
          address: 'page.address.kirbytext',
          email: true,
          phone: true,
          social: 'page.social.toStructure',
          images: {
            query: 'page.images',
            select: ['id', 'uuid', 'url', 'alt'],
          },
        },
    }

    return {
        queries: [AboutQuery],
        test: 'test'
    };
}) satisfies PageServerLoad;