import { kqlLoad } from '$lib/server';
import type { KirbyQuerySchema } from 'kirby-types';
import type { PageServerLoad } from './$types';

const AboutQuery = {
	query: `page("about")`,
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
			select: ['id', 'uuid', 'url', 'alt']
		}
	}
} as KirbyQuerySchema;

export const load = kqlLoad(AboutQuery) satisfies PageServerLoad;
