import * as auth from '$lib/auth';
import { i18n } from '$lib/i18n';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = i18n.handle();

const handleAuth: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(auth.jwtCookieName);

	if (token) {
		const payload = await auth.validateJwt(token);
		event.locals.session = payload;
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleParaglide);
