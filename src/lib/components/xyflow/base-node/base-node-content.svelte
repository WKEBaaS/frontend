<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * The main content area for the node.
	 * Maps ComponentProps<"div"> to Svelte 5 $props() with TypeScript.
	 */
	let { class: className, children, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="base-node-content" class={cn('flex flex-col gap-y-2 p-3', className)} {...props}>
	<!-- Render the default slot content -->
	{@render children?.()}
</div>
