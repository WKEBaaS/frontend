import { env } from '$env/dynamic/private';
import { getLanguagePathFromUrl } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import * as v from 'valibot';
import type { Actions, PageServerLoad } from './$types';
import { createProjectResponseSchema, createProjectSchema } from './schemas';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(valibot(createProjectSchema))
	};
};

export const actions: Actions = {
	createProject: async (event) => {
		const langPath = getLanguagePathFromUrl(event.url);
		const form = await superValidate(event, valibot(createProjectSchema));

		if (!event.locals.session) {
			error(401, { message: 'Unauthorized' });
		}

		if (!form.valid) {
			error(401, { message: 'Invalid form data' });
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));

		const res = await fetch(env.PROJECT_MANAGER_URL + '/project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: form.data.name,
				description: form.data.description,
				ownerUID: event.locals.session.sub
			})
		});

		if (!res.ok) {
			console.error('Failed to create project:', res);
			error(500, 'Failed to create project.');
		}

		const data = await res.json();
		const project = v.parse(createProjectResponseSchema, data);

		redirect(301, `${langPath}/dashboard/project/${project.reference}`);
	}
};
