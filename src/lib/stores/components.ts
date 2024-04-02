import type { ComponentType } from "svelte";
import { writable } from "svelte/store";

export const components = writable<Record<string, ComponentType>>({});