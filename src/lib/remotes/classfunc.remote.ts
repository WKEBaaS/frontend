import { form, getRequestEvent, query } from '$app/server';
import { env } from '$env/dynamic/public';
import { createClassFuncMetaSchema, createClassFuncSchema, createClassFuncSchemaWithoutNode } from '$lib/schemas';
import * as api from '$lib/server';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';

export const createClassFunc = form(createClassFuncSchemaWithoutNode, async (data) => {
	const parsed = await v.safeParseAsync(createClassFuncSchema, data);
	if (!parsed.success) {
		error(500, 'Failed to parse class function data');
	}

	const event = getRequestEvent();
	const url = new URL('/v1/project/create-classes-function', env.PUBLIC_BAAS_API_URL);
	const resp = await event.fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(parsed.output)
	});

	if (!resp.ok) {
		console.error('Failed to create class function:', resp.status, resp.statusText);
		error(resp.status, 'Failed to create class function');
	}

	return {
		success: true
	};
});

export const getCreateClassFuncs = query(v.string(), async (project_id: string) => {
	const event = getRequestEvent();
	const token = await api.auth.fetchToken(event);
	const functions = await api.pgrest.get({
		endpoint: api.rpc.getCreateClassFunctions,
		token,
		schema: v.array(createClassFuncMetaSchema),
		params: {
			p_project_id: project_id
		}
	});

	return functions;
});
