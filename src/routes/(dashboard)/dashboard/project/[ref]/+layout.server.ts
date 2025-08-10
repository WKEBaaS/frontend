import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import type { LayoutServerLoad } from './$types';
import { projectDetailSchema } from './schemas';
import dayjs from 'dayjs';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) => {
	if (!locals.session) {
		error(401, { message: 'Unauthorized' });
	}

	const url = new URL('/v1/project/by-ref', env.PUBLIC_BAAS_API_URL);
	url.searchParams.append('ref', params.ref);

	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
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

	const databaseURL = `jdbc:postgresql://${project.output.reference}.${locals.externalURL.host}:5432/app`;
	const authDocsURL = `https://${project.output.reference}.${locals.externalURL.host}/api/auth/docs`;
	const passwordExpired = dayjs(project.output.passwordExpiredAt).isBefore(dayjs());

	return {
		project: project.output,
		databaseURL: databaseURL,
		authDocsURL: authDocsURL,
		passwordExpired: passwordExpired
	};
};
