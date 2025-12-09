<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class={cn(
		'text-card-foreground relative rounded-md border',
		'hover:ring-1',
		// React Flow displays node elements inside of a `NodeWrapper` component,
		// which compiles down to a div with the class `react-flow__node`.
		// When a node is selected, the class `selected` is added to the
		// `react-flow__node` element. This allows us to style the node when it
		// is selected, using Tailwind's `&` selector.
		'[.svelte-flow\\_\\_node.selected_&]:border-muted-foreground',
		'[.svelte-flow\\_\\_node.selected_&]:shadow-lg',
		className
	)}
	tabIndex={0}
	{...props}
>
	{@render children?.()}
</div>
