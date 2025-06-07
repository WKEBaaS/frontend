import { env } from '$env/dynamic/private';
// import * as auth from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		return redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	login: async (event) => {
		const loginUrl = new URL('/v1/auth/login', env.BAAS_API_URL);
		loginUrl.searchParams.set('redirect_url', event.url.origin);
		return redirect(302, loginUrl);
	},
	logout: async (event) => {
		const logoutUrl = new URL('/v1/auth/logout', env.BAAS_API_URL);
		logoutUrl.searchParams.set('post_logout_redirect_uri', event.url.origin);
		return redirect(302, logoutUrl);
	}
};
