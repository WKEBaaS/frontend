<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import SettingIcon from '@lucide/svelte/icons/settings';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { ResetDatabasePasswordSchema, UpdateProjectInfoSchema } from '../schemas';
	import * as m from '$lib/paraglide/messages';
	import ResetPasswordDialog from './reset-password-dialog.svelte';
	import SettingsDialog from './settings-dialog.svelte';

	interface SettingsZoneProps {
		title: string;
		resetDatabasePasswordForm: SuperForm<ResetDatabasePasswordSchema>;
		updateProjectInfoForm: SuperForm<UpdateProjectInfoSchema>;
		resetPasswordOpen?: boolean;
		updateProjectInfoOpen?: boolean;
	}

	let {
		title,
		resetDatabasePasswordForm,
		updateProjectInfoForm,
		resetPasswordOpen = $bindable(false),
		updateProjectInfoOpen = $bindable(false)
	}: SettingsZoneProps = $props();
</script>

<Card.Root class="border-border">
	<Card.Header>
		<Card.Title class="flex items-center gap-2">
			<SettingIcon class="h-5 w-5" />
			{title}
		</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-6">
		<div class="bg-card flex items-end justify-between rounded-lg border p-4">
			<div class="mr-4 flex-1 space-y-3">
				<div class="space-y-1">
					<h3 class="text-base font-medium">{m.reset_database_password()}</h3>
					<p class="text-muted-foreground text-sm">{m.reset_database_password_description()}</p>
				</div>
			</div>
			<ResetPasswordDialog form={resetDatabasePasswordForm} bind:open={resetPasswordOpen} />
		</div>
		<div class="bg-card flex items-end justify-between rounded-lg border p-4">
			<div class="mr-4 flex-1 space-y-3">
				<div class="space-y-1">
					<h3 class="text-base font-medium">{m.update_project_setting()}</h3>
					<p class="text-muted-foreground text-sm">{m.update_project_setting_description()}</p>
				</div>
			</div>
			<SettingsDialog form={updateProjectInfoForm} bind:open={updateProjectInfoOpen} />
		</div>
	</Card.Content>
</Card.Root>
