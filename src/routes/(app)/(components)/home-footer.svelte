<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<footer class="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
	<p class="text-xs text-gray-500 dark:text-gray-400">{m.copy_right()}</p>
	<nav class="flex gap-4 sm:ml-auto sm:gap-6">
		<a class="text-xs underline-offset-4 hover:underline" href="/"> {m.terms_of_service()} </a>
		<a class="text-xs underline-offset-4 hover:underline" href="/"> {m.privacy_policy()} </a>
	</nav>
</footer>
