<script lang="ts">
	import { goto } from '$app/navigation';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { createProjectSchema } from './schemas';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: valibotClient(createProjectSchema),
		onError: ({ result }) => {
			toast.error(m.error(), { description: result.error.message });
		},
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
				toast.success(m.success(), { description: m.project_created() });
			}
		},
		delayMs: 100,
	});
	const { form: formData, enhance, delayed } = form;
</script>

<div class="flex justify-center items-start pt-10 flex-1 bg-secondary">
	<Card.Root class="w-1/3">
		<Card.Header class="flex flex-col items-center">
			<Card.Title>{m.create_new_project()}</Card.Title>
			<Card.Description>{m.create_new_project_description()}</Card.Description>
		</Card.Header>
		<form method="POST" action="?/createProject" use:enhance>
			<Card.Content class="flex flex-col space-y-2">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>{m.project_name()}</Form.Label>
							<Input {...props} placeholder={m.project_name()} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>{m.project_description()}</Form.Label>
							<Input {...props} placeholder={m.project_description()} bind:value={$formData.description} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Content>
			<Card.Footer class="flex justify-end">
				{#if $delayed}<LoaderCircle class="animate-spin" />{/if}
				<button class={buttonVariants({ variant: 'default' })} type="submit">
					{m.create()}
				</button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
