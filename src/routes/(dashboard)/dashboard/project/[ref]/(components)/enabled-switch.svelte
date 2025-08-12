<script lang="ts">
	import { cn } from '$lib/utils';
	import ToggleLeftIcon from '@lucide/svelte/icons/toggle-left';
	import ToggleRightIcon from '@lucide/svelte/icons/toggle-right';
	import type { HTMLAttributes } from 'svelte/elements';

	interface EnabledSwitchProps extends HTMLAttributes<HTMLDivElement> {
		enabled?: boolean;
	}

	let { class: className, enabled = $bindable(false), ...resetProps }: EnabledSwitchProps = $props();
</script>

<div class={cn('group', className)} data-enabled={enabled} {...resetProps}>
	<div class="group-data-enabled:text-primary group-data-[enabled=false]:text-muted-foreground flex items-center">
		{#if enabled}
			<ToggleRightIcon class="size-6" />
			<span class="ml-2 text-sm"> Enabled </span>
		{:else}
			<ToggleLeftIcon class="size-6" />
			<span class="ml-2 text-sm"> Disabled </span>
		{/if}
	</div>
</div>
