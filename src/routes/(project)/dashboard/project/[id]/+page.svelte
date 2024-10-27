<script>
	import { page } from '$app/stores';
	import { buttonVariants } from '$lib/components/ui/button';

	let id = $page.params.id;
</script>

<h1>{id}</h1>
<a class={buttonVariants({ variant: 'link' })} href="/dashboard">Dashboard</a>
