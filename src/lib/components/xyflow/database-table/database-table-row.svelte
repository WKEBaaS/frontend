<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<tr class="group hover:bg-muted/30 h-9 transition-colors">
	{@render children?.()}
</tr>
