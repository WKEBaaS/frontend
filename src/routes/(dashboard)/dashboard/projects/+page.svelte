<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as m from '$lib/paraglide/messages';
	import dayjs from 'dayjs';
	import type { ActionData, PageData } from './$types';

	let { data }: { data: PageData; form: ActionData } = $props();
</script>

<section class="px-2 pt-2">
	<Button variant="outline" href="/dashboard/new">{m.new_project()}</Button>
</section>
<section class="inline-flex flex-wrap gap-2 p-2">
	{#each data.projects || [] as project (project.reference)}
		<a href="/dashboard/project/{project.reference}">
			<Card.Root
				class="w-80 transition-all duration-300 hover:cursor-pointer hover:scale-y-105 hover:shadow-lg hover:ring-sidebar-ring"
			>
				<Card.Header>
					<Card.Title>{project.name}</Card.Title>
					<Card.Description>{project.description}</Card.Description>
				</Card.Header>
				<Card.Footer>
					{dayjs(project.createdAt).format('MMMM D, YYYY')}
				</Card.Footer>
			</Card.Root>
		</a>
	{/each}
</section>
