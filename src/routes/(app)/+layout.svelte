<script lang="ts">
	import HomeFooter from './(components)/home-footer.svelte';
	import HomeHeader from './(components)/home-header.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col">
	<main class="flex-1">
		<HomeHeader />
		{@render children()}
	</main>
	<HomeFooter />
</div>
