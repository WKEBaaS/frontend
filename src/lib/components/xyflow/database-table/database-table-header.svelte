<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as BaseNode from '../base-node/index.js';
	import { cn } from '$lib/utils.js';

	let { class: className, children }: { class?: string; children: Snippet<[]> | undefined } = $props();
</script>

<BaseNode.Header class={cn('border-border justify-center border-b', className)}>
	<h2 class="text-sm font-semibold tracking-tight">{@render children?.()}</h2>
</BaseNode.Header>
