import { getUsersRootClass } from '$lib/remotes';
import { createClassFuncMetaSchema } from '$lib/schemas';
import * as api from '$lib/server';
import * as v from 'valibot';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const token = await api.auth.fetchToken(event);
	const parent = await event.parent();
	const functions = await api.pgrest.get({
		endpoint: api.rpc.getCreateClassFunctions,
		token,
		schema: v.array(createClassFuncMetaSchema),
		params: {
			p_project_id: parent.project.id
		}
	});

	const root = await getUsersRootClass(parent.project.reference);
	return {
		functions,
		root
	};
};
