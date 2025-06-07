import * as auth from '$lib/auth';
import { paraglideMiddleware } from '$lib/paraglide/server';
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
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleParaglide);
