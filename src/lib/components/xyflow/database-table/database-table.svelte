<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as BaseNode from '../base-node/index.js';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- <div -->
<!-- 	class="box-border w-fit h-fit rounded-xl bg-card text-card-foreground border border-border shadow-sm flex flex-col overflow-hidden pointer-events-auto whitespace-nowrap" -->
<!-- > -->
<!-- 	{@render children?.()} -->
<!-- </div> -->

<BaseNode.Content class="p-0">
	<table class="w-auto table-auto border-collapse text-left text-xs">
		<tbody class="divide-border divide-y">
			{@render children?.()}
		</tbody>
	</table>
</BaseNode.Content>
