import { env } from '$env/dynamic/public';
import { ssoClient } from '@better-auth/sso/client';
import { jwtClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: env.PUBLIC_AUTH_API_URL,
	plugins: [jwtClient()],
	fetchOptions: {
		credentials: 'include'
	}
});
