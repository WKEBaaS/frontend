import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { deleteProjectSchema } from './schemas';

export const load: PageServerLoad = async ({ locals, parent }) => {
	if (!locals.session) {
		return redirect(302, '/');
	}

	const { project } = await parent();

	return {
		form: await superValidate(valibot(deleteProjectSchema)),
		project
	};
};

export const actions: Actions = {
	deleteProject: async (event) => {
		// const langPath = getLanguagePathFromUrl(event.url);
		const form = await superValidate(event, valibot(deleteProjectSchema));

		if (!event.locals.session) {
			error(401, { message: 'Unauthorized' });
		}

		if (!form.valid) {
			error(401, { message: 'Invalid form data' });
		}

		const url = new URL('/v1/project/by-ref', env.BAAS_API_URL);
		url.searchParams.append('ref', event.params.ref);

		const res = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${event.locals.accessToken}`
			}
		});

		if (!res.ok) {
			console.error('Failed to delete project:', res);
			error(500, 'Failed to delete project.');
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));
		redirect(301, '/dashboard/projects');
	}
};
