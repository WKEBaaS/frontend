<script lang="ts">
	import DashboardSidebar from './(components)/project-sidebar.svelte';
	import DashboardHeader from './(components)/project-header.svelte';

	let { children } = $props();
</script>

<DashboardSidebar />
<section class="w-full">
	<DashboardHeader />
	{@render children?.()}
</section>
