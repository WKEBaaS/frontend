<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card/index.js';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="inline-flex flex-wrap gap-2 p-2">
	{#each data.projects as project (project.id)}
		<Card.Root
			class="w-80 transition-all duration-300 hover:cursor-pointer hover:scale-y-105 hover:shadow-lg"
			onclick={() => goto(`/dashboard/project/${project.id}`)}
		>
			<Card.Header>
				<Card.Title>{project.name}</Card.Title>
				<Card.Description>{project.description}</Card.Description>
			</Card.Header>
			<Card.Footer>
				{dayjs(project.createdAt).format('MMMM D, YYYY')}
			</Card.Footer>
		</Card.Root>
	{/each}
</section>
