<script lang="ts">
	import { LabeledHandle } from '$lib/components/xyflow/handle/index.js';
	import * as DatabaseTable from '$lib/components/xyflow/database-table/index.js';
	import type { DatabaseSchemaColumn } from './types';
	import { Position } from '@xyflow/svelte';
	interface TableNodeProps {
		data: {
			name: string;
			columns: DatabaseSchemaColumn[];
		};
	}
	let { data }: TableNodeProps = $props();
</script>

<DatabaseTable.Root>
	<DatabaseTable.Header>{data.name}</DatabaseTable.Header>
	<DatabaseTable.Table>
		{#each data.columns as column (column.name)}
			<DatabaseTable.Row>
				<DatabaseTable.Cell class="relative flex h-9 items-center px-3">
					{#if column.handles?.some((h) => h.position === Position.Left)}
						<div class="absolute top-0 left-0 flex h-full flex-col justify-between py-1">
							{#each column.handles.filter((h) => h.position === Position.Left) as handle (handle.id)}
								<LabeledHandle id={handle.id} type={handle.type} position={handle.position} class="flex-1" />
							{/each}
						</div>
					{/if}
					<div class="ml-3">
						{column.name}
						{#if column.primaryKey}
							<span class="text-primary border-primary/30 rounded border px-1 text-[9px]">PK</span>
						{/if}
						{#if column.foreignKey}
							<span class="text-muted-foreground border-border rounded border px-1 text-[9px]">FK</span>
						{/if}
					</div>
				</DatabaseTable.Cell>
				<DatabaseTable.Cell>
					<span class="text-muted-foreground w-full pr-3 text-right">{column.type}</span>
				</DatabaseTable.Cell>
				<DatabaseTable.Cell class="relative h-9">
					{#if column.handles?.some((h) => h.position === Position.Right)}
						<div class="absolute top-0 right-0 flex h-full flex-col justify-between py-1">
							{#each column.handles.filter((h) => h.position === Position.Right) as handle (handle.id)}
								<LabeledHandle
									id={handle.id}
									type={handle.type}
									position={handle.position}
									class="flex-1"
									handleClass="p-0"
									labelClass="px-3 pr-4 text-right text-muted-foreground/60 italic"
								/>
							{/each}
						</div>
					{/if}
					<span class="text-muted-foreground/60 block px-3 pr-4 text-right italic">{column.default}</span>
				</DatabaseTable.Cell>
			</DatabaseTable.Row>
		{/each}
	</DatabaseTable.Table>
</DatabaseTable.Root>
