<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

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
