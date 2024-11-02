import { env } from '$env/dynamic/private';
import { kqlHandler } from '$lib/server/kql-handler';
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
