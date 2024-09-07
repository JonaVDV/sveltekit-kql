import type { KirbyQueryRequest, KirbyQueryResponse } from 'kirby-types';

export interface KQLClientOptions {
	language?: string;
	cache?: boolean;
	headers?: Record<string, string>;
	credentials?: RequestCredentials;
	authentication?: 'bearer' | 'basic';
	fetch?: typeof globalThis.fetch;
	kirbyUrl?: string;
	timeout?: number;
}

async function getKirbyEnv() {
	const kirbyEnv = await import('$env/static/private');
	const kirbyEnvKeys: Partial<Record<string, string>> = {
		KIRBY_HEADLESS_API_TOKEN: kirbyEnv.KIRBY_HEADLESS_API_TOKEN,
		KIRBY_HEADLESS_API_USER: kirbyEnv.KIRBY_HEADLESS_API_USER,
		KIRBY_HEADLESS_API_PASSWORD: kirbyEnv.KIRBY_HEADLESS_API_PASSWORD,
		KIRBY_HEADLESS_API_URL: kirbyEnv.KIRBY_HEADLESS_API_URL
	};

	return kirbyEnvKeys;
}

async function handleAuth(authMethod: KQLClientOptions['authentication']) {
	// TODO: surely there's a better way to do this
	const kirbyEnvKeys = await getKirbyEnv();
	if (!kirbyEnvKeys.KIRBY_HEADLESS_API_URL) {
		throw new Error('KIRBY_HEADLESS_API_URL is not defined in the .env file');
	}

	if (authMethod === 'bearer') {
		if (!kirbyEnvKeys.KIRBY_HEADLESS_API_TOKEN) {
			throw new Error('KIRBY_HEADLESS_API_TOKEN is not defined in the .env file');
		}
		return 'Bearer ' + kirbyEnvKeys.KIRBY_HEADLESS_API_TOKEN;
	}

	if (authMethod === 'basic') {
		if (!kirbyEnvKeys.KIRBY_HEADLESS_API_USER || !kirbyEnvKeys.KIRBY_HEADLESS_API_PASSWORD) {
			throw new Error(
				'KIRBY_HEADLESS_API_USER or KIRBY_HEADLESS_API_PASSWORD is not defined in the .env file'
			);
		}
		return (
			'Basic ' +
			Buffer.from(
				`${kirbyEnvKeys.KIRBY_HEADLESS_API_USER}:${kirbyEnvKeys.KIRBY_HEADLESS_API_PASSWORD}`
			).toString('base64')
		);
	}

	throw new Error('Invalid authentication method');
}

export async function kqlHandler<T extends KirbyQueryResponse>(
	query: KirbyQueryRequest,
	options: KQLClientOptions = {}
): Promise<T> {
	const {
		language,
		authentication = 'bearer',
		credentials = 'include',
		cache = true,
		headers = {},
		fetch = globalThis.fetch,
		kirbyUrl,
		timeout = 30000 // 30 seconds
	} = options;

	const auth = await handleAuth(authentication);
	const urlFallback = (await import('$env/static/private')).KIRBY_HEADLESS_API_URL;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const url = kirbyUrl || urlFallback;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(language && { 'X-Language': language }),
				...headers,
				Authorization: auth
			},
			credentials,
			body: JSON.stringify(query),
			signal: controller.signal
		});

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`KQL request failed: ${response.status} ${response.statusText}\n${errorBody}`
			);
		}

		return await response.json();
	} finally {
		clearTimeout(timeoutId);
	}
}
