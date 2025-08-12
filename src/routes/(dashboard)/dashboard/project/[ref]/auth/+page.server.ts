import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import { updateEmailAndPasswordSchema } from './schema';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ locals, parent }) => {
	if (!locals.session) {
		return redirect(302, '/');
	}

	const { project, settings } = await parent();
	return {
		project,
		settings,
		updateEmailAndPasswordForm: await superValidate(
			arktype(updateEmailAndPasswordSchema, {
				defaults: {
					emailAndPasswordEnabled: settings.auth?.emailAndPasswordEnabled || false
				}
			})
		)
	};
};

export const actions: Actions = {
	updateEmailAndPassword: async (event) => {
		if (!event.locals.session) {
			error(401, { message: 'Unauthorized' });
		}

		const form = await superValidate(event, arktype(updateEmailAndPasswordSchema));
		if (!form.valid) {
			error(401, { message: 'Invalid form data' });
		}

		console.log('Payload', form.data);
		const patchSettingsURL = new URL('/v1/project/settings', env.PUBLIC_BAAS_API_URL);
		const patchSettingsRes = await event.fetch(patchSettingsURL, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ref: event.params.ref,
				auth: {
					emailAndPasswordEnabled: form.data.emailAndPasswordEnabled
				}
			})
		});

		if (!patchSettingsRes.ok) {
			console.error('Failed to update email and password settings:', patchSettingsRes);
			error(500, 'Failed to update email and password settings.');
		}
	}
};
