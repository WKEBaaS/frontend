<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { UpdateProxyURL } from '../schema';

	interface ProxyURLDialogProps {
		form: SuperForm<UpdateProxyURL>;
		open?: boolean;
	}

	let { form, open = $bindable(false) }: ProxyURLDialogProps = $props();
	let { form: formData, enhance, delayed } = form;
</script>

<div class="bg-card flex items-end justify-between rounded-lg border p-4">
	<div class="mr-4 flex-1 space-y-3">
		<div class="space-y-1">
			<h3 class="text-base font-medium">{m.update_proxy_url()}</h3>
			<p class="text-muted-foreground text-sm">{m.update_proxy_url_description()}</p>
		</div>
	</div>

	<AlertDialog.Root bind:open>
		<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>{m.update_proxy_url()}</AlertDialog.Trigger>
		<AlertDialog.Content>
			<form method="POST" action="?/updateProxyURL" use:enhance>
				<input type="hidden" name="id" value={$formData.id} />
				<AlertDialog.Header>
					<AlertDialog.Title>{m.are_you_sure()}</AlertDialog.Title>
					<AlertDialog.Description>
						{m.update_proxy_url_description()}
					</AlertDialog.Description>

					<!-- update project setting form fields -->
					<div class="my-3 space-y-4">
						<Form.Field {form} name="proxyURL">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{m.proxy_url()}</Form.Label>
									<Input type="text" {...props} placeholder="" bind:value={$formData.proxyURL} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel type="button">{m.cancel()}</AlertDialog.Cancel>
					{#if $delayed}<LoaderCircleIcon class="animate-spin" />{/if}
					<AlertDialog.Action type="submit">{m.confirm()}</AlertDialog.Action>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
