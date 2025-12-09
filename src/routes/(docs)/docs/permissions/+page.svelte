<script lang="ts">
	import { DatabaseSchema } from '$lib/components/database-schema/index.js';
	import * as docs from '$lib/components/docs/index.js';
	import { UseToc } from '$lib/hooks/use-toc.svelte';
	import { KeyIcon } from '@lucide/svelte';
	import { Background, MiniMap, SvelteFlow } from '@xyflow/svelte';
	import { getDocsHeaderStore } from '../(components)/docs-header/index.js';
	import { PermissionEnum } from './(components)/permission-enum/index.js';

	const store = getDocsHeaderStore();
	store.setNavItems([{ name: 'PostgREST API', href: '/docs/postgrest' }]);

	// 使用更新後的 data 結構
	let { data } = $props();
	const toc = new UseToc();
</script>

<div class="w-full space-y-4 px-4">
	<docs.H1 class="flex items-center gap-2">
		<KeyIcon />
		BaaS Auto API 權限管理
	</docs.H1>
	<p></p>
	<div bind:this={toc.ref} class="space-y-6">
		<div class="h-200">
			<SvelteFlow
				colorMode="dark"
				fitView
				nodes={data.nodes}
				edges={data.edges}
				nodeTypes={{ table: DatabaseSchema, 'permission-note': PermissionEnum }}
			>
				<MiniMap />
				<Background />
			</SvelteFlow>
		</div>
	</div>
</div>
