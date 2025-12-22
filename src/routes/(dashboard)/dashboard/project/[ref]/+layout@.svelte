<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import DashboardHeader from './(components)/project-header.svelte';
	import DashboardSidebar from './(components)/project-sidebar.svelte';

	let { children } = $props();
</script>

<DashboardSidebar />
<Sidebar.Inset>
	<DashboardHeader />
	{@render children?.()}
</Sidebar.Inset>
