<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * The footer area for the node.
	 * Maps ComponentProps<"div"> to Svelte 5 $props() with TypeScript.
	 */
	let { class: className, children, ...props }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="base-node-footer"
	class={cn('flex flex-col items-center gap-y-2 border-t px-3 pt-2 pb-3', className)}
	{...props}
>
	<!-- Render the default slot content -->
	{@render children?.()}
</div>
