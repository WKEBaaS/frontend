<script lang="ts">
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as m from '$lib/paraglide/messages';

	let { children } = $props();
</script>

<div class="w-full flex flex-col min-h-screen">
	<nav class="flex justify-between items-center">
		<div class="flex items-center space-x-2 p-2">
			<img class="h-8 w-8" src="/favicon.svg" alt="">
			<Breadcrumb.Root class="">
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/dashboard/projects">{m.dashboard()}</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link>{m.create_new_project()}</Breadcrumb.Link>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</div>
		<LanguageSwitch />
	</nav>
	{@render children()}
</div>
