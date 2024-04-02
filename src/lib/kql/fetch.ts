import type { ServerLoadEvent } from '@sveltejs/kit';
import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types';
import util from 'util';
import { _generateTypes, _writeRoutePaths, getJsonTypes, writeTypes } from './types/generate';

/**
 * @todo Add some typescript magic that makes it so the queries themselves are not included in the final result based on the debug flag
 */
class Kql<TCallback> {
	private queries: Set<KirbyQuerySchema> = new Set();
	private results = new Map<string, any>();
	private queryKeys: string[] = [];

	constructor(
		private loadFunction: (event: ServerLoadEvent) => Promise<TCallback>,
		private debug = false
	) {}

	/**
	 * Checks if the given object is an instance of KirbyQuerySchema.
	 *
	 * @param obj - The object to check.
	 * @returns `true` if the object is an instance of KirbyQuerySchema, `false` otherwise.
	 */
	private isKirbyQuerySchema(obj: any): obj is KirbyQuerySchema {
		return obj && typeof obj === 'object' && 'query' in obj;
	}

	async kql(event: ServerLoadEvent) {
		if (!this.loadFunction) {
			throw new Error('No load function provided');
		}

		const loadResult = await this.loadFunction(event);
		if (!loadResult) {
			throw new Error('No load result provided. Please return an object from the load function.');
		}

		// Iterate over the properties of the loadResult object
		for (const key in loadResult) {
			const value = loadResult[key];
			if (
				this.isKirbyQuerySchema(value) ||
				(Array.isArray(value) && value.every(this.isKirbyQuerySchema))
			) {
				this.addQuery(value, key);
			}
		}

		// Execute all queries
		const queryPromises = Array.from(this.queries).map((query) => this.executeQuery(query, event));
		const results = await Promise.all(queryPromises);

		// Store the results
		results.forEach((result, index) => {
			const query = Array.from(this.queries)[index];
			this.results.set(query.query, result);
		});

		const mergedResults = this.mergeResults();

		// Exclude the queries from the final result if debug is off
		if (!this.debug) {
			for (const key of this.queryKeys) {
				delete (loadResult as { [key: string]: any })[key];
			}
		}

		const jsonTypes = getJsonTypes(mergedResults);
		const typeString = _generateTypes(jsonTypes, 2);
		_writeRoutePaths(event.route.id ?? '');
		writeTypes(typeString, event.route.id ?? '');

		return {
			...mergedResults,
			...loadResult
		};
	}

	/**
	 * Adds a query to the list of queries to be executed.
	 * @param value the query or queries to be executed
	 * @param key the key that the query was stored under in the load function
	 */
	private addQuery(value: KirbyQuerySchema | KirbyQuerySchema[], key: string) {
		if (Array.isArray(value)) {
			value.forEach((query) => {
				this.queries.add(query);
			});
		} else {
			this.queries.add(value);
		}

		this.queryKeys.push(key);
	}

	/**
	 * Merges the results of the KirbyQuerySchema objects into a single object.
	 * @returns The merged results as an object with keys representing the original keys and values representing the results.
	 */
	private mergeResults() {
		const mergedResults: { [key: string]: KirbyQueryResponse } = {}; // Add index signature
		this.results.forEach((result, key) => {
			mergedResults[key] = result;
		});
		if (this.debug) {
			console.log('Merged results:', util.inspect(mergedResults, { depth: null }));
		}
		return mergedResults;
	}

	/**
	 * Executes a KQL query by sending a POST request to the specified API endpoint.
	 * @param query - The KQL query to execute.
	 * @param event - The ServerLoadEvent object.
	 * @returns A Promise that resolves to the JSON response from the API.
	 * @throws An error if the request fails or returns a non-ok status code.
	 */
	private async executeQuery(query: KirbyQuerySchema, event: ServerLoadEvent) {
		const response = await event.fetch('http://localhost:8000/api/kql', {
			method: 'POST',
			body: JSON.stringify({
				...query
			}),
			headers: {
				Accept: '*/*',
				Authorization: 'Bearer test',
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(
				'Request failed with status code ' + response.status + ' for query ' + query.query
			);
		}

		const json = await response.json();

		return json;
	}
}
/**
 * Creates a KQL function. This function can be used to fetch data from Kirby using the KQL API.
 *
 * @example
 *
 * import { createKql } from '$lib/kql/index.js';
 * import type { PageServerLoad } from './$types.d.ts';
 *
 * export const load = createKql(async () => {
 * 	const HomeQuery = {
 * 		query: 'page("home")',
 * 		select: {
 * 			id: true,
 * 			title: true,
 * 			intendedTemplate: true,
 * 			// description: true,
 * 			headline: true,
 * 			subheadline: true
 * 		}
 *
 *  return {
 * 		queries: [HomeQuery],
 * 		yourData: 'yourData'
 * 	};
 * });
 *
 *
 *
 * @param loadFunction The load function that returns the data to be fetched and the queries to be executed
 * @param debug if set to true, the merged results will be logged to the console for debugging purposes
 * @returns The data returned by the load function. and the data fetched using the query you returned
 */
export function createKql<TCallback>(
	loadFunction: (event: ServerLoadEvent) => Promise<TCallback>,
	debug = false
) {
	const kqlInstance = new Kql(loadFunction, debug);
	return kqlInstance.kql.bind(kqlInstance);
}
