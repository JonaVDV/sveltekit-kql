import { file, page } from '$lib/kql';
import type { KQLQueryTypeResolver } from '$lib/types/query-resolver';
const HomeQuery = {
	query: page('home').children(),
	select: {
		id: true,
		title: true,
		intendedTemplate: true,
		description: true,
		headline: true,
		subheadline: true
	}
};

const photographyQuery = {
	query: page('photography').children(),
	select: {
		id: true,
		title: true,
		cover: {
			query: page().content().cover.toFile(),
			select: {
				resized: {
					query: file().resize(1024, 1024),
					select: {
						url: true
					}
				},
				alt: true
			}
		},
		image: {
			query: page().images().first(),
			select: {
				resized: {
					query: file().resize(1024, 1024),
					select: {
						url: true
					}
				},
				alt: true
			}
		}
	}
};

export const load = async ({ fetch }) => {
	const homeResponse = await fetch('./api/cms', {
		method: 'POST',
		body: JSON.stringify(HomeQuery)
	});

	const photographyResponse = await fetch('./api/cms', {
		method: 'POST',
		body: JSON.stringify(photographyQuery)
	});

	const homeData = (await homeResponse.json()) as KQLQueryTypeResolver<typeof HomeQuery>;
	const photographyData = (await photographyResponse.json()) as KQLQueryTypeResolver<
		typeof photographyQuery
	>;

	return {
		home: homeData,
		photography: photographyData
	};
};
