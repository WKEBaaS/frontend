<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/form/index.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import * as m from '$lib/paraglide/messages';
	import CheckIcon from '@lucide/svelte/icons/check';
	import TerminalIcon from '@lucide/svelte/icons/terminal';
	import dayjs from 'dayjs';

	let { data } = $props();
	let project = data.project;

	const clipboard = new UseClipboard();
</script>

<div class="container mx-auto py-10">
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
</div>
