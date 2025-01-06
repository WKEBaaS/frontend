<script>
	import { page } from '$app/state';

	let id = page.params.id;
	let { data } = $props();
</script>

<div class="container pt-10">
	<h1 class="text-xl">Project ID is {id}</h1>
	<a class="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">Go to Dashboard</a>
</div>
