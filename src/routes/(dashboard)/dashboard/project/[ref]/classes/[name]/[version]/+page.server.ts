import { getCreateClassFunc } from '$lib/remotes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const parent = await event.parent();
	const name = event.params.name;
	const version = parseInt(event.params.version, 10);
	const project_id = parent.project.id;

	const func = await getCreateClassFunc({
		project_id,
		name,
		version
	});

	return { func };
};
