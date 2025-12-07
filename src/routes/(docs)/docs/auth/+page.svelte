<script lang="ts">
	import * as docs from '$lib/components/docs/index.js';
	import { Link } from '$lib/components/ui/link/index.js';
	import { PMCommand } from '$lib/components/ui/pm-command/index.js';
	import * as m from '$lib/paraglide/messages.js';
	import { KeyIcon, SettingsIcon, UserIcon } from '@lucide/svelte';
	import { getDocsHeaderStore } from '../(components)/docs-header';

	const store = getDocsHeaderStore();
	store.setNavItems([{ name: 'Authentication', href: '/docs/auth' }]);

	let { data } = $props();
</script>

<div class="w-full space-y-4 px-4">
	<docs.H1 class="flex items-center gap-2">
		<KeyIcon />
		{m.authentication()}
	</docs.H1>
	<p>
		BaaS provides each project
		<Link href="https://www.better-auth.com/">Better-Auth</Link>
		integration for authentication and user management.
	</p>

	<docs.H2>{m.installation()}</docs.H2>
	<p>Install offcial better-auth plugin</p>
	<PMCommand command="add" args={['-D', 'better-auth']} />

	<docs.H2 class="flex items-center gap-2">
		<SettingsIcon />
		Better-Auth Client Implementation (Better-Auth 客戶端實作)
	</docs.H2>
	<p>
		您需要初始化 better-auth 客戶端，以便在應用程式中使用其功能。
		請在您的專案中建立一個客戶端設定檔，例如：src/lib/auth-client.ts，並新增以下程式碼。這個客戶端將負責與您的 BaaS
		身份驗證 API 進行通訊。
	</p>
	<docs.Code code={data.authClientExample} class="h-auto" />

	<docs.H2 class="flex items-center gap-2">
		<UserIcon />
		Login/Logout Example (登入/登出範例)
	</docs.H2>
	<docs.Code code={data.loginExample} class="h-150" />
</div>
