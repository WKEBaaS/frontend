import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import type { LayoutServerLoad } from './$types';
import { projectDetailSchema, projectSettings } from './schemas';
import * as v from 'valibot';

export const load: LayoutServerLoad = async ({ locals, fetch, params, url }) => {
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
	const project = await v.safeParseAsync(projectDetailSchema, projectData).catch((err) => {
		console.error('Project validation failed:', err);
		return error(500, 'Project validation failed.');
	});
	if (!project.success) {
		console.error('Project validation failed:', project.issues);
		error(500, 'Project validation failed.');
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
	const settings = await v.safeParseAsync(projectSettings, projectSettingsData);
	if (!settings.success) {
		console.error('Project settings validation failed:', settings.issues);
		error(500, 'Project settings validation failed.');
	}

	// TODO: Remove these server side caculated fields
	const passwordExpired = dayjs(project.output.passwordExpiredAt).isBefore(dayjs());
	const externalURL = new URL(env.PUBLIC_EXTERNAL_URL ?? url);

	return {
		project: project.output,
		settings: settings.output,
		databaseURL: `jdbc:postgresql://${project.output.reference}.${externalURL.host}:5432/app`,
		projectURL: `https://${project.output.reference}.${externalURL.host}`,
		passwordExpired: passwordExpired
	};
};
