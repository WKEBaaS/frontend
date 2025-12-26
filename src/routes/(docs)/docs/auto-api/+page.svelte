<script lang="ts">
	import * as docs from '$lib/components/docs/index.js';
	import { Link } from '$lib/components/ui/link/index.js';
	import { PMCommand } from '$lib/components/ui/pm-command/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import {
		DatabaseIcon,
		FileBracesIcon,
		KeyRoundIcon,
		NetworkIcon,
		ShieldCheckIcon,
		TerminalIcon
	} from '@lucide/svelte';
	import { getDocsHeaderStore } from '../(components)/docs-header';
	import { Root as Toc } from '$lib/components/ui/toc/index.js';
	import { UseToc } from '$lib/hooks/use-toc.svelte';

	const store = getDocsHeaderStore();
	store.setNavItems([{ name: 'PostgREST API', href: '/docs/postgrest' }]);

	// 使用更新後的 data 結構
	let { data } = $props();
	const toc = new UseToc();
</script>

<div class="w-full space-y-4 px-4">
	<docs.H1 class="flex items-center gap-2">
		<DatabaseIcon />
		PostgREST API 整合
	</docs.H1>
	<p>
		BaaS 透過 <Link href="https://postgrest.org/">PostgREST</Link> 自動將您的資料庫邏輯轉換為高效能的 RESTful API。 任何定義在資料庫
		<docs.CodeSpan>api</docs.CodeSpan> Schema 中的函式 (Functions)，都會自動對應為 API 端點。
	</p>

	<Toc toc={toc.current} />

	<div bind:this={toc.ref} class="space-y-6">
		<section class="space-y-3">
			<docs.H2 class="flex items-center gap-2">
				<TerminalIcon />
				{m.installation()}
			</docs.H2>
			<p>
				安裝專用的 PostgREST 客戶端與 <Link href="https://valibot.dev/">Valibot</Link> 驗證庫，以確保前後端型別安全。
			</p>
			<PMCommand command="add" args={['@wke-baas/postgrest-client', 'valibot']} />
		</section>

		<section class="space-y-3">
			<docs.H2 class="flex items-center gap-2">
				<NetworkIcon />
				初始化設定 (Configuration)
			</docs.H2>
			<p>
				在 <docs.CodeSpan>src/lib/server/</docs.CodeSpan> 中建立客戶端實例。您的 API 端點位於
				<docs.CodeSpan>&lt;project_id&gt;.baas.wke.csie.ncnu.edu.tw/api/rest/</docs.CodeSpan>。
			</p>
			<docs.Code code={data.initClient} title="src/lib/server/postgrest.ts" class="h-auto" />
		</section>

		<section class="space-y-3">
			<docs.H2 class="flex items-center gap-2">
				<KeyRoundIcon />
				身分驗證與授權 (Authentication & Authorization)
			</docs.H2>
			<p>
				BaaS 使用 <strong>Better-Auth</strong> 進行身分管理。為了讓資料庫知道「是誰在發送請求」， 您必須將 Better-Auth 簽發的
				JWT Token 傳遞給 PostgREST 客戶端。
			</p>
			<p>
				PostgREST 會解碼此 Token，並自動切換至資料庫中對應的角色，這讓您能夠直接在資料庫層級利用
				<strong>I3S Permission</strong> 進行權限控管。
			</p>

			<docs.Callout variant="info">
				<div class="flex items-start gap-2">
					<ShieldCheckIcon class="mt-1 h-4 w-4" />
					<div>
						<strong>Security Note:</strong>
						所有的 API 請求都應附帶 Token。如果未提供 Token，PostgREST 將使用預設的匿名角色 (Anonymous Role)， 這可能會導致權限不足錯誤。
					</div>
				</div>
			</docs.Callout>
		</section>

		<section class="space-y-3">
			<docs.H2 class="flex items-center gap-2">
				<FileBracesIcon />
				資料查詢 (Query Data)
			</docs.H2>
			<p>
				使用 <docs.CodeSpan>postgrest.get</docs.CodeSpan> 呼叫唯讀的 API 端點。 透過傳入 Valibot Schema，系統會自動驗證回傳的資料結構，確保
				Runtime 安全性。
			</p>
			<docs.Code code={data.queryExample} title="+page.server.ts (Load Function)" class="h-auto" />
		</section>

		<section class="space-y-3">
			<docs.H2 class="flex items-center gap-2">
				<DatabaseIcon />
				資料變更 (Mutate Data)
			</docs.H2>
			<p>
				對於寫入操作（Insert, Update, Delete），使用 <docs.CodeSpan>postgrest.post</docs.CodeSpan>。 這裡展示如何結合
				SvelteKit Form Actions 與 API 呼叫。
			</p>
			<docs.Code code={data.mutationExample} title="+page.server.ts (Actions)" class="h-auto" />
		</section>
	</div>
</div>
