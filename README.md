# Sveltekit-KQL

**waring: this library is still a work in progress and is not yet ready for production use.**
Sveltekit-KQL is a library that allows you to use KQL (Kirby Query Language) for [kirby cms](https://getkirby.com/) CMS in your SvelteKit project. this library provides a wrapper for [load functions](https://kit.svelte.dev/docs/load) in SvelteKit.

## Installation

**waring: this library is not yet published to npm as it is still a work in progress.**

```bash
npm install sveltekit-kql
bun add sveltekit-kql
pnpm add sveltekit-kql
yarn add sveltekit-kql
```

## Usage

````typescript
// src/routes/page.server.ts
import { kqlLoad } from 'sveltekit-kql';

const HomeQuery = {
	// we are going to trick typescript here in the future to allow us to get typesafety on queries using the declare keyword
	// for now this will just be returning any
	query: page('home'),
	select: {
		id: true,
		title: true,
		intendedTemplate: true,
		// description: true,
		headline: true,
		subheadline: true
	}
};

export const load = kqlLoad(homeQuery);

// src/routes/page.svelte```
<script lang=ts>
    // you can now access the data from the query in the data variable
    export let data: any;
</script>
````

if you want to load multiple queries in the same file you can do so like this:

```typescript
// src/routes/page.server.ts
import { createMultiQueryLoad } from 'sveltekit-kql';

const HomeQuery = {
	query: 'page("home")',
	select: {
		id: true,
		title: true,
		intendedTemplate: true,
		// description: true,
		headline: true,
		subheadline: true
	}
};

const photographyQuery = {
	query: 'page("photography").children.listed',
	select: {
		id: true,
		title: true,
		cover: {
			query: 'page.content.cover.toFile',
			select: {
				resized: {
					query: 'file.resize(1024, 1024)',
					select: {
						url: true
					}
				},
				alt: true
			}
		},
		image: {
			query: 'page.images.first',
			select: {
				resized: {
					query: 'file.resize(1024, 1024)',
					select: {
						url: true
					}
				},
				alt: true
			}
		}
	}
};

export const load = createMultiQueryLoad({
	photography: {
		query: photographyQuery
	},
	home: {
		query: HomeQuery
	}
});
```

## transforming data
you can transform the data that is returned from the query by passing a transform function to the load function like this:

```typescript
// src/routes/page.server.ts
import { kqlLoad } from 'sveltekit-kql';

const HomeQuery = {
    query: 'page("home")',
    select: {
        id: true,
        title: true,
        intendedTemplate: true,
        // description: true,
        headline: true,
        subheadline: true
    }
};

export const load = kqlLoad()
```

## License

MIT
