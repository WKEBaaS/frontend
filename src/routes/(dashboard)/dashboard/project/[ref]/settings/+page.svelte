<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import DangerZone from './(components)/danger-zone.svelte';
	import SettingsZone from './(components)/settings-zone.svelte';

	let { data } = $props();
	let resetPasswordOpen = $state(false);
	let updateProjectInfoOpen = $state(false);
	let updateAllowedOriginsOpen = $state(false);
</script>

<div class="space-y-4 p-4">
	<div>
		<h1 class="text-foreground text-3xl font-bold">{data.project.name}</h1>
	</div>
	<SettingsZone
		bind:updateProjectInfoOpen
		bind:resetPasswordOpen
		bind:updateAllowedOriginsOpen
		title={m.project_settings()}
		project={data.project}
		settings={data.settings}
	/>
	<DangerZone project={data.project} />
</div>
