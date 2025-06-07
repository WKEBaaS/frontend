<script>
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import ThemeSwitcher from '$lib/components/theme-switch.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
</script>

<header
	class="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 inline-flex w-full items-center justify-between border-b backdrop-blur-sm"
>
	<Sidebar.Trigger />
	<div>
		<LanguageSwitch />
		<ThemeSwitcher />
	</div>
</header>
