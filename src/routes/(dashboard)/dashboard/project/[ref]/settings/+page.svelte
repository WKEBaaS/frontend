<script>
	import { goto } from '$app/navigation';
	import * as m from '$lib/paraglide/messages';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import DangerZone from './(components)/danger-zone.svelte';
	import SettingsZone from './(components)/settings-zone.svelte';
	import {
		deleteProjectSchema,
		resetDatabasePasswordSchema,
		updateAllowedOriginsSchema,
		updateProjectInfoSchema
	} from './schemas';

	let { data } = $props();
	let resetPasswordOpen = $state(false);
	let updateProjectInfoOpen = $state(false);
	let updateAllowedOriginsOpen = $state(false);

	const deleteForm = superForm(data.deleteForm, {
		id: 'delete-project-form',
		validators: valibotClient(deleteProjectSchema),
		delayMs: 100,
		onResult({ result }) {
			if (result.type === 'redirect') {
				toast.success(m.success(), { description: m.project_deleted() });
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				goto(result.location);
			}
		}
	});

	const resetDatabasePasswordForm = superForm(data.resetDatabasePasswordForm, {
		id: 'reset-database-password-form',
		validators: valibotClient(resetDatabasePasswordSchema),
		delayMs: 100,
		onResult({ result }) {
			if (result.type === 'success') {
				resetPasswordOpen = false;
				toast.success(m.success(), { description: m.reset_database_password_success() });
			}
		}
	});

	const updateProjectInfoForm = superForm(data.updateProjectSettingsForm, {
		id: 'update-project-info-form',
		validators: valibotClient(updateProjectInfoSchema),
		dataType: 'json',
		delayMs: 100,
		onResult({ result }) {
			if (result.type === 'success') {
				updateProjectInfoOpen = false;
				toast.success(m.success(), { description: m.project_info_updated() });
			} else if (result.type === 'error') {
				toast.error(m.error(), { description: result.error.message });
			}
		}
	});

	const updateAllowedOriginsForm = superForm(data.updateAllowedOriginsForm, {
		id: 'update-allowed-origins-form',
		validators: valibotClient(updateAllowedOriginsSchema),
		dataType: 'json',
		delayMs: 100,
		onResult({ result }) {
			if (result.type === 'success') {
				updateAllowedOriginsOpen = false;
				toast.success(m.success(), { description: m.allowed_origins_updated() });
			} else if (result.type === 'error') {
				toast.error(m.error(), { description: result.error.message });
			}
		}
	});
</script>

<div class="space-y-4 p-4">
	<div>
		<h1 class="text-foreground text-3xl font-bold">{data.project.name}</h1>
	</div>
	<SettingsZone
		bind:updateProjectInfoOpen
		bind:resetPasswordOpen
		bind:updateAllowedOriginsOpen
		title={m.project_settings()}
		{resetDatabasePasswordForm}
		{updateProjectInfoForm}
		{updateAllowedOriginsForm}
	/>
	<DangerZone project={data.project} form={deleteForm} />
</div>
