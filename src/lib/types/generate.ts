import fs from 'node:fs';
import path from 'node:path';

export function getJsonTypes(data: any): any {
	// convert the data to a map
	const surfaceMap = new Map(Object.entries(data));
	const deepMap = _setDeepMap(surfaceMap);

	return deepMap;
}

export function _generateTypes(data: Map<string, any>, indent = 0): string {
	let types = '';
	const indentStr = ' '.repeat(indent);

	for (const [key, value] of data) {
		// Add quotes around the key if it doesn't have them
		let formattedKey = key.includes('"') ? `'${key}'` : `"${key}"`;

		if (value instanceof Map) {
			types += `${indentStr}${formattedKey}: {\n${_generateTypes(value, indent + 2)}${indentStr}}\n`;
		} else if (Array.isArray(value)) {
			if (value[0] instanceof Map) {
				// Check if the first element of the array is a Map
				types += `${indentStr}${formattedKey}: Array<{\n${_generateTypes(value[0], indent + 2)}${indentStr}}>\n`;
			} else if (_isObject(value[0])) {
				// Check if the first element of the array is an object
				const mapValue = _setDeepMap(new Map(Object.entries(value[0])));
				types += `${indentStr}${formattedKey}: Array<{\n${_generateTypes(mapValue, indent + 2)}${indentStr}}>\n`;
			} else {
				// The array contains primitive types
				types += `${indentStr}${formattedKey}: ${typeof value[0]}[];\n`;
			}
		} else {
			types += `${indentStr}${formattedKey}: ${typeof value};\n`;
		}
	}

	return types;
}

export function AddPageData() {
	const expand = 'type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;';

	const queryType = `type QueryType = {
query: string;
select?: string[] | Record<string, string | number | boolean | QueryType>;
};`;

	const queryArrayType = `type QueryArrayType = QueryType[];`;

	const excludeQueries = `type ExcludeQueries<T> = {
[K in keyof T]: T[K] extends QueryArrayType | QueryType ? never : T[K];
};`;

	const removeNever = `type RemoveNever<T> = T extends any[] 
? RemoveNever<T[number]>[]
: Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;`;

	const parentData = `type ParentData = Expand<RemoveNever<ExcludeQueries<Omit<import('./$types').PageParentData, keyof import('./$types').PageServerData>>> & KQLParentData>;`;

	const kqlData = `export type KQLData = Expand<RemoveNever<ExcludeQueries<import('./$types').PageServerData>> & ParentData & Data>;`;
	const kqlLayoutData = `export type KQLLayoutData = ParentData`

	const result = `${expand}\n${queryType}\n${queryArrayType}\n${excludeQueries}\n${removeNever}\n${parentData}\n${kqlData}\n${kqlLayoutData}`;

	return result;
}

export function _formatText(text: string, indent: number): string {
	return text
		.split('\n')
		.map((line) => ' '.repeat(indent) + line)
		.join('\n');
}

export function _handleArrayTypes(data: Array<any>) {
	const newArray = data.map((value: any) => {
		if (_isObject(value)) {
			const newMap = _setDeepMap(new Map(Object.entries(value)));
			return newMap;
		} else {
			return value;
		}
	});

	return newArray;
}

export function _isObject(value: any): boolean {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function _setDeepMap(data: any): any {
	const deepMap = new Map();

	for (const [key, value] of data) {
		if (_isObject(value)) {
			const newMap = _setDeepMap(new Map(Object.entries(value)));
			deepMap.set(key, newMap);
		} else if (Array.isArray(value)) {
			deepMap.set(key, _handleArrayTypes(value));
		} else {
			deepMap.set(key, value);
		}
	}

	return deepMap;
}

export function _writeRoutePaths(route: string) {
	const routePath = path.join(process.cwd(), '.svelte-kit', 'types', 'src', 'routes', `${route}`);

	if (!fs.existsSync(routePath)) {
		fs.mkdirSync(routePath, { recursive: true });
	}
}

export function _getKirbyTypesPath(route: string) {
	const typesPath = path.join(process.cwd(), '.svelte-kit', 'types', 'src', 'routes', `${route}`);
	return typesPath;
}

export function writeTypes(
	pageTypes: string,
	parentTypes: string,
	route: string,
) {
	const typePrefix = `type Data = {\n${pageTypes}};\n\ntype KQLParentData = {\n${parentTypes}};\n\n`;
	const generalTypes = AddPageData();

	const typesPath = path.join(_getKirbyTypesPath(route), `$kql.d.ts`);
	fs.writeFileSync(typesPath, typePrefix + generalTypes);
}
