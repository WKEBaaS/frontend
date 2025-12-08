<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { CircleCheckBigIcon, CircleX, FileText, Info, Lightbulb, TriangleAlertIcon } from '@lucide/svelte';

	// Define the supported variants
	type NoteVariant = 'note' | 'info' | 'warning' | 'danger' | 'success' | 'tip';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: NoteVariant;
		title?: string;
	}

	let { class: className, variant = 'note', title, children, ...rest }: Props = $props();

	// Configuration for each variant (Icon + Color Styles)
	const configs = {
		note: {
			icon: FileText,
			container: 'border-zinc-500/50 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100',
			title: 'text-zinc-900 dark:text-zinc-100'
		},
		info: {
			icon: Info,
			container: 'border-blue-500/50 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100',
			title: 'text-blue-700 dark:text-blue-300'
		},
		tip: {
			icon: Lightbulb,
			container: 'border-purple-500/50 bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-100',
			title: 'text-purple-700 dark:text-purple-300'
		},
		warning: {
			icon: TriangleAlertIcon,
			container: 'border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100',
			title: 'text-amber-700 dark:text-amber-300'
		},
		danger: {
			icon: CircleX,
			container: 'border-red-500/50 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100',
			title: 'text-red-700 dark:text-red-300'
		},
		success: {
			icon: CircleCheckBigIcon,
			container: 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100',
			title: 'text-emerald-700 dark:text-emerald-300'
		}
	};

	// Derive the current configuration based on the prop
	let config = $derived(configs[variant]);
	let Icon = $derived(config.icon);

	// Default the display title to the variant name if no title is provided
	let displayTitle = $derived(title ?? variant.toUpperCase());
</script>

<div class={cn('my-6 w-full rounded-md border-l-4 p-4 shadow-sm', config.container, className)} {...rest}>
	<div class="mb-2 flex items-center gap-2">
		<Icon class={cn('h-4 w-4', config.title)} />
		<span class={cn('leading-none font-semibold tracking-tight', config.title)}>
			{displayTitle}
		</span>
	</div>

	<div class="text-sm opacity-90 [&>p]:leading-relaxed [&>p:not(:first-child)]:mt-2">
		{@render children?.()}
	</div>
</div>
