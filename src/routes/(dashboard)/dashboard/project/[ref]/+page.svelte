<script lang="ts">
	import { env } from '$env/dynamic/public';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/form/index.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import * as m from '$lib/paraglide/messages';
	import CheckIcon from '@lucide/svelte/icons/check';
	import TerminalIcon from '@lucide/svelte/icons/terminal';
	import dayjs from 'dayjs';
	import { toast } from 'svelte-sonner';
	import * as v from 'valibot';
	import { type ProjectStatus, projectStatusSchema } from './schemas.js';
	import ProjectProgress from './(components)/project-progress.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let project = data.project;

	const clipboard = new UseClipboard();
	let isNew = $state(!data.project.initializedAt);
	let status = $state<ProjectStatus | null>(null);

	onMount(() => {
		if (!isNew) {
			return;
		}
		const statusURL = new URL(`/v1/project/status`, env.PUBLIC_BAAS_API_URL);
		statusURL.searchParams.set('ref', project.reference);
		const eventSource = new EventSource(statusURL, { withCredentials: true });
		eventSource.addEventListener('project-status', (event) => {
			try {
				const jsonData = JSON.parse(event.data);
				const parsedData = v.parse(projectStatusSchema, jsonData);
				status = parsedData;
				if (parsedData.step === parsedData.totalStep) {
					toast.success('Project setup complete!');
					isNew = false;
					eventSource.close();
				}
			} catch (error) {
				console.error('Error parsing project status:', error);
				toast.error('Failed to update project status.');
			}
		});

		return () => {
			eventSource.close();
		};
	});
</script>

<div class="container mx-auto flex flex-col space-y-2 p-5">
	{#if isNew && status}
		<ProjectProgress {status} />
	{:else}
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl font-bold">{project.name}</Card.Title>
				<span class="text-xl">{m.project_database_connection_url()}: </span>
				<Button
					variant="outline"
					class="w-fit gap-1 px-2 shadow-none"
					size="sm"
					onclick={() => clipboard.copy(data.databaseUrl)}
				>
					{#if clipboard.copied}
						<CheckIcon />
					{:else}
						<TerminalIcon />
					{/if}
					<span class="hidden lg:inline">{data.databaseUrl}</span>
				</Button>
			</Card.Header>
			<Card.Content>
				<div class="grid gap-4">
					<div>
						<h3 class="text-lg font-semibold">{m.description()}</h3>
						<p class="text-gray-600">{project.description}</p>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<h3 class="text-lg font-semibold">{m.created_at()}</h3>
							<p class="text-gray-600">{dayjs(project.createdAt).format('MMMM D, YYYY')}</p>
						</div>
						<div>
							<h3 class="text-lg font-semibold">{m.updated_at()}</h3>
							<p class="text-gray-600">
								{dayjs(project.updatedAt).format('MMMM D, YYYY')}
							</p>
						</div>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
