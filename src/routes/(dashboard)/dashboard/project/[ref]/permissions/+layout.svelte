<script lang="ts">
	import { page } from '$app/state';
	import { getUsersRootClass } from '$lib/remotes';
	import { DatabaseIcon } from '@lucide/svelte';
	import { PermissionClassTree } from './(components)/permission-class-tree';

	if (!page.params.ref) {
		throw new Error('Project reference is missing in the URL parameters.');
	}

	let { children, data } = $props();
	const classesQuery = $derived(getUsersRootClass(data.project.reference));
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
		<div class="bg-muted w-64 p-2">
			{#if classesQuery.loading}
				<div class="text-muted-foreground px-2 py-1.5 text-sm">Loading classes...</div>
			{:else if classesQuery.error}
				<div class="text-destructive px-2 py-1.5 text-sm">Error loading classes: {classesQuery.error.message}</div>
			{:else if classesQuery.current}
				<PermissionClassTree
					nodeClass={{
						id: classesQuery.current.id,
						chinese_name: classesQuery.current.chinese_name
					}}
					ref={page.params.ref!}
				/>
			{/if}
		</div>
		{@render children()}
	</div>
</div>
