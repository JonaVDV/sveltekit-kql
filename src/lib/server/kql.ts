import type { ServerLoadEvent } from '@sveltejs/kit';
import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types';
import util from 'util';
import { _generateTypes, _writeRoutePaths, getJsonTypes, writeTypes } from '$lib';

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

	/**
	 * The main function that is called by the server to fetch data from Kirby using the KQL API.
	 * @param event the server load event from sveltekit this way we can access important information like the fetch function
	 * @returns the data returned by the load function and the data fetched using the query you returned
	 */
	async kql(event: ServerLoadEvent): Promise<TCallback> {
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
		const route = event.route.id ?? '/';
		this.generateTypes(event, route);

		return {
			...mergedResults,
			...loadResult
		};
	}

	private async generateTypes(event: ServerLoadEvent, route: string) {
		const parentData = await event.parent();
		const parentJsonTypes = getJsonTypes(parentData);
		const pageJsonTypes = getJsonTypes(this.mergeResults());
		const pageTypes = _generateTypes(pageJsonTypes, 2);
		const parentTypes = _generateTypes(parentJsonTypes, 2);

		writeTypes(pageTypes, parentTypes, route);
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
		const mergedResults = {}; // Add index signature
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
 * import { createKql } from 'sveltekit-kql';
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
 * 		}; 
 *  };
 *
 *     return {
 *         queries: [HomeQuery],
 *         additionalData: 'data'
 *     }
 * });
 *
 * @remarks
 * the queries from the load function will not be included in the final result
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
	// bind the kql function to the instance so it can be called from the outside
	return kqlInstance.kql.bind(kqlInstance);
}