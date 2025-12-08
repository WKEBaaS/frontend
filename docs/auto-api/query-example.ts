import { getRequestEvent, query } from '$app/server';
import * as v from 'valibot';
import * as api from '$lib/server';

export const getOrganizationInvitations = query(
	getOrgInvitationInput, // Input validation schema
	async (data) => {
		const event = getRequestEvent();
		const token = await api.auth.fetchToken(event);

		// Fetch and validate response against schema
		const invitations = await api.postgrest.get({
			endpoint: '/api/rest/get_organization_invitations', // Maps to api.get_organization_invitations()
			token: token,
			schema: v.array(organizationInvitationSchema),
			params: {
				p_org_class_id: data.org_class_id,
				status: data.status ? 'eq.' + data.status : undefined,
				type: data.type ? 'eq.' + data.type : undefined
			}
		});

		return invitations;
	}
);
