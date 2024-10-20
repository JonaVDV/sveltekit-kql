/**
 * Transform the query by converting 'query' keys to their string paths, and recursively processing nested objects and functions
 * @param query - The query object to transform
 * @returns The transformed query object
 */
export function transformQuery<T extends object>(query: T): Record<string, any> {
	return Object.fromEntries(
		Object.entries(query).map(([key, value]) => [
			key,
			key === 'query' || typeof value === 'function'
				? value.toString()
				: typeof value === 'object'
					? transformQuery(value)
					: value
		])
	);
}
