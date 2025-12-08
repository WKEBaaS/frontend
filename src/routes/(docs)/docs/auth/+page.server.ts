import { getCodeRaw } from '$lib/docs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [authClientExample, viteProxyConfig, loginExample] = await Promise.all([
		getCodeRaw('auth/auth-client-example.ts'),
		getCodeRaw('auth/vite-proxy-config.ts'),
		getCodeRaw('auth/login-example.svelte')
	]);

	return {
		authClientExample,
		viteProxyConfig,
		loginExample
	};
};
