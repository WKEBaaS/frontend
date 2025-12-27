import { command, form, getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { deleteProjectSchema } from '$lib/schemas';
import { resetDatabasePasswordSchema, updateAllowedOriginsSchema, updateProjectInfoSchema } from '$lib/schemas';
import { error, redirect } from '@sveltejs/kit';

export const deleteProject = form(deleteProjectSchema, async (data) => {
	const event = getRequestEvent();

	if (!event.locals.session) {
		error(401, { message: 'Unauthorized' });
	}

	const url = new URL('/v1/project', env.BAAS_API_URL);
	url.searchParams.append('id', data.id);

	const res = await event.fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) {
		console.error('Failed to delete project:', res);
		error(500, 'Failed to delete project.');
	}

	redirect(301, '/dashboard/projects');
});

// 1. Reset Database Password
export const resetDatabasePassword = form(resetDatabasePasswordSchema, async (data) => {
	const event = getRequestEvent();

	if (!event.locals.session) {
		error(401, { message: 'Unauthorized' });
	}

	const url = new URL('/v1/project/reset-database-password', env.BAAS_API_URL);

	const res = await event.fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			reference: event.params.ref, // 從 event.params 取得 ref
			password: data.password // 從驗證後的 data 取得
		})
	});

	if (!res.ok) {
		console.error('Failed to reset database password:', res);
		return {
			success: false,
			message: 'Failed to reset database password.'
		};
	}

	return { success: true };
});

// 2. Update Project Info
export const updateProjectInfo = form(updateProjectInfoSchema, async (data) => {
	const event = getRequestEvent();

	if (!event.locals.session) {
		error(401, { message: 'Unauthorized' });
	}

	const patchSettingsURL = new URL('/v1/project/settings', env.BAAS_API_URL);

	const patchSettingsRes = await event.fetch(patchSettingsURL, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: data.id,
			name: data.name,
			description: data.description
		})
	});

	if (!patchSettingsRes.ok) {
		console.error('Failed to update project info:', patchSettingsRes);
		return {
			success: false,
			message: 'Failed to update project info.'
		};
	}

	return { success: true };
});

// 3. Update Allowed Origins
export const updateAllowedOrigins = command(updateAllowedOriginsSchema, async (data) => {
	const event = getRequestEvent();

	if (!event.locals.session) {
		error(401, { message: 'Unauthorized' });
	}

	const patchSettingsURL = new URL('/v1/project/settings', env.BAAS_API_URL);

	const patchSettingsRes = await event.fetch(patchSettingsURL, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: data.id,
			trustedOrigins: data.allowedOrigins
		})
	});

	if (!patchSettingsRes.ok) {
		console.error('Failed to update allowed origins:', patchSettingsRes);
		return {
			success: false,
			message: 'Failed to update allowed origins.'
		};
	}

	return { success: true };
});
