import { form, getRequestEvent } from '$app/server';
import * as api from '$lib/server';

export const inviteToOrganization = form(inviteToOrganizationSchema, async (data) => {
	const event = getRequestEvent();
	const token = await api.auth.fetchToken(event);

	await api.postgrest.post({
		endpoint: '/api/rest/invite_to_organization',
		token: token,
		data: data
	});

	return { success: true };
});
