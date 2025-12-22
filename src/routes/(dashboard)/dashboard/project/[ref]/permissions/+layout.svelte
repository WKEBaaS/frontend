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
	const classesQuery = getUsersFirstLevelClasses(page.params.ref);
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
			{#if classesQuery.loading}
				<div class="text-muted-foreground px-2 py-1.5 text-sm">Loading classes...</div>
			{:else if classesQuery.error}
				<div class="text-destructive px-2 py-1.5 text-sm">Error loading classes: {classesQuery.error.message}</div>
			{:else}
				{#each classesQuery.current as c (c.id)}
					<ClassTreeNode nodeClass={c} ref={page.params.ref!} />
				{/each}
			{/if}
		</TreeView.Root>
		{@render children()}
	</div>
</div>
