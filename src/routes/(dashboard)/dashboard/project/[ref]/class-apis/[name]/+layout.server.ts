import { getCreateClassFuncVersions } from '$lib/remotes';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const parent = await event.parent();
	const name = event.params.name;
	const project_id = parent.project.id;

	const funcVersions = await getCreateClassFuncVersions({
		project_id,
		name
	});

	return {
		funcVersions
	};
};
