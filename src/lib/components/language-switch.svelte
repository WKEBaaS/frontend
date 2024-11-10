<script lang="ts">
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
	import Lang from 'lucide-svelte/icons/languages';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { i18n } from '$lib/i18n';

	function switchToLanguage(newLanguage: AvailableLanguageTag) {
		const canonicalPath = i18n.route($page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath);
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
		<Lang class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
		<span class="sr-only">Toggle theme</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item onclick={() => switchToLanguage('zh-tw')}>繁體中文</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => switchToLanguage('en')}>English</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
