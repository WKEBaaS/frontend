<script>
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as m from '$lib/paraglide/messages';
	import dayjs from 'dayjs';

	let { data } = $props();
	let project = data.project;
</script>

<div class="container mx-auto py-10">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl font-bold">{project.name}</Card.Title>
			<span class="text-xl">{m.project_reference()}: </span>
			<Badge variant="outline">{project.reference}</Badge>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div>
					<h3 class="text-lg font-semibold">{m.description()}</h3>
					<p class="text-gray-600">{project.description}</p>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<h3 class="text-lg font-semibold">{m.created_at()}</h3>
						<p class="text-gray-600">{dayjs(project.createdAt, 'PPP')}</p>
					</div>
					<div>
						<h3 class="text-lg font-semibold">{m.updated_at()}</h3>
						<p class="text-gray-600">
							{dayjs(project.updatedAt, 'PPP')}
						</p>
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
