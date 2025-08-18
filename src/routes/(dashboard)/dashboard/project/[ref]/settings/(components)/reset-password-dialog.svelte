<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { ResetDatabasePasswordSchema } from '../schemas';

	interface Props {
		form: SuperForm<ResetDatabasePasswordSchema>;
		open?: boolean;
	}

	let { form, open = $bindable(false) }: Props = $props();
	let { form: formData, enhance, delayed } = form;
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>{m.reset_database_password()}</AlertDialog.Trigger
	>
	<AlertDialog.Content>
		<form method="POST" action="?/resetDatabasePassword" use:enhance>
			<AlertDialog.Header class="mb-4">
				<AlertDialog.Title>{m.are_you_sure()}</AlertDialog.Title>
				<AlertDialog.Description>
					{m.reset_database_password_description()}
				</AlertDialog.Description>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>{m.reset_database_password()}</Form.Label>
							<Input type="password" {...props} placeholder="" bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</AlertDialog.Header>
			<AlertDialog.Footer class="inline-flex w-full items-center justify-end space-x-2">
				<AlertDialog.Cancel type="button">{m.cancel()}</AlertDialog.Cancel>
				{#if $delayed}<LoaderCircleIcon class="animate-spin" />{/if}
				<AlertDialog.Action type="submit">{m.confirm()}</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
