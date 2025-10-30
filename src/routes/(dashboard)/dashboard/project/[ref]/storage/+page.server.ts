import { env } from '$env/dynamic/private';
import { authClient } from '$lib/auth-client';
import * as v from 'valibot';
import { s3SettingSchema } from './schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { data, error } = await authClient.token({
		fetchOptions: {
			headers: event.request.headers
		}
	});
	if (error) {
		throw new Error('Failed to retrieve access token', { cause: error });
	}

	const { project } = await event.parent();

	const s3SettingsURL = new URL('/api/rest/rpc/get_project_s3_settings', env.PGREST_API_URL);
	s3SettingsURL.searchParams.append('p_project_id', project.id);
	const resp = await fetch(s3SettingsURL, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${data.token}`,
			'Content-Type': 'application/json'
		}
	});

	if (!resp.ok) {
		console.log('Failed to fetch S3 settings:', resp.status, resp.statusText);
		throw new Error('Failed to fetch S3 settings');
	}

	const s3Settings = await resp.json();
	const parsedSettings = await v.safeParseAsync(v.array(s3SettingSchema), s3Settings);

	if (!parsedSettings.success) {
		console.log('Failed to parse S3 settings:', parsedSettings.issues);
		throw new Error('Failed to parse S3 settings');
	}

	if (parsedSettings.output.length === 0) {
		throw new Error('No S3 settings found for this project');
	}

	const access_key_id = parsedSettings.output[0].access_key_id;
	const secret_access_key = parsedSettings.output[0].secret_access_key;
	const ref = `baas-${event.params.ref}`;

	return {
		bucketName: ref,
		accessKeyID: access_key_id,
		secretAccessKey: secret_access_key
	};
};
