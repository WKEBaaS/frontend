<script lang="ts">
	import type { ClassMetadata } from '$lib/schemas/index.js';
	import type { OnChangeFn } from '$lib/types';
	import { cn } from '$lib/utils';
	import { ChevronRight, Folder } from '@lucide/svelte';
	import { UserClassTree } from '.';

	interface Props {
		nodeClass: ClassMetadata;
		ref: string;
		level?: number;
		selectedID?: string;
		selectedName?: string | null;
		onSelect?: OnChangeFn<ClassMetadata>;
	}

	let {
		nodeClass,
		ref,
		level = 0,
		onSelect,
		selectedID = $bindable(''),
		selectedName = $bindable('')
	}: Props = $props();

	let open = $state(false);
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
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		onclick={(e) => {
			e.preventDefault();
			e.stopPropagation();
			selectedID = nodeClass.id;
			selectedName = nodeClass.chinese_name;
			onSelect?.(nodeClass);
		}}
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
			'hover:bg-accent hover:text-accent-foreground',
			selectedID === nodeClass.id && 'bg-accent text-accent-foreground font-medium'
		)}
	>
		<button onclick={toggle} class="flex h-4 w-4 items-center justify-center">
			<ChevronRight class={cn('h-3 w-3 transition-transform', open && 'rotate-90')} />
		</button>

		<Folder class="h-4 w-4 shrink-0" />

		<span class="flex-1 truncate">
			{nodeClass.chinese_name ?? nodeClass.id}
		</span>
	</div>

	{#if open}
		<div class="space-y-1">
			{#if !fetched && children.length === 0}
				<div class="text-muted-foreground px-2 py-1.5 text-sm" style="padding-left: {(level + 1) * 12}px">
					載入中...
				</div>
			{:else}
				{#each children as child (child.id)}
					<UserClassTree nodeClass={child} {ref} level={level + 1} bind:selectedID bind:selectedName {onSelect} />
				{/each}
			{/if}
		</div>
	{/if}
</div>
