import { getCodeRaw } from '$lib/docs';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const authClientExample = await getCodeRaw('auth/auth-client-example.ts');
	const loginExample = await getCodeRaw('auth/login-example.svelte');

	return {
		authClientExample,
		loginExample
	};
};
