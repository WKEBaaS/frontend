<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import Settings from '@lucide/svelte/icons/settings';
	import House from '@lucide/svelte/icons/house';
	import Database from '@lucide/svelte/icons/database';
	import UserLock from '@lucide/svelte/icons/user-lock';
	import Archive from '@lucide/svelte/icons/archive';
	import type { ComponentProps } from 'svelte';

	// Menu items.
	const items = [
		{
			title: m.project_overview(),
			url: `/dashboard/project/${page.params.ref}`,
			icon: House
		},
		{
			title: m.authentication(),
			url: `/dashboard/project/${page.params.ref}/auth`,
			icon: UserLock
		},
		{
			title: m.storage(),
			url: `/dashboard/project/${page.params.ref}/storage`,
			icon: Archive
		},
		{
			title: m.settings(),
			url: `/dashboard/project/${page.params.ref}/settings`,
			icon: Settings
		}
	];

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
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
