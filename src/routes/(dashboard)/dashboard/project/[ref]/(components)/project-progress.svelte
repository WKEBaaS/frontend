<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import Circle from '@lucide/svelte/icons/circle';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import Database from '@lucide/svelte/icons/database';
	import Loader2 from '@lucide/svelte/icons/loader-2';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ProjectStatus } from '../schemas';

	const steps = [
		{
			id: 1,
			title: 'Initializing Cluster',
			description: 'Postgres cluster is initializing...'
		},
		{
			id: 2,
			title: 'Setting Up Primary',
			description: 'Postgres cluster is setting up primary...'
		},
		{
			id: 3,
			title: 'Waiting for Instances',
			description: 'Postgres cluster is waiting for instances to become ready...'
		},
		{
			id: 4,
			title: 'Cluster Ready',
			description: 'Postgres cluster is ready.'
		}
	];

	interface ProjectProgressProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		status: ProjectStatus;
	}

	let { status, class: className, ...restProps }: ProjectProgressProps = $props();
	let percentage = $derived((status.step / status.totalStep) * 100);
	let isComplete = $derived(status.step === status.totalStep);

	function getStepStatus(stepId: number) {
		if (stepId < status.step) return 'completed';
		if (stepId === status.step) return 'current';
		return 'pending';
	}
</script>

{#snippet getStepIcon(stepNumber: number)}
	{#if stepNumber < status.step}
		<CircleCheck class="h-5 w-5 text-green-500" />
	{:else if stepNumber === status.step && !isComplete}
		<Loader2 class="h-5 w-5 animate-spin text-blue-500" />
	{:else if stepNumber === status.step && isComplete}
		<CircleCheck class="h-5 w-5 text-green-500" />
	{:else}
		<Circle class="text-muted-foreground h-5 w-5" />
	{/if}
{/snippet}

<Card.Root class={cn('w-full max-w-2xl', className)} {...restProps}>
	<Card.Header class="pb-4">
		<div class="flex items-center gap-3">
			<Database class="h-6 w-6 text-blue-500" />
			<div>
				<Card.Title class="text-xl">Postgres Cluster Setup</Card.Title>
				<div class="mt-1 flex items-center gap-2">
					<Badge variant={isComplete ? 'default' : 'secondary'}>
						Step {status.step} of {status.totalStep}
					</Badge>
					{#if isComplete}
						<Badge variant="outline" class="border-green-200 text-green-600">Complete</Badge>
					{/if}
				</div>
			</div>
		</div>
	</Card.Header>

	<Card.Content class="space-y-6">
		<!-- Progress Bar -->
		<div class="space-y-2">
			<div class="text-muted-foreground flex justify-between text-sm">
				<span>Progress</span>
				<span>{Math.round(percentage)}%</span>
			</div>
			<Progress value={percentage} class="h-2" />
		</div>

		<!-- Current Status Message -->
		<div class="bg-muted/50 rounded-lg p-4">
			<div class="flex items-center gap-2">
				{#if !isComplete}
					<Loader2 class="h-4 w-4 animate-spin text-blue-500" />
				{:else}
					<CircleCheck class="h-4 w-4 text-green-500" />
				{/if}
				<p class="text-sm font-medium">{status.message}</p>
			</div>
		</div>

		<!-- Step List -->
		<div class="space-y-4">
			{#each steps as step, index (step.id)}
				{@const stepStatus = getStepStatus(step.id)}
				<div class="flex items-start gap-3">
					<div class="mt-0.5 flex-shrink-0">
						{@render getStepIcon(step.id)}
					</div>
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-2">
							<h4
								class={cn(
									'text-sm font-medium',
									stepStatus === 'completed'
										? 'text-green-700'
										: stepStatus === 'current'
											? 'text-foreground'
											: 'text-muted-foreground'
								)}
							>
								{step.title}
							</h4>
						</div>
						<p
							class={cn(
								'mt-1 text-xs',
								stepStatus === 'completed'
									? 'text-green-600'
									: stepStatus === 'current'
										? 'text-muted-foreground'
										: 'text-muted-foreground/70'
							)}
						>
							{step.description}
						</p>
					</div>
					{#if index < steps.length - 1}
						<div class={cn('mt-6 ml-2.5 h-8 w-px', stepStatus === 'completed' ? 'bg-green-200' : 'bg-border')}></div>
					{/if}
				</div>
			{/each}
		</div>

		{#if isComplete}
			<div class="rounded-lg border border-green-200 bg-green-50 p-4">
				<div class="flex items-center gap-2">
					<CircleCheck class="h-5 w-5 text-green-600" />
					<p class="text-sm font-medium text-green-800">Postgres cluster is now ready for use!</p>
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
