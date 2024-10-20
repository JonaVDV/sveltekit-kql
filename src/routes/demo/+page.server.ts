import { kqlLoad } from '$lib/server';
import { createMultiQueryLoad } from '$lib/server/multi-query';
import type { kirbyContext } from '$lib/server/utils';
import type { KQLQueryData } from '$lib/types/query';
import type { KQLQueryTypeResolver } from '$lib/types/query-resolver';
import type { KirbyQuerySchema } from 'kirby-types';
const HomeQuery = {
	query: page('home'),
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

export const load = kqlLoad(photographyQuery);
