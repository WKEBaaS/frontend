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

	let { open = $bindable(false), projectRef, classId, onDelete }: DeleteClassProps = $props();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<form
			{...deleteClass.enhance(async ({ form, submit }) => {
				await submit();
				form.reset();
				if (deleteClass.result?.success) {
					toast.success('Class deleted successfully!');
					onDelete?.();
				}
			})}
		>
			<AlertDialog.Header>
				<AlertDialog.Title>Delete the Class</AlertDialog.Title>
				<AlertDialog.Description>
					Are you sure you want to delete this class? This action cannot be undone.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<input {...deleteClass.fields.project_ref.as('hidden', projectRef)} />
			<input {...deleteClass.fields.class_id.as('hidden', classId)} />
			<Field.Set>
				<Field.Field orientation="horizontal">
					{@const rec = deleteClass.fields.recursive.as('checkbox')}
					<Checkbox id="delete-children" name={rec.name} value={rec.value} checked={rec.checked} />
					<Field.Label class="text-destructive" for="delete-children">Also Delete children recursively</Field.Label>
				</Field.Field>
			</Field.Set>
			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">Delete</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
