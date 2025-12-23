import { env } from '$env/dynamic/private';
import { PostgrestClient } from '@youmin1017/postgrest-client';

export const pgrestClient = new PostgrestClient(env.PGREST_API_URL);

export const rpc = {
	getCreateClassFunction: '/api/rest/rpc/get_create_class_function',
	getCreateClassFunctionVersions: '/api/rest/rpc/get_create_class_function_versions',
	getCreateClassFunctions: '/api/rest/rpc/get_create_class_functions'
};
