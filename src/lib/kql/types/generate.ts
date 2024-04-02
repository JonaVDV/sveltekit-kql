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
    } else if (Array.isArray(value) && value[0] instanceof Map) { // Check if the first element of the array is a Map
      types += `${indentStr}${formattedKey}: Array<{\n${_generateTypes(value[0], indent + 2)}${indentStr}}>\n`;
    } else {
      types += `${indentStr}${formattedKey}: ${typeof value};\n`;
    }
  }

  return types;
}

function AddPageData(){
	return `\ntype KQLData = import("./$types").PageData & Data;`;
}

function _handleArrayTypes(data: Array<any>) {
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

function _isObject(value: any): boolean {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function _setDeepMap(data: any): any {
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

function _getKirbyTypesPath(route: string) {
	const typesPath = path.join(process.cwd(), '.svelte-kit', 'types', 'src', 'routes', `${route}`);
	return typesPath;
}

export function writeTypes(types: string, route: string) {
	const type = `export type Data = {\n${types}};\n${AddPageData()}`;
	const typesPath = path.join(_getKirbyTypesPath(route), `$kql.d.ts`);
	fs.writeFileSync(typesPath, type);
}
