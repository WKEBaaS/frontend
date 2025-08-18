<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { DeleteProjectSchema } from '../schemas';

	interface Props {
		name: string;
		form: SuperForm<DeleteProjectSchema>;
	}

	let { name, form }: Props = $props();
	let { form: formData, enhance, delayed } = form;

	let open = $state(false);
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })}>{m.delete_this_project()}</AlertDialog.Trigger
	>
	<AlertDialog.Content>
		<form method="POST" action="?/deleteProject" use:enhance>
			<input type="hidden" name="expected" value={name} />
			<AlertDialog.Header class="mb-4">
				<AlertDialog.Title>{m.are_you_sure()}</AlertDialog.Title>
				<AlertDialog.Description>
					{m.delete_project_description()}
				</AlertDialog.Description>
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>{m.please_type_to_confirm({ name })}</Form.Label>
							<Input {...props} placeholder={m.please_type_to_confirm({ name })} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</AlertDialog.Header>
			<AlertDialog.Footer class="inline-flex w-full items-center justify-end space-x-2">
				<AlertDialog.Cancel type="button">{m.cancel()}</AlertDialog.Cancel>
				{#if $delayed}<LoaderCircle class="animate-spin" />{/if}
				<AlertDialog.Action type="submit">{m.confirm()}</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
