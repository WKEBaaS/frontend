<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import Database from 'lucide-svelte/icons/database';
	import House from 'lucide-svelte/icons/house';
	import Settings from 'lucide-svelte/icons/settings';
	import UserPen from 'lucide-svelte/icons/user-pen';

	// Menu items.
	const mainItems = [
		{
			title: m.home(),
			url: '/',
			icon: House
		},
		{
			title: m.projects(),
			url: '/dashboard/projects',
			icon: Database
		}
	];

	const accountItems = [
		{
			title: m.profile(),
			url: '#',
			icon: UserPen
		},
		{
			title: m.settings(),
			url: '#',
			icon: Settings
		}
	];
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>{m.dashboard()}</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each mainItems as item (item.title)}
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
		<Sidebar.Group>
			<Sidebar.GroupLabel>{m.account()}</Sidebar.GroupLabel>
			<Sidebar.GroupContent class="group-data-[collapsible=icon]:hidden">
				<Sidebar.Menu>
					{#each accountItems as item (item.title)}
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
