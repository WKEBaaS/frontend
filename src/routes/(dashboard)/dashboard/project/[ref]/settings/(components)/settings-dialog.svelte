<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircleIcon from 'lucide-svelte/icons/loader-circle';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { UpdateProjectInfoSchema } from '../schemas.ts';

	interface SettingDialogProps {
		form: SuperForm<UpdateProjectInfoSchema>;
		open?: boolean;
	}

	let { form, open = $bindable(false) }: SettingDialogProps = $props();
	let { form: formData, enhance, delayed } = form;
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>{m.update_project_setting()}</AlertDialog.Trigger>
	<AlertDialog.Content>
		<form method="POST" action="?/updateProjectInfo" use:enhance>
			<AlertDialog.Header>
				<AlertDialog.Title>{m.are_you_sure()}</AlertDialog.Title>
				<AlertDialog.Description>
					{m.update_project_setting_description()}
				</AlertDialog.Description>

				<!-- update project setting form fields -->
				<div class="my-3 space-y-4">
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>{m.project_name()}</Form.Label>
								<Input type="text" {...props} placeholder="" bind:value={$formData.name} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="description">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>{m.project_description()}</Form.Label>
								<Input type="text" {...props} placeholder="" bind:value={$formData.description} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">{m.cancel()}</AlertDialog.Cancel>
				{#if $delayed}<LoaderCircleIcon class="animate-spin" />{/if}
				<AlertDialog.Action type="submit">{m.confirm()}</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
