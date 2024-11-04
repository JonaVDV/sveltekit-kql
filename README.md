# Sveltekit-KQL

> **Warning:** This library is still a work in progress which means lots and lots of bugs and breaking changes. Use at your own risk.

Sveltekit-KQL is a library that allows you to use KQL (Kirby Query Language) for [kirby cms](https://getkirby.com/) CMS in your SvelteKit project. It provides a way to fetch data from your Kirby CMS using KQL queries with the power of sveltekit's [load functions](https://svelte.dev/docs/kit/load) at your fingertips.

The type system that i am implementing here in order to resolve Kirby Query Language (KQL) queries is heavily inspired (and based on) from the works of [johanschopplich](https://github.com/johannschopplich/kirby-types) and [benwest](https://github.com/benwest/kql-ts).

## Installation

```bash
npm install sveltekit-kql
bun add sveltekit-kql
pnpm add sveltekit-kql
yarn add sveltekit-kql
```

## Why did you make this?

I wanted to make this library for a pretty long time, around 1.5 years. I had been using kirby cms at my internship and i really liked what it had to offer, but once i was working on a project where i had to use it with remix.run, i found out that all the data we fetched was just typed as any, which made it really hard to know what data we were getting from the server.

and 1.5 years later, i am still in college and i have some spare time and i am working on a project where i am going to use sveltekit and kirby cms, so i thought why not make a library that allows me to use KQL queries in sveltekit and also have typesafety.

## How did you make this work?

In order to make this library function we are relying heavily on a javascript construct known as proxies. Proxies have recently been seen in svelte in order to make objects and arrays deeply reactive. We are using proxies to be able to use functions from kql as functions instead of strings. This allowes us not only to have typesafety when writing queries but, we also are able to more easily get the correct types from the queries.

What we do is actually quite simple. We take a base function like `page()` and wrap it in a proxy. This proxy then recursively wraps every function call or property access we do on that page object. This allows us to have typesafety and also not run into the problem of undefined properties/functions.

and at the end of writing the query you can simply call the transformQuery function to get the query (recursively) in string format.

```typescript
import { page, site } from 'sveltekit-kql/kql';
import { transformQuery } from 'sveltekit-kql/utils';

const query = {
	query: page('about'),
	select: {
		title: true
	}
};

const queryString = transformQuery(query);
/**
 * output:
 * {
 *  query: 'page("about")',
 *  select: {
 *      title: true
 *  }
 * }
 *
 */
```

## Usage

in order to setup sveltekit-kql in your project, there are 2 steps you need to follow:

1. Create a new api route in your sveltekit project with the following code:

```typescript
import { env } from '$env/dynamic/private';
import { kqlHandler } from 'sveltekit-kql/server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const body = await request.json();

	const response = await kqlHandler({
		query: body,
		fetch,
		endpoint: env.KIRBY_HEADLESS_API_URL,
		auth: `Bearer ${env.KIRBY_HEADLESS_API_TOKEN}`
	});

	return json(response.result, {
		status: response.code,
		statusText: response.status
	});
};
```

this code will allow you to use the kqlHandler function to fetch data from your kirby cms. we currently do not have types for the response object, but we will soon™.

2. Use a load function in your sveltekit project to fetch data from your kirby cms.

```typescript
import { page } from 'sveltekit-kql/kql';
import type { KQLQueryTypeResolver } from 'sveltekit-kql/types';

const homeQuery = {
	query: page('home'),
	select: {
		title: true,
		description: true
	}
};

export async function load() {
	const response = await fetch('/api/kql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(homeQuery)
	});

	// the type of data will be inferred from the homeQuery object through the use of KQLQueryTypeResolver
	const data = (await response.json()) as KQLQueryTypeResolver<typeof homeQuery>;

	return {
		page: data
	};
}
```

and that's it! you can use sveltekit as normal and fetch data from your kirby cms using KQL queries.

there is still a lot of work to be done on this library, but i am working on it and i will try to make it as good as possible.
so we can all enjoy the benefits of using kirby cms with sveltekit.

## Documentation

Documentation is still in progress. There will be a site for this library soon™.

## License

[MIT](https://github.com/JonaVDV/sveltekit-kql/blob/main/LICENSE)
