<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import * as m from '$lib/paraglide/messages';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	const clipboard = new UseClipboard();

	let { data }: { data: PageData } = $props();
</script>

<section class="px-2 pt-2">
	<Button variant="outline" href="/dashboard/new">{m.new_project()}</Button>
	<Button
		onclick={async () => {
			const { data } = await authClient.token();
			clipboard.copy(data?.token || '');
		}}
	>
		Copy JWT (Debug)
	</Button>
</section>
<section class="inline-flex flex-wrap gap-2 p-2">
	{#each data.projects || [] as project (project.reference)}
		<a data-sveltekit-preload-data="tap" href="/dashboard/project/{project.reference}">
			<Card.Root
				class="hover:ring-sidebar-ring w-80 transition-all duration-300 hover:scale-y-105 hover:cursor-pointer hover:shadow-lg"
			>
				<Card.Header>
					<Card.Title>{project.name}</Card.Title>
					<Card.Description class="min-h-8">{project?.description}</Card.Description>
				</Card.Header>
				<Card.Footer>
					{dayjs(project.createdAt).format('MMMM D, YYYY')}
				</Card.Footer>
			</Card.Root>
		</a>
	{/each}
</section>
