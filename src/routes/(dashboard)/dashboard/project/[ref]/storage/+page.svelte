<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';

	let { data } = $props();

	const accessKeyClipboard = new UseClipboard();
	const accessSecretClipboard = new UseClipboard();
</script>

<div class="space-y-4 p-4">
	<Card>
		<CardHeader>
			<CardTitle>Storage Settings</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			<div>
				<h3 class="font-medium">Bucket Name</h3>
				<p class="text-muted-foreground text-sm">{data.bucketName}</p>
			</div>
			<div>
				<h3 class="font-medium">S3 Endpoint</h3>
				<p class="text-muted-foreground text-sm">{env.PUBLIC_S3_ENDPOINT || 'Not configured'}</p>
			</div>
			<div>
				<h3 class="font-medium">S3 Region</h3>
				<p class="text-muted-foreground text-sm">{env.PUBLIC_S3_REGION || 'Not configured'}</p>
			</div>
			<Button target="_blank" href={env.PUBLIC_S3_ENDPOINT}>Open S3 Console</Button>
			<div>
				<h3 class="font-medium">Access Key</h3>
				<div class="flex items-center gap-2">
					<Input type="password" readonly value="••••••••••••••••••••••••••••••••" class="flex-1" />
					<Button variant="outline" size="icon" onclick={() => accessKeyClipboard.copy(data.accessKeyID)}>
						{#if accessKeyClipboard.copied}
							<Check class="h-4 w-4" />
						{:else}
							<Copy class="h-4 w-4" />
						{/if}
					</Button>
				</div>
			</div>
			<div>
				<h3 class="font-medium">Access Secret</h3>
				<div class="flex items-center gap-2">
					<Input type="password" readonly value="••••••••••••••••••••••••••••••••" class="flex-1" />
					<Button variant="outline" size="icon" onclick={() => accessSecretClipboard.copy(data.secretAccessKey)}>
						{#if accessSecretClipboard.copied}
							<Check class="h-4 w-4" />
						{:else}
							<Copy class="h-4 w-4" />
						{/if}
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
