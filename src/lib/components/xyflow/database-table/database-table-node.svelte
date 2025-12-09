<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as BaseNode from '../base-node/index.js';
	import { cn } from '$lib/utils.js';

	let {
		class: className,
		children
	}: {
		class?: string;
		children: Snippet<[]> | undefined;
	} = $props();
</script>

<BaseNode.Node
	class={cn(
		'bg-card text-card-foreground border-border pointer-events-auto box-border flex h-fit w-fit flex-col rounded-xl border whitespace-nowrap shadow-sm',
		className
	)}
>
	{@render children?.()}
</BaseNode.Node>
