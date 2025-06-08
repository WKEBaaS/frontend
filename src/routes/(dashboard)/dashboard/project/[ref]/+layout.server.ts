import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import type { LayoutServerLoad } from './$types';
import { projectDetailSchema } from './schemas';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) => {
	if (!locals.session) {
		error(401, { message: 'Unauthorized' });
	}

	const url = new URL('/v1/project/by-ref', env.BAAS_API_URL);
	url.searchParams.append('ref', params.ref);

	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.accessToken}`
		}
	});

	if (!res.ok) {
		console.error('Failed to fetch project:', res);
		error(404, 'Failed to fetch project.');
	}

	const data = await res.json();
	const project = v.safeParse(projectDetailSchema, data);

	if (!project.success) {
		console.error('Failed to parse project:', project);
		error(404, 'Failed to parse project.');
	}

	return {
		project: project.output
	};
};
