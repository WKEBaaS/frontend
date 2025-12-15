<script lang="ts">
	import * as BaseNode from '$lib/components/xyflow/base-node/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Permission } from './types';

	interface Props {
		data: {
			permissions: Permission[];
		};
	}

	const { data }: Props = $props();
</script>

<BaseNode.Node>
	<BaseNode.Header>
		<BaseNode.Title>Permission Enum</BaseNode.Title>
	</BaseNode.Header>
	<BaseNode.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Permission</Table.Head>
					<Table.Head>Description</Table.Head>
					<Table.Head>Bits</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.permissions as permission (permission.name)}
					<Table.Row>
						<Table.Cell>{permission.name}</Table.Cell>
						<Table.Cell>{permission.description}</Table.Cell>
						<Table.Cell>{permission.bits}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</BaseNode.Content>
</BaseNode.Node>
