import { env } from '$env/dynamic/private';
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
		const form = await superValidate(event, valibot(createProjectSchema));

		if (!event.locals.session) {
			error(401, { message: 'Unauthorized' });
		}

		if (!form.valid) {
			error(401, { message: 'Invalid form data' });
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));

		const apiUrl = new URL('/v1/project', env.BAAS_API_URL);
		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${event.locals.accessToken}`
			},
			body: JSON.stringify({
				name: form.data.name,
				description: form.data.description
			})
		});

		if (!res.ok) {
			console.error('Failed to create project:', res);
			error(500, 'Failed to create project.');
		}

		const data = await res.json();
		const project = v.parse(createProjectResponseSchema, data);

		redirect(301, `/dashboard/project/${project.reference}`);
	}
};
