import type { PageServerLoad } from './$types.d.ts';
import { createKql } from '$lib/server';
import type { KirbyQuerySchema } from 'kirby-types';
export const load = createKql(async () => {
	const HomeQuery = {
		query: 'page("home")',
		select: {
			id: true,
			title: true,
			intendedTemplate: true,
			// description: true,
			headline: true,
			subheadline: true
		}
	};

	const query = {
		query: 'page("photography").children.listed',
		select: {
			id: true,
			title: true,
			cover: {
				query: 'page.content.cover.toFile',
				select: {
					resized: {
						query: 'file.resize(1024, 1024)',
						select: {
							url: true,
						}
					},
					alt: true
				}
			},
			image: {
				query: 'page.images.first',
				select: {
					resized: {
						query: 'file.resize(1024, 1024)',
						select: {
							url: true,
						}
					},
					alt: true
				}
			}
		}
	}

	return {
		test: 'test',
		queries: [HomeQuery, query]
	};
});
