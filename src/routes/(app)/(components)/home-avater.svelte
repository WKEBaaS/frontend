<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import LogOut from '@lucide/svelte/icons/log-out';

	let form: HTMLFormElement | undefined = $state(undefined);
	let loading: boolean = $state(false);

	const session = authClient.useSession();
</script>

{#if $session.data}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Avatar.Root>
				<Avatar.Image src="#" alt="@shadcn" />
				<Avatar.Fallback>{$session?.data?.user?.name.slice(0, 2)}</Avatar.Fallback>
			</Avatar.Root>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
				<DropdownMenu.Separator />
				<form
					bind:this={form}
					method="POST"
					action="?/logout"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							await update();
							loading = false;
						};
					}}
				>
					<DropdownMenu.Item
						onclick={async () =>
							authClient.signIn.sso({
								providerId: 'WKE',
								callbackURL: page.url.origin
							})}
					>
						{#if loading}
							<LogOut class="mr-2 size-4" /> {m.logout()}
						{:else}
							<button>{m.login()}</button>
						{/if}
					</DropdownMenu.Item>
				</form>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else if loading}
	<LoaderCircle class="animate-spin" />
{:else}
	<Button
		onclick={async () =>
			authClient.signIn.sso({
				providerId: 'WKESSO',
				callbackURL: page.url.origin
			})}
	>
		{m.login()}
	</Button>
{/if}
