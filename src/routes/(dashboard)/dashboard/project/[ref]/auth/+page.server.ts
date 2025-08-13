import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import { type AuthProvider, updateAuthProviderSchema } from './schema';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ locals, parent }) => {
	if (!locals.session) {
		return redirect(302, '/');
	}

	const { settings } = await parent();
	return {
		settings,
		updateAuthProviderForm: await superValidate(
			arktype(updateAuthProviderSchema, {
				defaults: {
					emailEnabled: settings.auth?.email?.enabled || false,
					googleEnabled: settings.auth?.google?.enabled || false,
					googleClientId: settings.auth?.google?.clientId,
					googleClientSecret: settings.auth?.google?.clientSecret,
					githubEnabled: settings.auth?.github?.enabled || false,
					githubClientId: settings.auth?.github?.clientId,
					githubClientSecret: settings.auth?.github?.clientSecret,
					discordEnabled: settings.auth?.discord?.enabled || false,
					discordClientId: settings.auth?.discord?.clientId,
					discordClientSecret: settings.auth?.discord?.clientSecret
				}
			})
		)
	};
};

export const actions: Actions = {
	updateAuthProvider: async (event) => {
		if (!event.locals.session) {
			return error(401, { message: 'Unauthorized' });
		}

		const form = await superValidate(event, arktype(updateAuthProviderSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const authPayload: Record<string, AuthProvider> = {};
		switch (form.data.type) {
			case 'email':
				authPayload.email = {
					enabled: true
				};
				break;
			case undefined:
				return fail(400, { form, message: 'Authentication type must be specified.' });
			default:
				authPayload[form.data.type] = {
					enabled: form.data[`${form.data.type}Enabled`],
					clientId: form.data[`${form.data.type}ClientId`] || undefined,
					clientSecret: form.data[`${form.data.type}ClientSecret`] || undefined
				};
		}
		console.log('Auth Payload:', authPayload);

		const patchSettingsURL = new URL('/v1/project/settings', env.PUBLIC_BAAS_API_URL);
		const patchSettingsRes = await event.fetch(patchSettingsURL, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ref: event.params.ref,
				auth: authPayload
			})
		});

		if (!patchSettingsRes.ok) {
			console.error('Failed to update authentication provider settings:', patchSettingsRes);
			fail(500, { form });
		}

		return message(form, 'Authentication provider settings updated successfully.');
	}
};
