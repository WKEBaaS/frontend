<script lang="ts">
	import updateProxyURLImg from '$lib/assets/update_proxy_url.png?enhanced';
	import * as docs from '$lib/components/docs/index.js';
	import { Link } from '$lib/components/ui/link/index.js';
	import { PMCommand } from '$lib/components/ui/pm-command/index.js';
	import { Root as Toc } from '$lib/components/ui/toc/index.js';
	import { UseToc } from '$lib/hooks/use-toc.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { SettingsIcon, UserIcon, UserLockIcon, WaypointsIcon } from '@lucide/svelte';
	import { getDocsHeaderStore } from '../(components)/docs-header';

	const store = getDocsHeaderStore();
	store.setNavItems([{ name: 'Authentication', href: '/docs/auth' }]);

	let { data } = $props();
	const toc = new UseToc();
</script>

<div class="w-full space-y-4 px-4">
	<docs.H1 class="flex items-center gap-2">
		<UserLockIcon />
		{m.authentication()}
	</docs.H1>
	<p>
		BaaS provides each project
		<Link href="https://www.better-auth.com/">Better-Auth</Link>
		integration for authentication and user management.
	</p>

	<Toc toc={toc.current} />

	<div bind:this={toc.ref} class="space-y-4">
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
			<WaypointsIcon />
			Proxy Better-Auth API Requests (代理 Better-Auth API 請求)
		</docs.H2>
		<p>
			由於瀏覽器的安全限制，跨來源請求無法正確設定 Cookie。為了確保身份驗證 Cookie 能夠成功儲存，
			您需要透過相同來源的伺服器端點代理所有 Better-Auth API 請求到 BaaS 後端。 這樣可以讓 Cookie
			在相同網域下正常運作，避免跨域問題。
		</p>

		<docs.Code code={data.viteProxyConfig} class="h-auto" />

		<p>
			BaaS allows you to customize the Better-Auth API base URL. You can update the proxy URL in your authentication
			client configuration to point to your server
		</p>
		<enhanced:img
			src={updateProxyURLImg}
			alt="Proxy Better-Auth API Requests"
			class="my-4 h-48 w-full rounded border"
		/>

		<docs.H2 class="flex items-center gap-2">
			<UserIcon />
			Login/Logout Example (登入/登出範例)
		</docs.H2>
		<docs.Code lang="svelte" code={data.loginExample} class="h-150" />
	</div>
</div>
