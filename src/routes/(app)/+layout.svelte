<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import HomeFooter from './(components)/home-footer.svelte';
	import HomeHeader from './(components)/home-header.svelte';
	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<div class="flex min-h-screen w-full flex-col">
	<main class="flex-1">
		<HomeHeader session={data.session} />
		{@render children()}
	</main>
	<HomeFooter />
</div>
