<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { deleteClass } from '$lib/remotes';
	import { toast } from 'svelte-sonner';
	import { Checkbox } from '../ui/checkbox';

	interface DeleteClassProps {
		open?: boolean;
		projectRef: string;
		classId: string;
		onDelete?: () => void;
	}

	let recursive = $state(false);
	const handleDelete = async () => {
		const res = await deleteClass({
			class_id: classId,
			project_ref: projectRef,
			recursive: recursive
		});
		if (res.success) {
			toast.success('Class deleted successfully!');
			onDelete?.();
			open = false;
		} else {
			toast.error(`Failed to delete class`);
		}
	};

	let { open = $bindable(false), projectRef, classId, onDelete }: DeleteClassProps = $props();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete the Class</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete this class? This action cannot be undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<Field.Set>
			<Field.Field orientation="horizontal">
				<Checkbox id="delete-children" bind:checked={recursive} />
				<Field.Label class="text-destructive" for="delete-children">Also Delete children recursively</Field.Label>
			</Field.Field>
		</Field.Set>
		<AlertDialog.Footer>
			<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={handleDelete}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
