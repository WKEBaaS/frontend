<script lang="ts">
	import LanguageSwitch from '$lib/components/language-switch.svelte';
	import ThemeSwitcher from '$lib/components/theme-switch.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/state';

	let currentPage = $derived.by(() => {
		switch (page.route.id) {
			case '/(dashboard)/dashboard/project/[ref]':
				return m.project_overview();
			case '/(dashboard)/dashboard/project/[ref]/settings':
				return m.settings();
			case '/(dashboard)/dashboard/project/[ref]/auth':
				return m.authentication();
			default:
				return m.project_dashboard();
		}
	});
</script>

<header
	class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
>
	<div class="flex w-full items-center gap-2 px-4">
		<Sidebar.Trigger />
		<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item class="hidden md:block">
					<Breadcrumb.Link href={`/dashboard/project/${page.params.ref}`}>{m.build_your_application()}</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator class="hidden md:block" />
				<Breadcrumb.Item>
					<Breadcrumb.Page>{currentPage}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<div class="ml-auto flex items-center gap-2">
			<LanguageSwitch />
			<ThemeSwitcher />
		</div>
	</div>
</header>
