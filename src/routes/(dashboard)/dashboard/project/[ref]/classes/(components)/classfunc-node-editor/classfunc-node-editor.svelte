<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import type { CreateClassFuncFieldKey, CreateClassFuncNode } from '$lib/schemas';
	import type { OnChangeFn } from '$lib/types';
	import { cn } from '$lib/utils';
	import {
		ChevronRightIcon,
		FileCodeIcon,
		FolderIcon,
		FolderOpenIcon,
		PlusIcon,
		Trash2Icon,
		XIcon
	} from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { ClassFuncNodeEditor } from '.';

	// --- Props ---
	interface ClassFuncNodeEditorProps {
		node?: CreateClassFuncNode;
		level?: number;
		onDelete?: () => void;
		onChange?: OnChangeFn<CreateClassFuncNode>;
	}

	// --- Constants ---
	const INITIAL_NODE: CreateClassFuncNode = {
		fields: {
			chinese_name: null,
			chinese_description: null,
			english_name: null,
			english_description: null,
			entity_id: null
		},
		permissions: [],
		children: []
	};

	let { node = $bindable(INITIAL_NODE), level = 0, onDelete, onChange }: ClassFuncNodeEditorProps = $props();

	const AVAILABLE_FIELDS = [
		{ key: 'chinese_name', label: 'Chinese Name' },
		{ key: 'chinese_description', label: 'Chinese Description' },
		{ key: 'english_name', label: 'English Name' },
		{ key: 'english_description', label: 'English Description' },
		{ key: 'entity_id', label: 'Entity ID' }
	] as const;

	// --- Local State ---
	let expanded = $state(true);
	let showChildren = $derived(level === 0);

	// --- Derived State ---
	let displayName = $derived.by(() => {
		if (node.fields?.chinese_name?.value) return node.fields.chinese_name.value;
		if (node.fields?.english_name?.value) return node.fields.english_name.value;
		if (node.fields?.chinese_name?.param_name) return `{${node.fields.chinese_name.param_name}}`;
		return level === 0 ? 'Root Function' : 'Untitled Node';
	});

	let hasChildren = $derived((node.children?.length ?? 0) > 0);

	let activeKeys = $derived(
		Object.entries(node.fields || {})
			.filter(([, value]) => value !== null && value !== undefined)
			.map(([key]) => key)
	);

	let availableToAdd = $derived(AVAILABLE_FIELDS.filter((f) => !activeKeys.includes(f.key)));

	// --- Actions ---
	function handleAddField(key: CreateClassFuncFieldKey) {
		if (!node.fields) node.fields = { ...INITIAL_NODE.fields };
		node.fields[key] = { value: '', param_name: '' };
		onChange?.(node);
	}

	function handleRemoveField(key: CreateClassFuncFieldKey) {
		if (node.fields) {
			node.fields[key] = null;
		}
		onChange?.(node);
	}

	function handleAddChild() {
		if (!node.children) node.children = [];
		node.children.push(JSON.parse(JSON.stringify(INITIAL_NODE)));
		expanded = true;
		onChange?.(node);
	}

	function handleDeleteChild(index: number) {
		if (!node.children) return;
		node.children.splice(index, 1);
		onChange?.(node);
	}
</script>

<div class="text-foreground select-none">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class={cn(
			'group flex cursor-pointer items-center gap-2 rounded-md border border-transparent p-1.5 transition-colors',
			showChildren
				? 'bg-accent text-accent-foreground border-border'
				: 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
		)}
		style:margin-left="{level * 16}px"
		onclick={() => (showChildren = !showChildren)}
	>
		<Button
			variant="ghost"
			size="icon"
			class="h-5 w-5 shrink-0"
			onclick={(e: MouseEvent) => {
				e.stopPropagation();
				expanded = !expanded;
			}}
		>
			{#if hasChildren}
				<div class="transition-transform duration-200" class:rotate-90={expanded}>
					<ChevronRightIcon size={14} />
				</div>
			{:else}
				<div class="w-4"></div>
			{/if}
		</Button>

		<div class={cn('shrink-0', showChildren ? 'text-primary' : 'text-muted-foreground')}>
			{#if hasChildren || level === 0}
				{#if expanded}
					<FolderOpenIcon size={16} />
				{:else}
					<FolderIcon size={16} />
				{/if}
			{:else}
				<FileCodeIcon size={16} />
			{/if}
		</div>

		<span class="flex-1 truncate text-sm font-medium">
			{displayName}
		</span>

		<div
			class={cn(
				'flex items-center gap-1 pr-1 opacity-0 transition-opacity group-hover:opacity-100',
				showChildren && 'opacity-100'
			)}
		>
			<Button
				variant="ghost"
				size="icon"
				class="h-6 w-6 text-green-600 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30"
				onclick={(e: MouseEvent) => {
					e.stopPropagation();
					handleAddChild();
				}}
				title="Add Child"
			>
				<PlusIcon size={14} />
			</Button>

			{#if level > 0}
				<Button
					variant="ghost"
					size="icon"
					class="text-destructive hover:text-destructive h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/30"
					onclick={(e: MouseEvent) => {
						e.stopPropagation();
						onDelete?.();
					}}
					title="Delete"
				>
					<Trash2Icon size={14} />
				</Button>
			{/if}
		</div>
	</div>

	{#if showChildren}
		<div
			transition:slide={{ duration: 200, axis: 'y' }}
			class="border-border relative my-2 ml-8 flex flex-col gap-2 border-l-2 pl-4"
			style:margin-left="{level * 16 + 11}px"
		>
			<div class="flex flex-col gap-3 py-2">
				{#if activeKeys.length > 0}
					{#each activeKeys as key (key)}
						{@const fieldLabel = AVAILABLE_FIELDS.find((f) => f.key === key)?.label || key}
						{@render fieldRow(key as CreateClassFuncFieldKey, fieldLabel)}
					{/each}
				{:else}
					<div class="text-muted-foreground px-1 text-xs italic">No properties defined.</div>
				{/if}

				<div class="pt-1">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button {...props} variant="outline" size="sm" class="h-7 gap-1 text-xs">
									<PlusIcon size={12} /> Add Property
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start" class="w-48">
							<DropdownMenu.Label>Available Fields</DropdownMenu.Label>
							<DropdownMenu.Separator />
							{#if availableToAdd.length === 0}
								<div class="text-muted-foreground p-2 text-center text-xs">All fields added</div>
							{:else}
								{#each availableToAdd as field (field.key)}
									<DropdownMenu.Item onclick={() => handleAddField(field.key)}>
										{field.label}
									</DropdownMenu.Item>
								{/each}
							{/if}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</div>
	{/if}

	{#if expanded && node.children}
		<div class="relative" transition:slide={{ duration: 200 }}>
			{#if hasChildren}
				<div class="bg-border absolute top-0 h-full w-px" style:left="{level * 16 + 11}px"></div>
			{/if}

			{#each node.children as _, idx (idx)}
				<ClassFuncNodeEditor bind:node={node.children[idx]} level={level + 1} onDelete={() => handleDeleteChild(idx)} />
			{/each}
		</div>
	{/if}
</div>

{#snippet fieldRow(key: CreateClassFuncFieldKey, label: string)}
	{@const fieldData = node.fields[key]}

	{#if fieldData}
		<div
			class="border-border bg-card/50 hover:bg-card group/field grid grid-cols-[120px_1fr_auto] items-start gap-3 rounded-md border p-2 transition-colors"
		>
			<div class="text-muted-foreground truncate pt-2 text-xs font-medium" title={label}>
				{label}
			</div>

			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<Badge variant="secondary" class="text-muted-foreground h-5 w-12 justify-center px-1.5 font-mono text-[10px]"
						>VAL</Badge
					>
					<Input
						type="text"
						bind:value={fieldData.value}
						placeholder="Static value..."
						class="bg-background h-7 text-xs"
					/>
				</div>
				<div class="flex items-center gap-2">
					<Badge
						variant="outline"
						class="h-5 w-12 justify-center border-blue-200 px-1.5 font-mono text-[10px] text-blue-500 dark:border-blue-900"
						>VAR</Badge
					>
					<Input
						type="text"
						bind:value={fieldData.param_name}
						placeholder="Param name..."
						class="bg-background h-7 font-mono text-xs text-blue-600 dark:text-blue-400"
					/>
				</div>
			</div>

			<Button
				variant="ghost"
				size="icon"
				class="text-muted-foreground hover:text-destructive h-6 w-6 opacity-0 transition-all group-hover/field:opacity-100"
				onclick={() => handleRemoveField(key)}
				title="Remove Field"
			>
				<XIcon size={14} />
			</Button>
		</div>
	{/if}
{/snippet}
