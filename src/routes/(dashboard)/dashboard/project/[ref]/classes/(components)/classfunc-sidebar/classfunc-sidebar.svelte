<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { CreateClassFuncMeta } from '$lib/schemas/index.js';

	interface ClassFuncSidebarProps {
		ref?: HTMLElement | null;
		functions: CreateClassFuncMeta[];
	}

	let { ref = $bindable(null), functions }: ClassFuncSidebarProps = $props();
</script>

<Sidebar.Root bind:ref collapsible="none" class="bg-muted border-s lg:flex">
	<Sidebar.Content>
		<Sidebar.Group>
			<Button
				href={resolve(`/(dashboard)/dashboard/project/[ref]/classes/new`, {
					ref: page.params.ref!
				})}
				variant="outline">New Function (API)</Button
			>
		</Sidebar.Group>
		<Sidebar.Separator />
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each functions as func (func.id)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a
									href={resolve(`/(dashboard)/dashboard/project/[ref]/classes/[name]/[version]`, {
										ref: page.params.ref!,
										name: func.name,
										version: func.version.toString()
									})}
									{...props}
								>
									<span>{func.name}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
