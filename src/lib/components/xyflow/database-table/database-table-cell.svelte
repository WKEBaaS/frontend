<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { class: className, children }: Props = $props();
</script>

<td class={className}>
	{@render children?.()}
</td>
