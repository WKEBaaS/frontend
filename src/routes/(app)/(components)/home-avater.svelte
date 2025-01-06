<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Session } from '$lib/auth';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as m from '$lib/paraglide/messages';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import LogOut from 'lucide-svelte/icons/log-out';

	let form: HTMLFormElement | undefined = $state(undefined);
	let loading: boolean = $state(false);

	let { session }: { session: Session } = $props();
</script>

{#if session}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Avatar.Root>
				<Avatar.Image src="#" alt="@shadcn" />
				<Avatar.Fallback>{session.name.slice(0, 2)}</Avatar.Fallback>
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
					<DropdownMenu.Item onclick={() => form && form.submit()}>
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
{:else}
	<form
		method="POST"
		action="?/login"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		{#if loading}
			<LoaderCircle class="animate-spin" />
		{:else}
			<button>{m.login()}</button>
		{/if}
	</form>
{/if}
