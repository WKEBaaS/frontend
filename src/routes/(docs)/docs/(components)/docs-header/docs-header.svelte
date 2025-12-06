<script lang="ts">
	import { resolve } from '$app/paths';
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import ThemeSwitch from '$lib/components/theme-switch.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages';
	import { UserAvatar } from '$lib/components/user-avatar/index.js';
</script>

<header class="flex h-14 items-center px-4 lg:px-6">
	<nav class="ml-auto flex items-center gap-4">
		<!-- <a class="text-sm font-medium underline-offset-4 hover:underline" href="/"> Features </a> -->
		<Button variant="default" href={resolve('/dashboard')}>{m.dashboard()}</Button>
		<LanguageSwitch />
		<ThemeSwitch />
		<UserAvatar />
	</nav>
</header>
