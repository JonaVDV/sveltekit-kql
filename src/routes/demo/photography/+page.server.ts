import { file, page } from '$lib/kql';
import type { KQLQueryTypeResolver } from '$lib/types/query-resolver';
import type { PageServerLoad } from './$types';

const photographyQuery = {
	query: page('photography'),
	select: {
		id: true,
		title: true,
		intendedTemplate: true,
		// description: true,
		subheadline: true,
		children: {
			query: page().children().listed(),
			select: {
				id: true,
				title: true,
				cover: {
					query: page().content().cover.toFile(),
					select: {
						cropped: {
							query: file().crop(400, 500),
							select: {
								url: true
							}
						},
						url: true,
						alt: true
					}
				},
				image: {
					query: page().images().first(),
					select: {
						cropped: {
							query: file().crop(400, 500),
							select: {
								url: true
							}
						},
						url: true,
						alt: true
					}
				}
			}
		}
	}
};

export const load = async ({ fetch }) => {
	const response = await fetch('./api/cms', {
		method: 'POST',
		body: JSON.stringify(photographyQuery)
	});

	const data = (await response.json()) as KQLQueryTypeResolver<typeof photographyQuery>;

	return {
		page: data
	};
};
