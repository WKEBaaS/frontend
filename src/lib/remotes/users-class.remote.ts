import { command, getRequestEvent, query } from '$app/server';
import { env } from '$env/dynamic/public';
import { classMetadataSchema, classSchema, permissionSchema } from '$lib/schemas/index.js';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';

export const getUsersRootClass = query(v.string(), async (ref) => {
	const event = getRequestEvent();

	const url = new URL('/v1/project/root-class', env.PUBLIC_BAAS_API_URL);
	url.searchParams.append('ref', ref);

	const resp = await event.fetch(url);
	if (!resp.ok) {
		console.error('Failed to fetch root class:', resp.status, resp.statusText);
		error(resp.status, 'Failed to fetch root class');
	}

	const data = await resp.json();
	const parsed = await v.safeParseAsync(classSchema, data.class);
	if (!parsed.success) {
		console.log('Parsed root class issues:', JSON.stringify(parsed.issues, null, 2));
		error(500, 'Failed to parse root class');
	}

	return parsed.output;
});

export const getUsersRootClasses = query(v.string(), async (ref) => {
	const event = getRequestEvent();

	const url = new URL('/v1/project/root-classes', env.PUBLIC_BAAS_API_URL);
	url.searchParams.append('ref', ref);

	const resp = await event.fetch(url);
	if (!resp.ok) {
		console.error('Failed to fetch root classes:', resp.status, resp.statusText);
		error(resp.status, 'Failed to fetch root classes');
	}

	const data = await resp.json();
	const parsed = await v.safeParseAsync(v.array(classMetadataSchema), data.classes);
	if (!parsed.success) {
		console.error('Failed to parse first level classes:', parsed.issues);
		error(500, 'Failed to parse first level classes');
	}

	return parsed.output;
});

export const getUsersClassChildren = query(
	v.object({
		ref: v.string(),
		pcid: v.string()
	}),
	async ({ ref, pcid }) => {
		const event = getRequestEvent();

		const url = new URL('/v1/project/class-children', env.PUBLIC_BAAS_API_URL);
		url.searchParams.append('ref', ref);
		url.searchParams.append('pcid', pcid);

		const resp = await event.fetch(url);
		if (!resp.ok) {
			console.error('Failed to fetch first level classes:', resp.status, resp.statusText);
			error(resp.status, 'Failed to fetch first level classes');
		}

		const data = await resp.json();
		const parsed = await v.safeParseAsync(v.array(classMetadataSchema), data.classes);
		if (!parsed.success) {
			console.error('Failed to parse first level classes:', parsed.issues);
			error(500, 'Failed to parse first level classes');
		}

		return parsed.output;
	}
);

export const getUsersClassById = query(
	v.object({
		ref: v.string(),
		class_id: v.string()
	}),
	async ({ ref, class_id }) => {
		const event = getRequestEvent();

		const url = new URL('/v1/project/class-by-id', env.PUBLIC_BAAS_API_URL);
		url.searchParams.append('ref', ref);
		url.searchParams.append('class_id', class_id);
		const resp = await event.fetch(url);
		if (!resp.ok) {
			console.error('Failed to fetch class by ID:', resp.status, resp.statusText);
			error(resp.status, 'Failed to fetch class by ID');
		}

		const data = await resp.json();
		const parsed = await v.safeParseAsync(classSchema, data.class);
		if (!parsed.success) {
			console.error('Failed to parse class by ID:', parsed.issues);
			error(500, 'Failed to parse class by ID');
		}

		return parsed.output;
	}
);

export const getUsersClassPermissions = query(
	v.object({
		ref: v.string(),
		class_id: v.string()
	}),
	async ({ ref, class_id }) => {
		const event = getRequestEvent();

		const url = new URL('/v1/project/class-permissions', env.PUBLIC_BAAS_API_URL);
		url.searchParams.append('ref', ref);
		url.searchParams.append('class_id', class_id);

		const resp = await event.fetch(url);
		if (!resp.ok) {
			console.error('Failed to fetch class permissions:', resp.status, resp.statusText);
			error(resp.status, 'Failed to fetch class permissions');
		}

		const data = await resp.json();
		const parsed = await v.safeParseAsync(v.array(permissionSchema), data.permissions || []);
		if (!parsed.success) {
			console.error('Failed to parse class permissions:', parsed.issues);
			error(500, 'Failed to parse class permissions');
		}
		return parsed.output;
	}
);

const updateUsersClassPermissionsSchema = v.object({
	ref: v.string(),
	class_id: v.string(),
	permissions: v.array(permissionSchema)
});

export const updateUsersClassPermissions = command(updateUsersClassPermissionsSchema, async (data) => {
	const event = getRequestEvent();

	const url = new URL('/v1/project/class-permissions', env.PUBLIC_BAAS_API_URL);

	// role_name is a client-side only field, remove it before sending to server

	const permissions = data.permissions.map(({ role_name, ...rest }) => rest);

	const resp = await event.fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ref: data.ref,
			class_id: data.class_id,
			permissions
		})
	});

	if (!resp.ok) {
		console.error('Failed to update class permissions:', resp.status, resp.statusText);
		error(resp.status, 'Failed to update class permissions');
	}

	return { success: true };
});
