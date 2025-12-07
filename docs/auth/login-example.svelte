<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	let loading: boolean = $state(false);

	// 使用 authClient.useSession() 來訂閱當前的使用者會話狀態
	const session = authClient.useSession();

	async function handleLogin() {
		loading = true;
		try {
			await authClient.signIn.social({
				provider: 'google',
				callbackURL: page.url.origin
			});
		} catch (error) {
			console.error('SSO Login failed:', error);
			loading = false; // 登入失敗時也要停止 loading
		}
	}
	async function handleLogout() {
		await authClient.signOut();
	}
</script>

{#if $session.data}
	<Avatar.Root>
		<Avatar.Image src="#" alt="User Avatar" />
		<Avatar.Fallback>{$session?.data?.user?.name.slice(0, 2)}</Avatar.Fallback>
	</Avatar.Root>
	<Button onclick={handleLogout}>Log out</Button>
{:else if loading}
	<LoaderCircle class="animate-spin" />
{:else}
	<Button onclick={handleLogin}>Login</Button>
{/if}
