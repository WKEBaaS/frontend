<script lang="ts">
	import { DocsSidebar } from './(components)/docs-sidebar/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { DocsHeader } from './(components)/docs-header/index.js';

	let { children } = $props();
</script>

<DocsSidebar />
<Sidebar.Inset>
	<DocsHeader />
	{@render children?.()}
</Sidebar.Inset>
