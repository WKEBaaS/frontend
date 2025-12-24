<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { createClass } from '$lib/remotes';
	import { CreateClassStore } from '$lib/stores/create-class.svelte';
	import { toast } from 'svelte-sonner';
	import { buttonVariants } from '../ui/button';
	import { Input } from '../ui/input';
	import { Textarea } from '../ui/textarea';

	interface Props {
		open?: boolean;
		parentClassId: string;
		projectRef: string;
		onCreated?: () => void;
	}

	let { open = $bindable(false), projectRef, parentClassId, onCreated }: Props = $props();
	let classInput = $derived(
		new CreateClassStore({
			parent_class_id: parentClassId,
			project_ref: projectRef,
			chinese_name: ''
		})
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create New Class</Dialog.Title>
			<Dialog.Description>Fill in the details to create a new class.</Dialog.Description>
		</Dialog.Header>
		<Field.Group>
			<Field.Set>
				<Field.Legend>Class Details</Field.Legend>
				<Field.Field>
					<Field.Label for="class-name">Class Name</Field.Label>
					<Input id="class-name" bind:value={classInput.in.chinese_name} />
				</Field.Field>
				<Field.Field>
					<Field.Label for="class-description">Description</Field.Label>
					<Textarea class="h-24" id="class-description" bind:value={classInput.in.chinese_description} />
				</Field.Field>
				<Field.Field>
					<Field.Label for="english-name">English Name</Field.Label>
					<Input id="english-name" bind:value={classInput.in.english_name} />
				</Field.Field>
				<Field.Field>
					<Field.Label for="english-description">English Description</Field.Label>
					<Textarea class="h-24" id="english-description" bind:value={classInput.in.english_description} />
				</Field.Field>
				<Field.Field>
					<Field.Label for="entity-id">Entity ID</Field.Label>
					<Input id="entity-id" type="number" bind:value={classInput.in.entity_id} />
				</Field.Field>
			</Field.Set>
		</Field.Group>
		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
			<Dialog.Close
				class={buttonVariants({ variant: 'default' })}
				onclick={async () => {
					const res = await createClass(classInput.value());
					if (res.success) {
						toast.success('Class created successfully!');
					} else {
						toast.error('Failed to create class.');
					}
					onCreated?.();
				}}>Create</Dialog.Close
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
