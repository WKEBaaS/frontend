<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<footer
	class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
>
	<p class="text-xs text-gray-500 dark:text-gray-400">{m.copy_right()}</p>
	<nav class="sm:ml-auto flex gap-4 sm:gap-6">
		<a class="text-xs hover:underline underline-offset-4" href="/"> {m.terms_of_service()} </a>
		<a class="text-xs hover:underline underline-offset-4" href="/"> {m.privacy_policy()} </a>
	</nav>
</footer>
