<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { CreateClassFuncMeta } from '$lib/schemas/index.js';

	interface ClassFuncSidebarProps {
		ref?: HTMLElement | null;
		projectID: string;
		functions: CreateClassFuncMeta[];
	}

	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	let { ref = $bindable(null), projectID, functions }: ClassFuncSidebarProps = $props();
</script>

<Sidebar.Root bind:ref collapsible="none" class="bg-muted border-s lg:flex">
	<Sidebar.Content>
		<Sidebar.Group>
			<Button>New Function (API)</Button>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
