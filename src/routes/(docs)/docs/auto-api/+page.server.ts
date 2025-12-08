import { getCodeRaw } from '$lib/docs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [initClient, queryExample, mutationExample] = await Promise.all([
		getCodeRaw('auto-api/init-client.ts'),
		getCodeRaw('auto-api/query-example.ts'),
		getCodeRaw('auto-api/mutation-example.ts')
	]);

	return {
		initClient,
		queryExample,
		mutationExample
	};
};
