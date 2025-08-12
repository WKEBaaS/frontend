<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import * as Card from '$lib/components/ui/card/index.js';
	import MailIcon from '@lucide/svelte/icons/mail';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import EnabledSwitch from '../(components)/enabled-switch.svelte';
	import EmailSettings from './(components)/email-settings.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { arktypeClient } from 'sveltekit-superforms/adapters';
	import { updateEmailAndPasswordSchema } from './schema';

	let { data } = $props();
	let settings = data.settings;

	const updateEmailAndPasswordForm = superForm(data.updateEmailAndPasswordForm, {
		validators: arktypeClient(updateEmailAndPasswordSchema),
		delayMs: 100
	});

	let emailSettingsOpen = $state(false);
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
				<EnabledSwitch enabled={settings.auth?.emailAndPasswordEnabled ?? false} class="mr-2 ml-auto" />
				<ChevronRightIcon class="text-muted-foreground size-4" />
				<EmailSettings bind:open={emailSettingsOpen} form={updateEmailAndPasswordForm} />
			</Button>
		</Card.Content>
	</Card.Root>
</div>
