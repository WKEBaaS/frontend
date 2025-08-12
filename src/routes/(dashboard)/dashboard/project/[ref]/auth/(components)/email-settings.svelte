<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import MailIcon from '@lucide/svelte/icons/mail';
	import type { ComponentProps } from 'svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { UpdateEmailAndPassword } from '../schema';
	import * as Form from '$lib/components/ui/form/index.js';

	type EmailSettingsProps = ComponentProps<typeof Drawer.Root> & {
		form: SuperForm<UpdateEmailAndPassword>;
	};

	let { form, open = $bindable(false), ...restProps }: EmailSettingsProps = $props();
	let { form: formData, enhance } = form;
</script>

<Drawer.Root bind:open {...restProps}>
	<Drawer.Content>
		<form method="POST" action="?/updateEmailAndPassword" use:enhance>
			<Drawer.Header>
				<Drawer.Title class="flex items-center gap-2">
					<MailIcon class="text-muted-foreground size-6" />
					Email
				</Drawer.Title>
				<Drawer.Description>{m.update_email_settings_description()}</Drawer.Description>
				<div class="mt-8 space-y-4">
					<Form.Field
						{form}
						name="emailAndPasswordEnabled"
						class="flex flex-row items-center justify-between rounded-lg border p-4"
					>
						<Form.Control>
							{#snippet children({ props })}
								<div class="space-y-0.5">
									<Form.Label>{m.enable_email_provider()}</Form.Label>
									<Form.Description>{m.enable_email_provider_description()}</Form.Description>
								</div>
								<Switch {...props} bind:checked={$formData.emailAndPasswordEnabled} />
							{/snippet}
						</Form.Control>
					</Form.Field>
				</div>
			</Drawer.Header>
			<Drawer.Footer>
				<Button type="submit">{m.save()}</Button>
				<Drawer.Close type="button">{m.cancel()}</Drawer.Close>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
