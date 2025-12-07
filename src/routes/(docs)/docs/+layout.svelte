<script lang="ts">
	import { DocsSidebar } from './(components)/docs-sidebar/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { DocsHeader } from './(components)/docs-header/index.js';
	import { DocsHeaderStore, setDocsHeaderStore } from './(components)/docs-header/index.js';

	let { children } = $props();

	const docsHeaderStore = new DocsHeaderStore('Docs');
	setDocsHeaderStore(docsHeaderStore);
</script>

<DocsSidebar />
<Sidebar.Inset>
	<DocsHeader />
	{@render children?.()}
</Sidebar.Inset>
