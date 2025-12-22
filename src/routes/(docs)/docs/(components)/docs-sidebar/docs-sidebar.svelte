<script lang="ts">
	import { resolve } from '$app/paths';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as m from '$lib/paraglide/messages';
	import { ArchiveIcon, BookTextIcon, CogIcon, KeyIcon, UserLockIcon } from '@lucide/svelte';
	import type { ComponentProps } from 'svelte';

	// Menu items.
	const items = [
		{
			title: m.authentication(),
			url: resolve('/docs/auth'),
			icon: UserLockIcon
		},
		{
			title: m.feat_auto_api(),
			url: resolve('/docs/auto-api'),
			icon: CogIcon
		},
		{
			title: m.permission_control(),
			url: resolve('/docs/permissions'),
			icon: KeyIcon
		},
		{
			title: m.storage(),
			url: resolve('/docs/permissions'),
			icon: ArchiveIcon
		}
	];

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:p-1.5!">
					{#snippet child({ props })}
						<a href={resolve('/docs')} {...props}>
							<BookTextIcon class="" />
							<span class="text-base font-semibold">BaaS Docs</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Modules</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
