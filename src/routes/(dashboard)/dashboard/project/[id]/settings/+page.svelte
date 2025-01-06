<script>
	import { goto } from '$app/navigation';
	import * as m from '$lib/paraglide/messages';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import DangerZone from './(components)/danger-zone.svelte';
	import { deleteProjectSchema } from './schemas';

	let { data } = $props();
	const deleteForm = superForm(data.form, {
		validators: valibotClient(deleteProjectSchema),
		delayMs: 100,
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toast.success(m.project_deleted());
				goto(result.location);
			}
		},
	});
</script>

<div class="p-4">
	<DangerZone project={data.project} {deleteForm} />
</div>
