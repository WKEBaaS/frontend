<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import Frown from 'lucide-svelte/icons/frown';
</script>

<div class="flex w-full flex-col items-center justify-center min-h-screen px-4 bg-secondary">
	<div class="text-center space-y-4">
		<Frown class="text-gray-400" size="16rem" />
		<h1 class="text-[120px] font-light text-gray-400 leading-none">
			{page.status}
		</h1>
		<Button href="/" variant="link" class="text-2xl text-gray-400 font-light mb-4">Go Back Home</Button>
		<p class="text-gray-500 max-w-md mx-auto">
			{page.error?.message}
		</p>
	</div>
</div>
