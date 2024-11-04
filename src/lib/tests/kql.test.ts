import {
	createKQLProxy,
	proxyHandler,
	file,
	site,
	kirby,
	page,
	type WithDynamicProps
} from '$lib/kql';
import { describe, expect, it } from 'vitest';

describe('test proxyHandler', () => {
	it('should return a proxy object', () => {
		const obj = createKQLProxy();
		expect(obj.test).toBeDefined();
	});

	it('should return a proxy object with a path', () => {
		const obj = createKQLProxy('test');
		expect(obj.test).toBeDefined();
	});

	it('should return a proxy object with a path and a function', () => {
		const obj = createKQLProxy('test');
		expect(obj.test()).toBeDefined();
	});
});

describe('stringied output paths', () => {
	it('should return a stringified path', () => {
		const obj = createKQLProxy('obj');
		expect(obj.test.toString()).toBe('obj.test');
	});

	it('should return a stringified path with a function', () => {
		const obj = createKQLProxy('test');
		expect(obj.test().toString()).toBe('test.test');
	});
});

describe('test kirby primitives', () => {
	it('should return a site object', () => {
		const obj = site();
		expect(obj.title).toBeDefined();
	});

	it('should return a page object', () => {
		const obj = page();
		expect(obj.title).toBeDefined();
	});

	it('should return a kirby object', () => {
		const obj = kirby();
		expect(obj.version).toBeDefined();
	});

	it('should return a file object', () => {
		const obj = file();
		expect(obj.filename).toBeDefined();
	});

	it('should return the correct path from the toString method', () => {
		const obj = file();
		expect(obj.filename.toString()).toBe('file.filename');
	});
});
