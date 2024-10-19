import type { KirbyQueryRequest } from 'kirby-types';
import type { KQLLoadOptions } from './kql-load';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { kqlHandler } from './kql-handler';
import { transformQuery } from './utils';

import type { KQLQuery, KQLQueryTypeResolver } from '$lib/types/query-resolver';

type MultiQueryConfig<T extends Record<string, KQLQuery>> = {
	[key in keyof T]: {
		query: T[key];
		options?: KQLLoadOptions;
	};
};

export function createMultiQueryLoad<T extends Record<string, KQLQuery>>(
	config: MultiQueryConfig<T>
) {
	return async (event: ServerLoadEvent) => {
		const { fetch, depends } = event;
		const results: Map<string, any> = new Map();

		for (const [key, { query, options }] of Object.entries(config)) {
			const { transform, ...clientOptions } = options || {};
			const transformedQuery = transformQuery(query);
			const dependencyKey = `kql:${JSON.stringify(transformedQuery.query)}` as const;
			depends(dependencyKey);

			const data = await kqlHandler(transformedQuery, {
				...clientOptions,
				fetch
			});

			results.set(key, transform ? transform(data, event) : data);
		}
		return Object.fromEntries(results);
	};
}
