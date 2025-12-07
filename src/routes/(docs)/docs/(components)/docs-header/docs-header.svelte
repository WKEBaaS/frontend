<script lang="ts">
	import { resolve } from '$app/paths';
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import ThemeSwitch from '$lib/components/theme-switch.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages';
	import { UserAvatar } from '$lib/components/user-avatar/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { getDocsHeaderStore } from './docs-header-score.svelte.js';

	const store = getDocsHeaderStore();
</script>

<header class="flex h-14 items-center px-4 lg:px-6">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item class="hidden md:block">
				<Breadcrumb.Link href={resolve('/docs')}>{store.name}</Breadcrumb.Link>
			</Breadcrumb.Item>
			{#each store.navItems as { name, href } (name)}
				<Breadcrumb.Separator class="md:block" />
				<Breadcrumb.Item class="md:block">
					<Breadcrumb.Link {href}>{name}</Breadcrumb.Link>
				</Breadcrumb.Item>
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
	<nav class="ml-auto flex items-center gap-4">
		<Button variant="default" href={resolve('/dashboard')}>{m.dashboard()}</Button>
		<LanguageSwitch />
		<ThemeSwitch />
		<UserAvatar />
	</nav>
</header>
