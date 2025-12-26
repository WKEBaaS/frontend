<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Field from '$lib/components/ui/field/index.js'; // 改用 Field 元件
	import { Input } from '$lib/components/ui/input/index.js';
	import * as m from '$lib/paraglide/messages';
	import { resetDatabasePassword } from '$lib/remotes'; // 確保這指向你的 remote function 檔案
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';

	interface Props {
		open?: boolean;
	}

	let { open = $bindable(false) }: Props = $props();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>{m.reset_database_password()}</AlertDialog.Trigger
	>
	<AlertDialog.Content>
		<form
			{...resetDatabasePassword.enhance(async ({ form, submit }) => {
				await submit();
				if (resetDatabasePassword.result?.success) {
					form.reset();
					toast.success(m.reset_database_password_success());
					open = false;
				} else {
					toast.error('reset database password failed', {
						description: resetDatabasePassword.result?.message
					});
				}
			})}
		>
			<AlertDialog.Header class="mb-4">
				<AlertDialog.Title>{m.are_you_sure()}</AlertDialog.Title>
				<AlertDialog.Description>
					{m.reset_database_password_description()}
				</AlertDialog.Description>

				<Field.Field>
					<Field.Label>{m.reset_database_password()}</Field.Label>
					<Input {...resetDatabasePassword.fields.password.as('password')} />
					{#each resetDatabasePassword.fields.password.issues() ?? [] as issue (issue.message)}
						<Field.Error>{issue.message}</Field.Error>
					{/each}
				</Field.Field>
			</AlertDialog.Header>
			<AlertDialog.Footer class="inline-flex w-full items-center justify-end space-x-2">
				<AlertDialog.Cancel type="button">{m.cancel()}</AlertDialog.Cancel>
				{#if resetDatabasePassword.pending}
					<LoaderCircleIcon class="animate-spin" />
				{/if}
				<AlertDialog.Action type="submit">{m.confirm()}</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
