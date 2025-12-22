<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { ClassMetadata } from '$lib/schemas/index.js';
	import { cn } from '$lib/utils';
	import { ChevronRight, Folder } from '@lucide/svelte';
	import { ClassTreeNode } from '.';

	interface Props {
		nodeClass: ClassMetadata;
		ref: string;
		level?: number;
	}

	let { nodeClass, ref, level = 0 }: Props = $props();

	let open = $state(false);
	let isActive = $derived(page.params.class_id === nodeClass.id);
	let children: ClassMetadata[] = $state([]);
	let fetched = $state(false);

	$effect(() => {
		if (!fetched && open && children.length === 0) {
			fetch(`/api/get-users-class-children?ref=${ref}&pcid=${nodeClass.id}`)
				.then((resp) => (resp.ok ? resp : Promise.reject(new Error('Failed to fetch class children'))))
				.then((resp) => resp.json())
				.then((data) => {
					fetched = true;
					children = data;
				});
		}
	});

	function toggle(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		open = !open;
	}
</script>

<div class="space-y-1" style="padding-left: {level * 12}px">
	<a
		href={resolve(`/(dashboard)/dashboard/project/[ref]/permissions/[class_id]`, {
			ref: ref,
			class_id: nodeClass.id
		})}
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
			'hover:bg-accent hover:text-accent-foreground',
			isActive && 'bg-accent text-accent-foreground font-medium'
		)}
	>
		<button onclick={toggle} class="flex h-4 w-4 items-center justify-center">
			<ChevronRight class={cn('h-3 w-3 transition-transform', open && 'rotate-90')} />
		</button>

		<Folder class="h-4 w-4 shrink-0" />

		<span class="flex-1 truncate">
			{nodeClass.chinese_name ?? nodeClass.id}
		</span>
	</a>

	{#if open}
		<div class="space-y-1">
			{#if !fetched && children.length === 0}
				<div class="text-muted-foreground px-2 py-1.5 text-sm" style="padding-left: {(level + 1) * 12}px">
					載入中...
				</div>
			{:else}
				{#each children as child (child.id)}
					<ClassTreeNode nodeClass={child} {ref} level={level + 1} />
				{/each}
			{/if}
		</div>
	{/if}
</div>
