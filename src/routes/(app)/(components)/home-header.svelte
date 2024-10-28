<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import ThemeSwitch from '$lib/components/theme-switch.svelte';
</script>

<header class="px-4 lg:px-6 h-14 flex items-center">
	<a class="flex items-center justify-center" href="/">
		<span class="font-bold text-2xl">{m.title()}</span>
	</a>
	<nav class="ml-auto flex gap-4 items-center">
		<a class="text-sm font-medium hover:underline underline-offset-4" href="/"> Features </a>
		<a class="text-sm font-medium hover:underline underline-offset-4" href="/"> Pricing </a>
		<a class="text-sm font-medium hover:underline underline-offset-4" href="/"> Documentation </a>
		<a class="text-sm font-medium hover:underline underline-offset-4" href="/"> Contact </a>
		<LanguageSwitch />
		<ThemeSwitch />
	</nav>
</header>
