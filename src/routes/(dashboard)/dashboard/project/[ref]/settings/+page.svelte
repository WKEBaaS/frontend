<script>
	import { goto } from '$app/navigation';
	import * as m from '$lib/paraglide/messages';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import DangerZone from './(components)/danger-zone.svelte';
	import { deleteProjectSchema, resetDatabasePasswordSchema } from './schemas';
	import SettingsZone from './(components)/settings-zone.svelte';

	let { data } = $props();
	let resetOpen = $state(false);

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
				resetOpen = false;
				toast.success(m.reset_database_password_success());
			}
		}
	});
</script>

<div class="space-y-4 p-4">
	<SettingsZone bind:resetOpen title={m.project_settings()} form={resetDatabasePasswordForm} />
	<DangerZone project={data.project} form={deleteForm} />
</div>
