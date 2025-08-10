<script lang="ts">
	import DashboardSidebar from './(components)/project-sidebar.svelte';
	import DashboardHeader from './(components)/project-header.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let { children } = $props();
</script>

<DashboardSidebar />
<Sidebar.Inset>
	<DashboardHeader />
	{@render children?.()}
</Sidebar.Inset>
