<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import DashboardHeader from './header.svelte';
	import DashboardSidebar from './sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<DashboardSidebar />
	<main class="w-full">
		<DashboardHeader />
		{@render children?.()}
	</main>
</Sidebar.Provider>
