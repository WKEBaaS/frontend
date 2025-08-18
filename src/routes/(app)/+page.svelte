<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages';
	import * as Card from '$lib/components/ui/card/index.js';
	import Database from '@lucide/svelte/icons/database';
	import Key from '@lucide/svelte/icons/key-round';
	import HardDrive from '@lucide/svelte/icons/hard-drive';
	import Cog from '@lucide/svelte/icons/cog';
	import Mail from '@lucide/svelte/icons/mail';

	const features = [
		{
			title: m.feat_i3s(),
			description: m.feat_i3s_description(),
			icon: Database
		},
		{
			title: m.feat_auth(),
			description: m.feat_auth_description(),
			icon: Key
		},
		{
			title: m.feat_storage(),
			description: m.feat_storage_description(),
			icon: HardDrive
		},
		{
			title: m.feat_auto_api(),
			description: m.feat_auto_api_description(),
			icon: Cog
		},
		{
			title: m.feat_email(),
			description: m.feat_email_description(),
			icon: Mail
		}
	];
</script>

<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center space-y-4 text-center">
			<div class="space-y-2">
				<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
					{m.welcome()}
				</h1>
				<p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
					{m.welcome_description()}
				</p>
			</div>
			<div class="space-x-4">
				<a class={buttonVariants({ variant: 'default' })} href="/dashboard">{m.get_started()}</a>
				<Button variant="outline">{m.learn_more()}</Button>
			</div>
		</div>
	</div>
</section>

<section class="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
	<div class="container px-4 md:px-6">
		<h2 class="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
			{m.features()}
		</h2>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as f (f.title)}
				<Card.Root
					class="hover:ring-sidebar-ring transition-all duration-300 hover:scale-y-105 hover:cursor-pointer hover:shadow-lg"
				>
					<Card.Header class="flex flex-row items-center gap-8">
						<f.icon class="h-8 w-8" />
						<Card.Title>{f.title}</Card.Title>
					</Card.Header>
					<Card.Content>
						<p>{f.description}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
