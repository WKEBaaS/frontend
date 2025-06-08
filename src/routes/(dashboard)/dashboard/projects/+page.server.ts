import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import type { PageServerLoad } from './$types';
import { projectSchema } from './schemas';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const apiUrl = new URL('/v1/project/users', env.BAAS_API_URL);
	const res = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.accessToken}`
		}
	});

	if (!res.ok) {
		console.error('Failed to fetch projects:', res);
		error(404, 'Failed to fetch projects.');
	}

	const data = await res.json();
	const projects = v.parse(v.array(projectSchema), data.projects || []);
	return {
		projects
	};
};
