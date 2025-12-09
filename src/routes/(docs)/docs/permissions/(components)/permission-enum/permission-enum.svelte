<script lang="ts">
	import * as BaseNode from '$lib/components/xyflow/base-node/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	type Permission = {
		name: string;
		description: string;
		bits: string;
	};

	interface Props {
		data: object;
	}

	// eslint-disable-next-line no-empty-pattern
	const {}: Props = $props();

	const permissions: Permission[] = [
		{ name: 'Read Class', description: 'Allows read classes metadata', bits: '1' },
		{ name: 'Read Object', description: 'Allows read objects in the class', bits: '2' },
		{ name: 'Insert', description: 'Allows inserting new objects in the class', bits: '4' },
		{ name: 'Delete', description: 'Allows deleting classes/objects in the class', bits: '8' },
		{ name: 'Update', description: 'Allows updating classes/objects in the class', bits: '16' },
		{ name: 'Modify', description: 'Allows modifying classes/objects in the class', bits: '32' },
		{ name: 'Subscribe', description: 'Allows subscribing to classes/objects changes', bits: '64' }
	];
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
				{#each permissions as permission (permission.name)}
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
