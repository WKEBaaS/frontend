<script lang="ts">
	import { Handle, type HandleProps } from '@xyflow/svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';

	type Props = HandleProps & {
		class?: string;
		children?: Snippet<[]>;
	};

	let { class: className, children, ...props }: Props = $props();
</script>

<Handle
	{...props}
	class={cn(
		'dark:border-secondary dark:bg-secondary rounded-full border border-slate-300 bg-slate-100 transition',
		className
	)}
>
	{@render children?.()}
</Handle>
