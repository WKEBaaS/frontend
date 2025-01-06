import { env } from '$env/dynamic/private';
import * as auth from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		return redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	login: async (event) => {
		return redirect(302, env.AUTH_SERVICE_URL + '/login?redirect_url=' + event.url.origin);
	},
	logout: async (event) => {
		event.cookies.delete(auth.jwtCookieName, { path: '/' });
		return redirect(302, '/');
	}
};
