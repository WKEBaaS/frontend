<script lang="ts">
	import { DatabaseSchema } from '$lib/components/database-schema/index.js';
	import * as docs from '$lib/components/docs/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { UseToc } from '$lib/hooks/use-toc.svelte';
	import { KeyIcon } from '@lucide/svelte';
	import { Background, MiniMap, SvelteFlow } from '@xyflow/svelte';
	import { mode } from 'mode-watcher';
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
	<p>BaaS 的權限系統採用 以目錄 (Class) 為核心的位元權限控制 (Bitwise Permission Control)。</p>
	<div bind:this={toc.ref} class="space-y-4">
		<div class="h-200">
			<SvelteFlow
				colorMode={mode.current}
				fitView
				nodes={data.nodes}
				edges={data.edges}
				nodeTypes={{ table: DatabaseSchema, 'permission-note': PermissionEnum }}
			>
				<MiniMap />
				<Background />
			</SvelteFlow>
		</div>
		<docs.H2>系統概述 (Overview)</docs.H2>
		<p>系統將資源分為兩個層級：</p>
		<ul class="list-disc pl-6">
			<li>Classes (目錄/類別)：資源的容器，權限掛載的主要對象。</li>
			<li>Objects (物件)：隸屬於 Class 底下的具體資料實體。</li>
		</ul>
		<p>
			權限管理透過 Permission Table 進行，並利用 Bitwise Operation (位元運算)
			來儲存與判斷多種權限狀態。這允許我們在一個整數欄位中同時儲存多種權限（如讀取、寫入、刪除），並能極快地進行效能查詢。
		</p>

		<docs.H2>核心權限定義 (Permission Enum)</docs.H2>
		<p>
			權限由 <docs.CodeSpan>dbo.permission_enum</docs.CodeSpan> 表定義，每個權限對應一個 2 的冪次方 (Power of 2) 的數值。
		</p>
		<Table.Root class="bg-card rounded-sm">
			<Table.Header>
				<Table.Row>
					<Table.Head>Permission</Table.Head>
					<Table.Head>Description</Table.Head>
					<Table.Head>Bits</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.permissions as permission (permission.name)}
					<Table.Row class="hover:bg-accent/50">
						<Table.Cell>{permission.name}</Table.Cell>
						<Table.Cell class="text-muted-foreground">{permission.description}</Table.Cell>
						<Table.Cell>{permission.bits}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<docs.Callout variant="info">
			注意：權限是可以疊加的。例如，若某用戶對某 Class 擁有 read-class (1) 和 insert (4)，則資料庫中儲存的值為 5 (1 +
			4)。
		</docs.Callout>

		<docs.H2>權限判斷邏輯 (Authorization Flow)</docs.H2>
		<p>
			當 API 檢查權限時，系統會依照以下優先順序進行判斷。邏輯採用 累加制
			(Additive)，只要用戶符合任一條件（個人、群組或公開），即視為擁有權限。
		</p>

		<docs.H3>詳細判斷步驟 (api.check_permission_core)：</docs.H3>
		<ol class="list-decimal space-y-2 pl-6">
			<li>
				<strong>超級管理員檢查 (Admin)：</strong>
				<p>若當前資料庫角色為 app_admin，直接回傳 TRUE (允許所有操作)。</p>
			</li>
			<li>
				<strong>擁有者檢查 (Owner)：</strong>
				<p>若當前用戶 ID 等於該 Class 的 owner_id，直接回傳 TRUE。</p>
			</li>
			<li>
				<strong>權限表比對 (Permission Table Check)：</strong>
				<p>系統會計算以下三種來源的權限聯集 (Union)：</p>
				<ul class="list-disc space-y-1 pl-6">
					<li><docs.CodeSpan>Anon</docs.CodeSpan>：檢查 auth.groups 中名為 anon 的群組權限。</li>
					<li><docs.CodeSpan>User</docs.CodeSpan>：檢查針對該 user_id 直接設定的權限。</li>
					<li><docs.CodeSpan>Group</docs.CodeSpan>：檢查該用戶所屬的所有 auth.groups 的權限。</li>
				</ul>
				<p>
					判定：將上述收集到的所有 permission_bits 進行 OR 運算，再與請求的權限 bit 進行 AND 運算。若結果 &gt; 0，則回傳
					TRUE。
				</p>
			</li>
		</ol>

		<docs.H2>資料庫架構 (Schema Design)</docs.H2>
		<p>權限系統主要依賴以下資料表：</p>

		<docs.H3>身份與群組 (Auth)</docs.H3>
		<ul class="list-disc space-y-1 pl-6">
			<li><docs.CodeSpan>auth.users</docs.CodeSpan>: 儲存使用者資訊。</li>
			<li><docs.CodeSpan>auth.groups</docs.CodeSpan>: 儲存群組資訊（包含特殊群組如 anon）。</li>
			<li><docs.CodeSpan>auth.user_groups</docs.CodeSpan>: (隱含於關聯中) 關聯使用者與群組。</li>
		</ul>

		<docs.H3>資源 (Resources)</docs.H3>
		<ul class="list-disc space-y-1 pl-6">
			<li><docs.CodeSpan>dbo.classes</docs.CodeSpan>: 權限依附的主體。由 id (NanoID) 或 name_path 識別。</li>
			<li><docs.CodeSpan>dbo.objects</docs.CodeSpan>: 實際資料,隸屬於 Class。</li>
		</ul>

		<docs.H3>權限關聯 (Permissions)</docs.H3>
		<ul class="list-disc space-y-1 pl-6">
			<li>
				<docs.CodeSpan>dbo.permissions</docs.CodeSpan>: 核心權限對照表。
				<ul class="mt-1 list-disc space-y-1 pl-6">
					<li><docs.CodeSpan>class_id</docs.CodeSpan>: 目標 Class。</li>
					<li><docs.CodeSpan>role_type</docs.CodeSpan>: 角色類型，列舉值為 USER 或 GROUP。</li>
					<li><docs.CodeSpan>role_id</docs.CodeSpan>: 對應到 auth.users.id 或 auth.groups.id。</li>
					<li><docs.CodeSpan>permission_bits</docs.CodeSpan>: 權限數值總和 (SmallInt)。</li>
				</ul>
			</li>
		</ul>

		<docs.H2>內建 API 函式 (Stored Functions)</docs.H2>
		<p>And BaaS 提供了封裝好的 PostgreSQL 函數供上層應用程式直接調用，無需手寫複雜的 Join 查詢。</p>

		<docs.H3>檢查單一權限</docs.H3>
		<p><strong>函數</strong>：<docs.CodeSpan>api.check_class_permission(p_class_id, p_permission)</docs.CodeSpan></p>
		<ul class="list-disc space-y-1 pl-6">
			<li><strong>用途</strong>：檢查當前用戶（透過 JWT Context）是否對指定 Class 擁有特定權限。</li>
			<li>
				<strong>參數</strong>：
				<ul class="mt-1 list-disc space-y-1 pl-6">
					<li><docs.CodeSpan>p_class_id</docs.CodeSpan>: Class 的 ID。</li>
					<li><docs.CodeSpan>p_permission</docs.CodeSpan>: 權限名稱字串 (例如 'read-object')。</li>
				</ul>
			</li>
			<li><strong>回傳</strong>：<docs.CodeSpan>BOOLEAN</docs.CodeSpan></li>
		</ul>

		<docs.H3>透過路徑檢查權限</docs.H3>
		<p>
			<strong>函數</strong>：<docs.CodeSpan
				>api.check_class_permission_by_name_path(p_name_path, p_permission)</docs.CodeSpan
			>
		</p>
		<ul class="list-disc space-y-1 pl-6">
			<li><strong>用途</strong>：同上，但使用可讀性較高的路徑 (Name Path) 來指定 Class。</li>
			<li>
				<strong>參數</strong>：
				<ul class="mt-1 list-disc space-y-1 pl-6">
					<li><docs.CodeSpan>p_name_path</docs.CodeSpan>: 例如 /system/docs。</li>
					<li><docs.CodeSpan>p_permission</docs.CodeSpan>: 例如 'insert'。</li>
				</ul>
			</li>
			<li>
				<strong>回傳</strong>：TABLE (<docs.CodeSpan>class_id</docs.CodeSpan>, <docs.CodeSpan>has</docs.CodeSpan>)
			</li>
		</ul>

		<docs.H3>獲取所有權限清單</docs.H3>
		<p><strong>函數</strong>：<docs.CodeSpan>api.get_class_permissions(p_class_id)</docs.CodeSpan></p>
		<ul class="list-disc space-y-1 pl-6">
			<li>
				<strong>用途</strong>：列出當前用戶對該 Class 的所有權限狀態。這對於前端 UI
				顯示（例如決定是否顯示「編輯按鈕」）非常有用。
			</li>
			<li><strong>邏輯</strong>：會自動計算用戶個人權限及其所屬群組權限的總和。</li>
			<li><strong>回傳</strong>：</li>
		</ul>
		<docs.Code
			code={`permission (text) | has (boolean)
------------------+--------------
read-class        | true
insert            | false
...`}
		/>

		<docs.H2>使用範例 (Usage Examples)</docs.H2>

		<docs.H3>場景 A：設定一個 Class 為公開可讀</docs.H3>
		<p>假設我們有一個 Class ID 為 news_feed，我們希望所有訪客（即使未登入）都能讀取。</p>
		<docs.Code
			lang="plsql"
			code={`-- 1. 取得 'anon' 群組的 ID
DO $
DECLARE
    v_anon_group_id uuid;
    v_class_id text := 'news_feed'; -- 假設的 Class ID
    v_read_bits smallint;
BEGIN
    SELECT id INTO v_anon_group_id FROM auth.groups WHERE name = 'anon';
    
    -- 2. 計算 read-class (1) + read-object (2) = 3
    v_read_bits := 3;

    -- 3. 寫入權限表
    INSERT INTO dbo.permissions (class_id, role_type, role_id, permission_bits)
    VALUES (v_class_id, 'GROUP', v_anon_group_id, v_read_bits)
    ON CONFLICT (class_id, role_type, role_id) 
    DO UPDATE SET permission_bits = EXCLUDED.permission_bits;
END $;`}
		/>

		<docs.H3>場景 B：前端檢查用戶是否有權限刪除資料</docs.H3>
		<p>開發者可以直接呼叫 API 函數：</p>
		<docs.Code
			lang="plsql"
			code={`-- 模擬 API 請求
SELECT api.check_class_permission('Target_Class_ID', 'delete');

-- 回傳: true 或 false`}
		/>

		<docs.H3>場景 C：前端獲取權限以渲染 UI</docs.H3>
		<p>前端載入頁面時，呼叫此函數以決定是否顯示「新增」、「刪除」按鈕：</p>
		<docs.Code lang="plsql" code="SELECT * FROM api.get_class_permissions('Target_Class_ID');" />

		<p><strong>結果範例：</strong></p>
		<Table.Root class="bg-card rounded-sm">
			<Table.Header>
				<Table.Row>
					<Table.Head>Permission</Table.Head>
					<Table.Head>Has</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>read-class</Table.Cell>
					<Table.Cell>true</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>read-object</Table.Cell>
					<Table.Cell>true</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>insert</Table.Cell>
					<Table.Cell>true</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>delete</Table.Cell>
					<Table.Cell>false</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>...</Table.Cell>
					<Table.Cell>...</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
		<p class="text-muted-foreground italic">(代表該用戶可以讀取與新增，但不能刪除)</p>
	</div>
</div>
