import type { ServerLoad, ServerLoadEvent } from '@sveltejs/kit';
import { kqlHandler, type KQLClientOptions } from './kql-handler';
import type { KirbyQueryRequest } from 'kirby-types';
import { transformQuery } from './utils';

export interface KQLLoadOptions extends KQLClientOptions {
	/**
	 * allows you to transform the data returned from the KQL query or add additional data
	 * @param data - The data returned from the KQL query
	 * @returns The transformed data
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- We don't know the shape of the data since it's json
	transform?: (data: any, event: ServerLoadEvent) => any;
}

/**
 * executes a sveltekit server load function that fetches data from kirby cms using kql
 * @param query - The KQL query to execute
 * @param options - Options for the KQL client
 * @returns A server load function that fetches the KQL data and additional data when specified
 */
export function kqlLoad(query: KirbyQueryRequest, options: KQLLoadOptions = {}) {
	return async (event: ServerLoadEvent) => {
		const { transform, ...clientOptions } = options;
		const { fetch, depends } = event;
		const transformedQuery = transformQuery(query);
		// Create a unique dependency key for this query
		const dependencyKey = `kql:${JSON.stringify(transformedQuery.query)}` as const;
		depends(dependencyKey);

		const data = await kqlHandler(transformedQuery, { ...clientOptions, fetch });

		return {
			kqlData: transform ? transform(data, event) : data.result,
			code: data.code,
			status: data.status
		};
	};
}
