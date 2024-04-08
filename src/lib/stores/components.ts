import type { KirbyDefaultBlocks } from 'kirby-types';
import type { ComponentType } from 'svelte';
import { writable } from 'svelte/store';

/**
 * Stores all the components that will be used for rendering content from kirby cms
 * @example
 * import { components } from '$lib/stores/components';
 *
 * $components = {
 *   ...$components,
 *   text: TextBlock,
 *   image: ImageBlock,
 * }
 */
export const components = writable<Partial<Record<keyof KirbyDefaultBlocks, ComponentType>>>();