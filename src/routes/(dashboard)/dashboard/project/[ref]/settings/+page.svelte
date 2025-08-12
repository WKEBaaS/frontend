<script>
	import { goto } from '$app/navigation';
	import * as m from '$lib/paraglide/messages';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { arktypeClient, valibotClient } from 'sveltekit-superforms/adapters';
	import DangerZone from './(components)/danger-zone.svelte';
	import { deleteProjectSchema, resetDatabasePasswordSchema, updateProjectSettingsSchema } from './schemas';
	import SettingsZone from './(components)/settings-zone.svelte';

	let { data } = $props();
	let resetPasswordOpen = $state(false);
	let updateSettingsOpen = $state(false);

	const deleteForm = superForm(data.deleteForm, {
		validators: valibotClient(deleteProjectSchema),
		delayMs: 100,
		onResult({ result }) {
			if (result.type === 'redirect') {
				toast.success(m.project_deleted());
				goto(result.location);
			}
		}
	});

	const resetDatabasePasswordForm = superForm(data.resetDatabasePasswordForm, {
		validators: valibotClient(resetDatabasePasswordSchema),
		delayMs: 100,
		onResult({ result }) {
			if (result.type === 'success') {
				resetPasswordOpen = false;
				toast.success(m.reset_database_password_success());
			}
		}
	});

	const updateProjectSettingsForm = superForm(data.updateProjectSettingsForm, {
		validators: arktypeClient(updateProjectSettingsSchema),
		dataType: 'json',
		delayMs: 100
	});
</script>

<div class="space-y-4 p-4">
	<SettingsZone
		bind:updateSettingsOpen
		bind:resetPasswordOpen
		title={m.project_settings()}
		{resetDatabasePasswordForm}
		{updateProjectSettingsForm}
	/>
	<DangerZone project={data.project} form={deleteForm} />
</div>
