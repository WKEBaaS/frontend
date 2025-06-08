import * as auth from '$lib/auth';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handleAuth: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(auth.jwtCookieName);

	if (token) {
		const payload = await auth.validateJwt(token);
		event.locals.session = payload;
		event.locals.accessToken = token;
	}

	return resolve(event);
};

const handleEnv: Handle = async ({ event, resolve }) => {
	// Set the home URL based on the environment variable
	event.locals.home = new URL(env.BAAS_HOME_URL || 'http://localhost:5173');

	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleParaglide, handleEnv);
