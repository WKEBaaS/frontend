import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import { updateEmailAndPasswordSchema } from './schema';

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
	// TODO: Implement the action to update email and password settings
	updateEmailAndPassword: async () => {}
};
