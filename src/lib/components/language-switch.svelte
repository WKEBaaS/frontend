<script lang="ts">
	import Lang from 'lucide-svelte/icons/languages';

	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { locales, setLocale } from '$lib/paraglide/runtime';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
		<Lang class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0" />
		<span class="sr-only">Toggle theme</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		{#each locales as locale (locale)}
			<DropdownMenu.Item
				onclick={() => {
					setLocale(locale);
				}}
			>
				{locale}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
