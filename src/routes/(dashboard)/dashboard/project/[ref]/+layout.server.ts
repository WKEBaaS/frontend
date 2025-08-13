import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { projectDetail, projectSettings } from './schemas';
import dayjs from 'dayjs';
import { type } from 'arktype';

export const load: LayoutServerLoad = async ({ locals, fetch, params, depends }) => {
	depends('app:settings');

	if (!locals.session) {
		error(401, { message: 'Unauthorized' });
	}

	const projectURL = new URL('/v1/project/by-ref', env.PUBLIC_BAAS_API_URL);
	projectURL.searchParams.append('ref', params.ref);
	const projectRes = await fetch(projectURL, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!projectRes.ok) {
		console.error('Failed to fetch project:', projectRes);
		error(404, 'Failed to fetch project.');
	}

	const projectData = await projectRes.json();
	const project = projectDetail(projectData);
	if (project instanceof type.errors) {
		console.error('Project validation failed:', project.summary);
		error(404, 'Project validation failed.');
	}

	const projectSettingsURL = new URL('/v1/project/settings/by-ref', env.PUBLIC_BAAS_API_URL);
	projectSettingsURL.searchParams.append('ref', params.ref);
	const projectSettingsRes = await fetch(projectSettingsURL, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!projectSettingsRes.ok) {
		console.error('Failed to fetch project settings:', projectSettingsRes);
		error(404, 'Failed to fetch project settings.');
	}

	const projectSettingsData = await projectSettingsRes.json();
	const settings = projectSettings(projectSettingsData);
	if (settings instanceof type.errors) {
		console.error('Project settings validation failed:', settings.summary);
		error(404, 'Project settings validation failed.');
	}

	// TODO: Remove these server side caculated fields
	const databaseURL = `jdbc:postgresql://${project.reference}.${locals.externalURL.host}:5432/app`;
	const authDocsURL = `https://${project.reference}.${locals.externalURL.host}/api/auth/docs`;
	const passwordExpired = dayjs(project.passwordExpiredAt).isBefore(dayjs());

	return {
		project: project,
		settings: settings,
		databaseURL: databaseURL,
		authDocsURL: authDocsURL,
		passwordExpired: passwordExpired
	};
};
