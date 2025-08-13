<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as m from '$lib/paraglide/messages';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import MailIcon from '@lucide/svelte/icons/mail';
	import KeyRound from 'lucide-svelte/icons/key-round';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { arktypeClient } from 'sveltekit-superforms/adapters';
	import EnabledSwitch from '../(components)/enabled-switch.svelte';
	import EmailSettings from './(components)/email-settings.svelte';
	import { updateAuthProviderSchema } from './schema';
	import OauthProviderSettings from './(components)/oauth-provider-settings.svelte';

	let { data } = $props();
	let emailEnabled = $derived(data.settings.auth?.email?.enabled ?? false);
	let emailSettingsOpen = $state(false);
	let authProvidersSettingsOpen = $state(false);

	const updateAuthProviderForm = superForm(data.updateAuthProviderForm, {
		validators: arktypeClient(updateAuthProviderSchema),
		onResult({ result }) {
			if (result.type === 'success') {
				toast.success(m.auth_provider_settings_updated());
			}
			emailSettingsOpen = false;
			authProvidersSettingsOpen = false;
		},
		onError({ result }) {
			toast.error(m.auth_provider_settings_update_failed() + `: ${result.error.message}`);
		},
		delayMs: 100
	});
</script>

<div class="container mx-auto flex flex-col space-y-2 px-5">
	<div class="mb-5">
		<h1 class="text-foreground text-3xl font-bold">{m.authentication() + ' ' + m.settings()}</h1>
		<p class="text-muted-foreground mt-1">{m.authentication_description()}</p>
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title>{m.auth_providers()}</Card.Title>
			<Card.Description>{m.auth_providers_description()}</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button
				variant="ghost"
				onclick={() => {
					emailSettingsOpen = true;
				}}
				class="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-3"
			>
				<MailIcon class="text-muted-foreground size-6" />
				<p>Email</p>
				<EnabledSwitch enabled={emailEnabled} class="mr-2 ml-auto" />
				<ChevronRightIcon class="text-muted-foreground size-4" />
				<EmailSettings bind:open={emailSettingsOpen} form={updateAuthProviderForm} />
			</Button>
			<Button
				variant="ghost"
				onclick={() => {
					authProvidersSettingsOpen = true;
				}}
				class="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-3"
			>
				<KeyRound class="text-muted-foreground size-6" />
				<p>OAuth Providers</p>
				<ChevronRightIcon class="text-muted-foreground ml-auto size-4" />
				<OauthProviderSettings bind:open={authProvidersSettingsOpen} form={updateAuthProviderForm} />
			</Button>
		</Card.Content>
	</Card.Root>
</div>
