<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as m from '$lib/paraglide/messages';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { ProjectDetail } from '../../schemas';
	import type { DeleteProjectSchema } from '../schemas';
	import DeleteProjectDialog from './delete-project-dialog.svelte';

	let { project, deleteForm }: { project: ProjectDetail; deleteForm: SuperForm<DeleteProjectSchema> } = $props();
</script>

<Card.Root class="border-destructive/20">
	<Card.Header>
		<Card.Title class="text-destructive">{m.danger_zone()}</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-6">
		<div class="flex items-center justify-between rounded-lg border border-destructive/20 bg-muted p-4">
			<div class="space-y-1">
				<h3 class="text-base font-medium">Change package visibility</h3>
				<p class="text-sm text-muted-foreground">This package is currently public.</p>
			</div>
			<Button variant="destructive">
				Change visibility
			</Button>
		</div>
		<div class="flex items-center justify-between rounded-lg border border-destructive/20 bg-muted p-4">
			<div class="space-y-1">
				<h3 class="text-base font-medium">{m.delete_this_project()}</h3>
				<p class="text-sm text-muted-foreground">
					{m.delete_project_description()}
				</p>
			</div>
			<DeleteProjectDialog form={deleteForm} name={project.name} />
		</div>
	</Card.Content>
</Card.Root>
