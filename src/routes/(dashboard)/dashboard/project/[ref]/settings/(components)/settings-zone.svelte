<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import SettingIcon from '@lucide/svelte/icons/settings';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { ResetDatabasePasswordSchema } from '../schemas';
	import * as m from '$lib/paraglide/messages';
	import ResetPasswordDialog from './reset-password-dialog.svelte';

	interface SettingsZoneProps {
		title: string;
		form: SuperForm<ResetDatabasePasswordSchema>;
		resetOpen?: boolean;
	}

	let { title, form, resetOpen = $bindable(false) }: SettingsZoneProps = $props();
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
			<ResetPasswordDialog {form} bind:open={resetOpen} />
		</div>
	</Card.Content>
</Card.Root>
