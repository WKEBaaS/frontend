<script lang="ts">
	import { env } from '$env/dynamic/public';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/form/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as m from '$lib/paraglide/messages';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import DatabaseIcon from '@lucide/svelte/icons/database';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import TerminalIcon from '@lucide/svelte/icons/terminal';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import ProjectProgress from './(components)/project-progress.svelte';
	import { type ProjectStatus, projectStatus } from './schemas.js';
	import { page } from '$app/state';
	import { type } from 'arktype';

	let { data } = $props();
	let project = $derived(data.project);

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
				const parsedStatus = projectStatus(jsonData);

				if (parsedStatus instanceof type.errors) {
					console.error('Invalid project status data:', parsedStatus.summary);
					toast.error('Invalid project status data received.');
					return;
				}

				status = parsedStatus;
				if (parsedStatus.step === parsedStatus.totalStep) {
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
	{#if !isNew && data.passwordExpired}
		<Alert.Root variant="warning" class="border-warning mb-4">
			<Alert.Title class="text-warning">{m.database_password_expired()}</Alert.Title>
			<Alert.Description class="text-warning/90">
				{m.database_password_expired_description()}
				<Button href={`/dashboard/project/${page.params.ref}/settings`} variant="link" class="mt-2">
					{m.reset_database_password()}
				</Button>
			</Alert.Description>
		</Alert.Root>
	{/if}
	<div>
		<h1 class="text-foreground text-3xl font-bold">{data.project.name}</h1>
		<p class="text-muted-foreground mt-1">{m.project_management_dashboard()}</p>
	</div>
	{#if isNew && status}
		<ProjectProgress {status} />
	{:else}
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<DatabaseIcon class="text-primary size-5" />
					{m.project_information()}
				</Card.Title>
				<Card.Description>{m.project_database_connection_url()}</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4">
				<Button
					variant="outline"
					class="w-fit gap-1 px-2 shadow-none"
					size="sm"
					onclick={() => clipboard.copy(data.databaseURL)}
				>
					{#if clipboard.copied}
						<CheckIcon class="text-primary" />
					{:else}
						<TerminalIcon class="text-muted-foreground" />
					{/if}
					<span class="text-foreground">{data.databaseURL}</span>
				</Button>

				<Separator />

				<div class="grid gap-4">
					<div>
						<h3 class="text-muted-foreground text-sm font-medium">{m.description()}</h3>
						<p class="text-foreground mt-1">{project.description}</p>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<Label class="text-muted-foreground flex items-center gap-2">
								<CalendarIcon class="size-4" />
								{m.created_at()}
							</Label>
							<p class="text-foreground mt-1">{dayjs(project.createdAt).format('MMMM D, YYYY')}</p>
						</div>
						<div>
							<Label class="text-muted-foreground flex items-center gap-2">
								<ClockIcon class="size-4" />
								{m.updated_at()}
							</Label>
							<p class="text-foreground mt-1">{dayjs(project.updatedAt).format('MMMM D, YYYY')}</p>
						</div>
					</div>
				</div>

				<Separator />
				<!-- Auth API Docs Link -->
				<div class="bg-accent border-border flex items-center justify-between rounded-lg border p-4">
					<div class="flex items-center gap-3">
						<FileTextIcon class="text-primary h-5 w-5" />
						<div>
							<h4 class="text-accent-foreground font-medium">Auth API Documentation</h4>
							<p class="text-muted-foreground text-sm">Access authentication API documentation</p>
						</div>
					</div>
					<Button
						target="_blank"
						href={data.authDocsURL}
						variant="outline"
						size="sm"
						class="border-border text-foreground hover:bg-muted"
					>
						<ExternalLinkIcon class="mr-2 h-4 w-4" />
						Open Docs
					</Button>
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
