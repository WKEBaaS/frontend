<script lang="ts">
	// Assuming the 'cn' utility is available via $lib/utils as in your example
	import { cn } from '$lib/utils';
	// Import necessary Svelte element types
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * The title text for the node.
	 * Maps ComponentProps<"h3"> to Svelte 5 $props() with TypeScript.
	 */
	let {
		class: className,
		children, // For content passed into the default slot
		...props
	}: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3 data-slot="base-node-title" class={cn('user-select-none flex-1 font-semibold', className)} {...props}>
	<!-- Render the default slot content -->
	{@render children?.()}
</h3>
