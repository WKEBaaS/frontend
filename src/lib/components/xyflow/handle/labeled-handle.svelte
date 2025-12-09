<script lang="ts">
	import type { HandleProps } from '@xyflow/svelte';
	import { cn } from '$lib/utils.js';
	import BaseHandle from './base-handle.svelte';

	type Props = HandleProps & {
		title?: string;
		class?: string;
		handleClass?: string;
		labelClass?: string;
	};

	let { title, position, class: className, handleClass, labelClass, ...handleProps }: Props = $props();

	const flexDirections = {
		top: 'flex-col',
		right: 'flex-row-reverse justify-end',
		bottom: 'flex-col-reverse justify-end',
		left: 'flex-row'
	};
</script>

<div {title} class={cn('relative flex items-center', flexDirections[position], className)}>
	<BaseHandle {position} class={handleClass} {...handleProps} />
	<div class={cn('text-foreground px-3', labelClass)}>
		{title}
	</div>
</div>
