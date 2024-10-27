<script lang="ts">
	import DashboardSidebar from './project-sidebar.svelte';
	import DashboardHeader from './project-header.svelte';

	let { children } = $props();
</script>

<DashboardSidebar />
<section class="w-full">
	<DashboardHeader />
	{@render children?.()}
</section>
