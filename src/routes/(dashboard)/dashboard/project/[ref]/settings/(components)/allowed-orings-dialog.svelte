<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import XIcon from '@lucide/svelte/icons/x';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { UpdateAllowedOriginsSchema } from '../schemas';

	interface SettingDialogProps {
		form: SuperForm<UpdateAllowedOriginsSchema>;
		open?: boolean;
	}

	let { form, open = $bindable(false) }: SettingDialogProps = $props();
	let { form: formData, enhance, delayed } = form;

	function addOrigin() {
		$formData.allowedOrigins = [...$formData.allowedOrigins, ''];
	}

	function removeOrigin(index: number) {
		if ($formData.allowedOrigins.length > 1) {
			$formData.allowedOrigins = $formData.allowedOrigins.filter((_, i) => i !== index);
		}
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>
		{m.update_project_allowed_origins()}
	</AlertDialog.Trigger>
	<AlertDialog.Content class="max-h-[90vh] overflow-y-auto">
		<form method="POST" action="?/updateAllowedOrigins" use:enhance>
			<AlertDialog.Header>
				<AlertDialog.Title>{m.are_you_sure()}</AlertDialog.Title>
				<AlertDialog.Description>
					{m.update_project_allowed_origins_description()}
				</AlertDialog.Description>
			</AlertDialog.Header>

			<!-- update project setting form fields -->
			<div class="my-4 space-y-3">
				<div class="flex items-center justify-between">
					<Label class="text-base">{m.allowed_origins()}</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onclick={addOrigin}
						disabled={$formData.allowedOrigins.length >= 100}
					>
						<PlusIcon class="mr-2 h-4 w-4" />
						Add Origin
					</Button>
				</div>

				{#each $formData.allowedOrigins as origin, index (origin)}
					<Form.Field {form} name="allowedOrigins[{index}]">
						<Form.Control>
							{#snippet children({ props })}
								<div class="flex gap-2">
									<div class="flex-1">
										<Input
											type="url"
											{...props}
											placeholder="https://example.com"
											bind:value={$formData.allowedOrigins[index]}
										/>
									</div>
									{#if $formData.allowedOrigins.length > 1}
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onclick={() => removeOrigin(index)}
											class="shrink-0"
										>
											<XIcon class="h-4 w-4" />
										</Button>
									{/if}
								</div>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/each}

				{#if $formData.allowedOrigins.length >= 100}
					<p class="text-muted-foreground text-sm">Maximum of 100 allowed origins reached</p>
				{/if}
			</div>

			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">{m.cancel()}</AlertDialog.Cancel>
				<AlertDialog.Action type="submit" disabled={$delayed}>
					{#if $delayed}
						<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					{m.confirm()}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
