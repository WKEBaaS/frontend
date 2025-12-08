import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api/auth': {
				target: 'https://<project_ref>.baas.wke.csie.ncnu.edu.tw',
				changeOrigin: true,
				secure: false
			}
		}
	}
});
