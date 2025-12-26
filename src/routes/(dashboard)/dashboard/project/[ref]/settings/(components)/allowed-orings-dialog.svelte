<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as m from '$lib/paraglide/messages';
	import { updateAllowedOrigins } from '$lib/remotes'; // Remote function
	import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import XIcon from '@lucide/svelte/icons/x';
	import { toast } from 'svelte-sonner';
	import type { ProjectSettings } from '../../schemas';

	interface SettingDialogProps {
		open?: boolean;
		settings: ProjectSettings;
	}

	let { open = $bindable(false), settings }: SettingDialogProps = $props();
	// eslint-disable-next-line svelte/prefer-writable-derived
	let pendingOrigins: string[] = $state([]);

	$effect(() => {
		pendingOrigins = settings.trustedOrigins ? settings.trustedOrigins : [];
	});

	function addOrigin() {
		pendingOrigins.push('');
	}

	function removeOrigin(index: number) {
		pendingOrigins.splice(index, 1);
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>
		{m.update_project_allowed_origins()}
	</AlertDialog.Trigger>
	<AlertDialog.Content class="max-h-[90vh] overflow-y-auto">
		<AlertDialog.Header>
			<AlertDialog.Title>{m.are_you_sure()}</AlertDialog.Title>
			<AlertDialog.Description>
				{m.update_project_allowed_origins_description()}
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="my-4 space-y-3">
			<div class="flex items-center justify-between">
				<Label class="text-base">{m.allowed_origins()}</Label>
				<Button type="button" variant="outline" size="sm" onclick={addOrigin} disabled={pendingOrigins.length >= 100}>
					<PlusIcon class="mr-2 h-4 w-4" />
					Add Origin
				</Button>
			</div>

			{#each pendingOrigins as _, index (index)}
				<div class="flex gap-2">
					<div class="flex-1">
						<Input type="url" placeholder="https://example.com" bind:value={pendingOrigins[index]} />
					</div>
					{#if pendingOrigins.length > 1}
						<Button type="button" variant="ghost" size="icon" onclick={() => removeOrigin(index)} class="shrink-0">
							<XIcon class="h-4 w-4" />
						</Button>
					{/if}
				</div>
			{/each}

			{#if pendingOrigins.length >= 100}
				<p class="text-muted-foreground text-sm">Maximum of 100 allowed origins reached</p>
			{/if}
		</div>

		<AlertDialog.Footer>
			<AlertDialog.Cancel type="button">{m.cancel()}</AlertDialog.Cancel>

			<AlertDialog.Action
				type="submit"
				onclick={async () => {
					const result = await updateAllowedOrigins({
						id: settings?.projectId,
						allowedOrigins: pendingOrigins
					});

					if (result.success) {
						toast.success('project allowed origins updated');
						open = false;
					} else {
						toast.error('project allowed origins update failed', {
							description: result.message
						});
					}
				}}
			>
				{#if updateAllowedOrigins.pending}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{m.confirm()}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
