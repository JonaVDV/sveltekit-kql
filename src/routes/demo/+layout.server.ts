// import { createKql } from '$lib/server';
// import type { KirbyQuerySchema } from 'kirby-types';
// import type { LayoutServerLoad } from './$types.d.ts';

import { kqlLoad } from '$lib/server';

export const load = kqlLoad(
	{
		query: site()
	},
	{
		transform: (data) => {
			return {
				site: data
			};
		}
	}
);
