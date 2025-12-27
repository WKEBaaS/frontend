import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import * as v from 'valibot';
import type { Actions, PageServerLoad } from './$types';
import { createProjectResponseSchema, createProjectSchema } from './schemas';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(valibot(createProjectSchema))
	};
};

export const actions = {
	createProject: async (event) => {
		const form = await superValidate(event, valibot(createProjectSchema));

		if (!event.locals.session) {
			error(401, 'Unauthorized');
		}

		if (!form.valid) {
			return fail(401, { form });
		}

		const apiUrl = new URL('/v1/project', env.BAAS_API_URL);
		const res = await event.fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: form.data.name,
				description: form.data.description
			})
		});

		if (!res.ok) {
			error(500, 'Failed to create project.');
		}

		const data = await res.json();
		const project = await v.safeParseAsync(createProjectResponseSchema, data);
		if (!project.success) {
			console.error('Project creation validation failed:', project.issues);
			error(500, 'Project creation validation failed.');
		}

		redirect(301, `/dashboard/project/${project.output.reference}?new=true`);
	}
} satisfies Actions;
