import { env } from '$env/dynamic/private';
import { authClient } from '$lib/auth-client';
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
	const session = await authClient.getSession({
		fetchOptions: {
			headers: event.request.headers
		}
	});

	event.locals.session = session?.data?.session;
	event.locals.user = session?.data?.user;

	return resolve(event);
};

const handleEnv: Handle = async ({ event, resolve }) => {
	// Set the home URL based on the environment variable
	event.locals.externalURL = new URL(env.EXTERNAL_DOMAIN || event.url.toString());

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth, handleEnv);
