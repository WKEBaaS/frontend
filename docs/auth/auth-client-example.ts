import { createAuthClient } from 'better-auth/svelte';
import { ssoClient } from '@better-auth/sso/client';
import { jwtClient } from 'better-auth/client/plugins';
import { env } from '$env/dynamic/public';

export const authClient = createAuthClient({
	baseURL: env.PUBLIC_AUTH_API_URL,
	plugins: [jwtClient()],
	fetchOptions: {
		credentials: 'include'
	}
});
