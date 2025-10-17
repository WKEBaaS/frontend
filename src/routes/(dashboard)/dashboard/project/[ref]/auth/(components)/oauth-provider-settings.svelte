<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import type { Component, ComponentProps } from 'svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { UpdateAuthProvider, UpdateAuthProviderType } from '../schema';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ClipboardIcon from '@lucide/svelte/icons/clipboard';
	import { Badge } from '$lib/components/ui/badge/index.js';

	type EmailSettingsProps = ComponentProps<typeof Drawer.Root> & {
		form: SuperForm<UpdateAuthProvider>;
		type: Exclude<UpdateAuthProviderType, 'email'>;
		name: string;
		icon: Component<{ class: string }>;
		projectURL: string;
	};

	let {
		form,
		type,
		name,
		icon: ProviderIcon,
		open = $bindable(false),
		projectURL,
		...restProps
	}: EmailSettingsProps = $props();
	let { form: formData, enhance } = form;
	let clipboard = new UseClipboard();
	let redirectURL = new URL(`/api/auth/callback/${type}`, projectURL).toString();
</script>

<Drawer.Root bind:open {...restProps}>
	<Drawer.Content>
		<form method="POST" action="?/updateAuthProvider" use:enhance>
			<Drawer.Header>
				<Drawer.Title class="flex items-center gap-2">
					<ProviderIcon class="size-6" />
					{m.auth_provider_settings()}
				</Drawer.Title>
				<Drawer.Description>{m.auth_provider_settings_description()}</Drawer.Description>
				<div class="mt-8 space-y-4">
					<div class="flex items-center gap-2">
						<Button
							variant="outline"
							class="w-fit gap-1 px-2 shadow-none"
							size="sm"
							onclick={() => clipboard.copy(redirectURL)}
						>
							{#if clipboard.copied}
								<CheckIcon class="text-primary" />
							{:else}
								<ClipboardIcon class="text-muted-foreground" />
							{/if}
							<span class="text-foreground">{redirectURL}</span>
						</Button>
						<Badge class="h-5">
							{name} OAuth Redirect URL
						</Badge>
					</div>
					<div class="space-y-2 rounded-lg border p-4">
						<input type="hidden" name="type" value={type} />
						<Form.Field {form} name="googleEnabled" class="flex flex-row items-center justify-between">
							<Form.Control>
								{#snippet children({ props })}
									<div class="space-y-0.5">
										<Form.Label>{m.enable_auth({ name })}</Form.Label>
										<Form.Description>{m.enable_auth_description({ name })}</Form.Description>
									</div>
									<Switch {...props} bind:checked={$formData[`${type}Enabled`]} />
								{/snippet}
							</Form.Control>
						</Form.Field>
						<Form.Field {form} name="googleClientId" class="flex flex-col">
							<Form.Control>
								{#snippet children({ props })}
									<div class="space-y-0.5">
										<Form.Label>{m.auth_client_id({ name })}</Form.Label>
										<Form.Description>{m.auth_client_id_description({ name })}</Form.Description>
									</div>
									<Input {...props} bind:value={$formData[`${type}ClientId`]} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="googleClientSecret" class="flex flex-col">
							<Form.Control>
								{#snippet children({ props })}
									<div class="space-y-0.5">
										<Form.Label>{m.auth_client_secret({ name })}</Form.Label>
										<Form.Description>{m.auth_client_secret_description({ name })}</Form.Description>
									</div>
									<Input type="password" {...props} bind:value={$formData[`${type}ClientSecret`]} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
			</Drawer.Header>
			<Drawer.Footer>
				<Button type="submit">{m.save()}</Button>
				<Drawer.Close type="button">{m.cancel()}</Drawer.Close>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
