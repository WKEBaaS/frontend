<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Icon } from '@lucide/svelte/icons';
	import type { Snippet } from 'svelte';

	interface SettingsProps {
		icon: typeof Icon;
		title: string;
		children: Snippet;
	}
	let { children, title, ...rest }: SettingsProps = $props();
</script>

<Card.Root class="border-border">
	<Card.Header>
		<Card.Title class="flex items-center gap-2">
			<rest.icon class="h-5 w-5" />
			{title}
		</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-6">
		<div>
			{@render children()}
		</div>
	</Card.Content>
</Card.Root>
