import { getContext, setContext } from 'svelte';

export interface NavItem {
	name: string;
	href: string;
}

export class DocsHeaderStore {
	name: string = $state('');
	navItems: NavItem[] = $state([]);

	constructor(name: string) {
		this.name = name;
	}

	setName(name: string) {
		this.name = name;
	}

	setNavItems(links: NavItem[]) {
		this.navItems = links;
	}
}

const DOCS_HEADER_STORE_KEY = Symbol('DocsHeaderStore');

export function setDocsHeaderStore(store: DocsHeaderStore, key = DOCS_HEADER_STORE_KEY) {
	setContext(key, store);
}

export function getDocsHeaderStore(key = DOCS_HEADER_STORE_KEY): DocsHeaderStore {
	return getContext(key);
}
