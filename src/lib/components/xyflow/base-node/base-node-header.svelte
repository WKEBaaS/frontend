<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * A container for a consistent header layout intended to be used inside the
	 * `<BaseNode />` component.
	 */

	let { class: className, children, ...props }: HTMLAttributes<HTMLHeadElement> = $props();
</script>

<header
	{...props}
	class={cn(
		'mx-0 my-0 -mb-1 flex flex-row items-center justify-between gap-2 px-3 py-2',
		// Remove or modify these classes if you modify the padding in the
		// `<BaseNode />` component.
		className
	)}
>
	{@render children?.()}
</header>
