import { command, form, getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/public';
import { createClassSchema, deleteClassSchema } from '$lib/schemas';
import { error } from '@sveltejs/kit';

export const createClass = command(createClassSchema, async (data) => {
	const event = getRequestEvent();
	const url = new URL('/v1/project/class', env.PUBLIC_BAAS_API_URL);
	const resp = await event.fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!resp.ok) {
		console.error('Failed to create class:', resp.status, resp.statusText);
		error(resp.status, 'Failed to create class');
	}

	return {
		success: true
	};
});

export const deleteClass = form(deleteClassSchema, async (data) => {
	console.log('Deleting class with data:', data);
	const event = getRequestEvent();
	const url = new URL('/v1/project/class', env.PUBLIC_BAAS_API_URL);
	const resp = await event.fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!resp.ok) {
		console.error('Failed to delete class:', resp.status, resp.statusText);
		error(resp.status, 'Failed to delete class');
	}
	return {
		success: true
	};
});
