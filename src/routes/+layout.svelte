<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Toaster } from '$lib/components/ui/sonner';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />
<ParaglideJS {i18n}>
	<Toaster />
	<Sidebar.Provider>
		{@render children()}
	</Sidebar.Provider>
</ParaglideJS>
