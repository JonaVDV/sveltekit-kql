import { page } from '$lib/kql';
import type { KQLQueryTypeResolver } from '$lib/types/query-resolver';
import type { PageServerLoad } from './$types';
import { transformQuery } from '$lib/server/utils';

const AboutQuery = {
	query: page('about'),
	select: {
		id: true,
		title: true,
		intendedTemplate: true,
		description: true,
		layouts: page().layout.toLayouts(),
		address: page().address.kirbytext(),
		email: true,
		phone: true,
		social: page().social.toStructure(),
		images: {
			query: page().images(),
			select: {
				id: true,
				uuid: true,
				url: true,
				alt: true
			}
		}
	}
};

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('./api/cms', {
		method: 'POST',
		body: JSON.stringify(transformQuery(AboutQuery))
	});

	const data = (await response.json()) as KQLQueryTypeResolver<typeof AboutQuery>;

	return {
		page: data
	};
};
