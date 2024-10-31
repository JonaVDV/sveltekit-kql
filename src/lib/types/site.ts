import type { Field } from './field';
import type {
	allowedMethodsForChildren,
	allowedMethodsForFiles,
	allowedMethodsForModels
} from './allowedMethods';
import type { Page, Pages } from './page';

export interface Site
	extends allowedMethodsForChildren,
		allowedMethodsForFiles,
		allowedMethodsForModels {
	__extra: Field;
	__default: {
		title: string;
		children: string[];
		url: string;
	};
	// blueprint: () => Blueprint;
	breadcrumb: () => Pages;
	errorPage: () => Page;
	errorPageId: () => string;
	exists: () => boolean;
	homePage: () => Page;
	homePageId: () => string;
	mediaUrl: () => string;
	modified: (format: string, handler: string) => string | number;
	page: (path: string) => Page;
	pages: () => Pages;
	panel: () => Site;
	children: () => Pages;
	// permissions: () => SitePermissions;
	previewUrl: () => string;
	// search: (query: string, params: Array | string) => Pages;
	// url: (language: string) => string; // fields: () => Array;
	// isDefault: () => boolean;
	// name: () => string;
	// section: (name: string) => Section;
	// sections: () => Array;
	// tab: (name: string) => Array;
	// tabs: () => Array;
	title: () => Field;
}
