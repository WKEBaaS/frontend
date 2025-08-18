import { env } from '$env/dynamic/public';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { deleteProjectSchema, resetDatabasePasswordSchema, updateProjectInfoSchema } from './schemas';

export const load: PageServerLoad = async ({ locals, parent }) => {
	if (!locals.session) {
		return redirect(302, '/');
	}

	const { project } = await parent();

	return {
		deleteForm: await superValidate(valibot(deleteProjectSchema), {
			defaults: {
				expected: project.name,
				name: ''
			}
		}),
		resetDatabasePasswordForm: await superValidate(valibot(resetDatabasePasswordSchema)),
		updateProjectSettingsForm: await superValidate(valibot(updateProjectInfoSchema)),
		project
	};
};

export const actions: Actions = {
	deleteProject: async (event) => {
		const form = await superValidate(event, valibot(deleteProjectSchema));

		if (!event.locals.session) {
			error(401, { message: 'Unauthorized' });
		}

		if (!form.valid) {
			console.error('Invalid form data:', form);
			return fail(401, { form });
		}

		const url = new URL('/v1/project/by-ref', env.PUBLIC_BAAS_API_URL);
		url.searchParams.append('ref', event.params.ref);

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
	},
	resetDatabasePassword: async (event) => {
		const form = await superValidate(event, valibot(resetDatabasePasswordSchema));
		if (!event.locals.session) {
			error(401, { message: 'Unauthorized' });
		}
		if (!form.valid) {
			error(401, { message: 'Invalid form data' });
		}
		const url = new URL('/v1/project/reset-database-password', env.PUBLIC_BAAS_API_URL);

		const res = await event.fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				reference: event.params.ref,
				password: form.data.password
			})
		});
		if (!res.ok) {
			console.error('Failed to reset database password:', res);
			error(500, 'Failed to reset database password.');
		}
	},
	updateProjectInfo: async (event) => {
		if (!event.locals.session) {
			error(401, { message: 'Unauthorized' });
		}

		const form = await superValidate(event, valibot(updateProjectInfoSchema));
		if (!form.valid) {
			error(401, { message: 'Invalid form data' });
		}

		const patchSettingsURL = new URL('/v1/project/settings', env.PUBLIC_BAAS_API_URL);
		const patchSettingsRes = await event.fetch(patchSettingsURL, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ref: event.params.ref,
				name: form.data.name,
				description: form.data.description
			})
		});

		if (!patchSettingsRes.ok) {
			console.error('Failed to update email and password settings:', patchSettingsRes);
			error(500, 'Failed to update email and password settings.');
		}
	}
};
