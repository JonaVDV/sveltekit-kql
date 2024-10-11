// import type {  } from './models';
import { kirbyContext } from '$lib/server/utils';
import * as HS from 'hotscript';
import type { Field } from './field';
import type { KQLQueryData } from './query';
import type { Collection } from './collection';

const query = {
	query: 'site()',
	select: {
		title: true,
		logo: {
			query: 'site.logo.toFile',
			select: {
				srcset: true,
				width: true,
				height: true,
				placeholder: 'file.resize(5).url'
			}
		},
		pages: {
			query: 'site.children',
			select: {
				title: true,
				tags: "page.tags.split(',')"
			}
		}
	}
} as const;
// type Content = KQLQueryData<typeof query>;
const queryWithFunctions = {
	query: page(),
	select: {
		id: true,
		title: true,
		logo: {
			query: site().logo.toFile(),
			select: {
				srcset: true,
				width: true,
				height: true,
				placeholder: file().resize(5).url()
			}
		},
		pages: {
			query: site().children(),
			select: {
				title: true,
				tags: page().tags.split(',')
			}
		}
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

type GetSelectKeys<T> = T extends { select: infer S } ? S : T;

/**
 * Prettify the type mainly in a way that ensures that the leftovers are removed.
 *
 * @example
 * //from this:
 * select: {
 *   srcset: true,
 *   width: true,
 *   height: true,
 *   placeholder: file().resize(5).url()
 * }
 *
 * //We get this:
 * propAboveSelect: {
 *   srcset: true,
 *   width: true,
 *   height: true,
 *   placeholder: string
 * }
 */
type ExtractPropsFromSelect<T> = T extends { select: infer S } ? { [K in keyof S]: S[K] } : T;
/**
 * Get the key from the query or if it is not there, return the type of the __extra property
 */
type GetKeyFromQueryOrExtra<T extends { __extra: any }, K> = K extends keyof T
	? T[K]
	: T['__extra'];
/**
 * used to check if a value of a key is a boolean if it is, we return true, otherwise false
 */
type IsKeyBooleanType<TObject extends Record<string, any>, Key> = Key extends keyof TObject
	? TObject[Key] extends boolean
		? true
		: false
	: false;

type GetQueryTypeDefaultOrExtra<TQuery> = TQuery extends { __default: infer Default }
	? Default
	: TQuery extends { __extra: infer Extra }
		? Extra
		: never;

/**
 * gets the __default property from an object if it exists, otherwise it returns the object itself
 */
type ExtractDefault<T> = T extends { __default: infer D } ? D : T;

/**
 * CompareAndGetFromQuery takes a select object, a key, and a query object,
 * and returns the appropriate type based on the key's value in the select object.
 */
type CompareAndGetFromQuery<
	TSelectObject extends Record<string, any>, // The select object
	Key, // The key to look up in the select object
	Query extends { __extra: any } // The query object with an __extra property
> = Key extends keyof TSelectObject // Check if the key exists in the select object
	? IsKeyBooleanType<TSelectObject, Key> extends true // Check if the key's value is a boolean
		? ExtractDefault<GetKeyFromQueryOrExtra<ToCollection<Query>, Key>> // If true, get the default value from the query or extra property
		: TSelectObject[Key] extends Record<string, any> // Check if the key's value is an object
			? GetSelectKeys<TSelectObject[Key]> extends { query: infer NestedQuery } // Check if the object has a nested query
				? InferredQueryTypeMapper<{ query: ToCollection<NestedQuery> }> // Recursively map the nested query
				: ExtractPropsFromSelect<TSelectObject[Key]> // Return the object itself if no nested query
			: TSelectObject[Key] // Return the key's value if it's not an object
	: GetQueryTypeDefaultOrExtra<Query>;

type InferredQueryTypeMapper<
	T extends KQLQuery,
	SelectKeys = GetSelectKeys<T>
> = ExtractPropsFromSelect<{
	[K in keyof SelectKeys]: CompareAndGetFromQuery<T['select'], K, ToCollection<T['query']>>;
}>;

type ToCollection<T> = T extends Collection<infer U> ? U : T;

export type KQLQuery = {
	query: any;
	select?: any;
	models?: any;
	pagination?: {
		limit?: number;
		page?: number;
	};
};

export type KQLQueryResult<T> = {
	result: T;
	status: string;
	code: number;
};

/**
 * KQLQueryTypeResolver takes a KQLQuery type and transforms it into a type
 * with inferred properties based on the query's select keys.
 */
export type KQLQueryTypeResolver<T extends KQLQuery> = ExtractPropsFromSelect<{
	// Iterate over each key in the select object of the query
	[K in keyof GetSelectKeys<T>]: GetSelectKeys<T>[K] extends { query: infer Q } // If the select key has a nested query, recursively map it
		? InferredQueryTypeMapper<GetSelectKeys<T>[K]>
		: // If the select key is a boolean, get the default value from the query or extra property
			IsKeyBooleanType<GetSelectKeys<T>, K> extends true
			? ExtractDefault<GetKeyFromQueryOrExtra<ToCollection<T['query']>, K>>
			: GetSelectKeys<T>[K];
}>;

let test3 = {} as KQLQueryTypeResolver<typeof photographyQuery>;
