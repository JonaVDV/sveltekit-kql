import { site } from '$lib/kql';
import { transformQuery } from '$lib/server/utils';
import type { KQLQueryTypeResolver } from '$lib/types/query-resolver';
import type { LayoutServerLoad } from './$types';

const siteQuery = {
	query: site()
};

export const load: LayoutServerLoad = async ({ fetch }) => {
	const response = await fetch('./api/cms', {
		method: 'POST',
		body: JSON.stringify(transformQuery(siteQuery))
	});

	const data = (await response.json()) as KQLQueryTypeResolver<typeof siteQuery>;

	return {
		site: data
	};
};
