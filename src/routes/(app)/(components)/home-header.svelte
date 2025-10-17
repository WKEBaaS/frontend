<script lang="ts">
	import { resolve } from '$app/paths';
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import ThemeSwitch from '$lib/components/theme-switch.svelte';
	import * as m from '$lib/paraglide/messages';
	import NavAvatar from './home-avatar.svelte';
</script>

<header class="flex h-14 items-center px-4 lg:px-6">
	<a class="flex items-center justify-center" href={resolve('/')}>
		<span class="text-2xl font-bold">{m.title()}</span>
	</a>
	<nav class="ml-auto flex items-center gap-4">
		<!-- <a class="text-sm font-medium underline-offset-4 hover:underline" href="/"> Features </a> -->
		<!-- <a class="text-sm font-medium underline-offset-4 hover:underline" href="/"> Documentation </a> -->
		<LanguageSwitch />
		<ThemeSwitch />
		<NavAvatar />
	</nav>
</header>
