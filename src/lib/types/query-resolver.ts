import type { Collection } from './collection';
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

/**
 *
 * Get the __default property from a query object if it exists, otherwise get the __extra property
 */
type GetQueryTypeDefaultOrExtra<TQuery> = TQuery extends { __default: infer Default }
	? Default
	: TQuery extends { __extra: infer Extra }
		? Extra
		: never;

/**
 * gets the __default property from an object if it exists, otherwise it returns the object itself
 */
type ExtractDefault<T> = T extends { __default: infer D } ? D : T;

type FunctionToReturn<T> = T extends (...args: any) => any ? ReturnType<T> : T;

/**
 * CompareAndGetFromQuery takes a select object, a key, and a query object,
 * and returns the appropriate type based on the key's value in the select object.
 */
type CompareAndGetFromQuery<
	TSelectObject extends Record<string, any>,
	Key,
	Query extends { __extra: any } // Query object must have an __extra property so we can fall back to it for user-defined properties
> = Key extends keyof TSelectObject
	? IsKeyBooleanType<TSelectObject, Key> extends true
		? // make sure that if the type of the given key is a function, we return the return type of that function otherwise users need to call functions in their templats that don't return anything
			FunctionToReturn<ExtractDefault<GetKeyFromQueryOrExtra<ToCollection<Query>, Key>>>
		: TSelectObject[Key] extends KQLQuery
			? WrapIfCollection<
					KQLQueryTypeResolver<{
						query: ToCollection<TSelectObject[Key]['query']>;
						select: TSelectObject[Key]['select'];
					}>,
					TSelectObject[Key]['query']
				>
			: ExtractDefault<TSelectObject[Key]>
	: GetQueryTypeDefaultOrExtra<Query>;

export type KQLQueryTypeResolver<T extends KQLQuery> = WrapIfCollection<
	{
		[K in keyof T['select']]: CompareAndGetFromQuery<T['select'], K, T['query']>;
	},
	T['query']
>;

type IsCollection<T> = T extends Collection<any> ? true : false;
type ToCollection<T> = T extends Collection<infer U> ? U : T;
/**
 * WrapIfCollection takes a type and a query and returns the type as an array if the query is a collection
 */
type WrapIfCollection<TObject, Query> = IsCollection<Query> extends true ? TObject[] : TObject;

/**@todo - make sure this is usable in `createMultiQueryLoad` */
type MultiQueryTypeResolver<T extends Record<string, KQLQuery> & { options: any }> = {
	[key in keyof T]: KQLQueryTypeResolver<T[key]>;
};

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
