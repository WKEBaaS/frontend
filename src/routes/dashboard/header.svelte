<script>
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import ThemeSwitcher from '$lib/components/theme-switch.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
</script>

<header
	class="inline-flex items-center justify-between border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
>
	<Sidebar.Trigger />
	<div>
		<LanguageSwitch />
		<ThemeSwitcher />
	</div>
</header>
