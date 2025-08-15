<script lang="ts">
	import Discord from '$lib/components/icons/discord.svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Google from '$lib/components/icons/google.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as m from '$lib/paraglide/messages';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import MailIcon from '@lucide/svelte/icons/mail';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import EnabledSwitch from '../(components)/enabled-switch.svelte';
	import EmailSettings from './(components)/email-settings.svelte';
	import OauthProviderSettings from './(components)/oauth-provider-settings.svelte';
	import { updateAuthProviderSchema, type UpdateAuthProviderType } from './schema';
	import type { Component } from 'svelte';

	let { data } = $props();
	let emailSettingsOpen = $state(false);
	let currentOpenedIndex = $state(-1);

	const updateAuthProviderForm = superForm(data.updateAuthProviderForm, {
		validators: valibotClient(updateAuthProviderSchema),
		onResult({ result }) {
			if (result.type === 'success') {
				toast.success(m.auth_provider_settings_updated());
				emailSettingsOpen = false;
				if (currentOpenedIndex !== -1) {
					authProviders[currentOpenedIndex].open = false;
				}
			}
		},
		onError({ result }) {
			toast.error(m.auth_provider_settings_update_failed() + `: ${result.error.message}`);
		},
		delayMs: 100
	});

	const authProviders: {
		id: Exclude<UpdateAuthProviderType, 'email'>;
		name: string;
		open: boolean;
		icon: Component;
	}[] = $state([
		{ id: 'google', name: 'Google', open: false, icon: Google },
		{ id: 'github', name: 'GitHub', open: false, icon: Github },
		{ id: 'discord', name: 'Discord', open: false, icon: Discord }
	]);
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
		<Card.Content class="space-y-2">
			<Button
				variant="ghost"
				onclick={() => {
					emailSettingsOpen = true;
				}}
				class="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-3"
			>
				<MailIcon class="size-6" />
				<p>Email</p>
				<EnabledSwitch enabled={data.settings.auth?.email?.enabled ?? false} class="mr-2 ml-auto" />
				<ChevronRightIcon class="text-muted-foreground size-4" />
				<EmailSettings bind:open={emailSettingsOpen} form={updateAuthProviderForm} />
			</Button>
			{#each authProviders as provider, i (provider.id)}
				<Button
					variant="ghost"
					onclick={() => {
						provider.open = true;
						currentOpenedIndex = i;
					}}
					class="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg p-3"
				>
					<provider.icon class="size-6" />
					<p>{provider.name} Auth Provider</p>
					<EnabledSwitch
						enabled={data.settings.auth && data.settings.auth[provider.id]?.enabled}
						class="mr-2 ml-auto"
					/>
					<ChevronRightIcon class="text-muted-foreground size-4" />
					<OauthProviderSettings
						bind:open={provider.open}
						form={updateAuthProviderForm}
						type={provider.id}
						name={provider.name}
						icon={provider.icon}
					/>
				</Button>
			{/each}
		</Card.Content>
	</Card.Root>
</div>
