import { page } from '$lib/kql';
import { transformQuery } from '$lib/server/utils';
import type { KQLQueryTypeResolver } from '$lib/types/query-resolver';

const notesQuery = {
	query: page('notes'),
	select: {
		title: true,
		intendedTemplate: true,
		// description: true,
		subheadline: true,
		text: page().text.kirbytext(),
		children: {
			query: page().children().listed().sortBy('date', 'desc'),
			select: {
				id: true,
				title: true,
				tags: page().tags.split(','),
				text: page().text.toBlocks().excerpt(280),
				published: page().date.toDate(),
				cover: {
					query: page().content().cover.toFile(),
					select: { id: true, url: true }
				},
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
		}
	}
};
export const load = async ({ fetch }) => {
	const response = await fetch('./api/cms', {
		method: 'POST',
		body: JSON.stringify(transformQuery(notesQuery))
	});

	const data = (await response.json()) as KQLQueryTypeResolver<typeof notesQuery>;

	return {
		page: data
	};
};
