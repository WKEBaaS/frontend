import { getUsersClassById, getUsersClassPermissions } from '$lib/remotes/index.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const permissions = await getUsersClassPermissions({
		ref: event.params.ref!,
		class_id: event.params.class_id!
	});

	const classData = await getUsersClassById({
		ref: event.params.ref!,
		class_id: event.params.class_id!
	});

	return {
		permissions,
		classData
	};
};
