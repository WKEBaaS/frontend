import { env } from '$env/dynamic/private';
import { createPostgrestClient } from '@wke-baas/postgrest-client';

export const pgrestClient = createPostgrestClient(env.PGREST_API_URL);

export const rpc = {
	getCreateClassFunction: '/api/rest/rpc/get_create_class_function',
	getCreateClassFunctionVersions: '/api/rest/rpc/get_create_class_function_versions',
	getCreateClassFunctions: '/api/rest/rpc/get_create_class_functions'
};
