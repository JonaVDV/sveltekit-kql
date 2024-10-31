// import { createKql } from '$lib/server';
// import type { KirbyQuerySchema } from 'kirby-types';
// import type { LayoutServerLoad } from './$types.d.ts';

// import { site } from '$lib/kql';
import { site } from '$lib/kql';
import { kqlLoad } from '$lib/server';

export const load = kqlLoad(
	{
		query: site().children()
	},
	{
		transform: (data) => {
			return {
				site: data
			};
		}
	}
);
