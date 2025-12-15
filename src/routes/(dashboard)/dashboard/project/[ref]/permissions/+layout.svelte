<script lang="ts">
	import { page } from '$app/state';
	import * as TreeView from '$lib/components/ui/tree-view';
	import { getUsersFirstLevelClasses } from '$lib/remotes';
	import { DatabaseIcon } from '@lucide/svelte';
	import ClassTreeNode from './(components)/clas-tree/class-tree-node.svelte';

	if (!page.params.ref) {
		throw new Error('Project reference is missing in the URL parameters.');
	}

	let { children } = $props();
	const classes = $derived(await getUsersFirstLevelClasses(page.params.ref));
</script>

<div class="h-full">
	<!-- Header -->
	<header class="flex h-12 shrink-0 items-center justify-between border-b px-4">
		<div class="flex items-center gap-2">
			<DatabaseIcon class="size-5" />
			<span class="font-bold">Class Permissions</span>
		</div>
		<div class="text-xs">Class Visualization</div>
	</header>

	<!-- Content Area -->
	<div class="flex h-full">
		<TreeView.Root class="bg-muted w-64 p-2">
			{#each classes as c (c.id)}
				<ClassTreeNode nodeClass={c} ref={page.params.ref!} />
			{/each}
		</TreeView.Root>
		{@render children()}
	</div>
</div>
