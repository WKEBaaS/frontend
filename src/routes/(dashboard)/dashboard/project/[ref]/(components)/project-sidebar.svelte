<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { FolderIcon, ShieldIcon } from '@lucide/svelte';
	import Archive from '@lucide/svelte/icons/archive';
	import Database from '@lucide/svelte/icons/database';
	import House from '@lucide/svelte/icons/house';
	import Settings from '@lucide/svelte/icons/settings';
	import UserLock from '@lucide/svelte/icons/user-lock';
	import type { ComponentProps } from 'svelte';

	// Menu items.
	const items = [
		{
			title: m.project_overview(),
			url: resolve('/(dashboard)/dashboard/project/[ref]', { ref: page.params.ref! }),
			icon: House
		},
		{
			title: m.authentication(),
			url: resolve('/(dashboard)/dashboard/project/[ref]/auth', { ref: page.params.ref! }),
			icon: UserLock
		},
		{
			title: 'Class APIs',
			url: resolve(`/(dashboard)/dashboard/project/[ref]/class-apis`, { ref: page.params.ref! }),
			icon: FolderIcon
		},
		{
			title: 'Classes & Permissions',
			url: resolve('/(dashboard)/dashboard/project/[ref]/permissions', { ref: page.params.ref! }),
			icon: ShieldIcon
		},
		{
			title: m.storage(),
			url: resolve('/(dashboard)/dashboard/project/[ref]/storage', { ref: page.params.ref! }),
			icon: Archive
		},
		{
			title: m.settings(),
			url: resolve('/(dashboard)/dashboard/project/[ref]/settings', { ref: page.params.ref! }),
			icon: Settings
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
						<a href="/dashboard/projects" {...props}>
							<Database class="" />
							<span class="text-base font-semibold">{m.projects()}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>{m.projects()}</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
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
