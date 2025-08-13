import { type } from 'arktype';

export const projectDetail = type({
	id: 'string',
	name: 'string',
	description: 'string | null',
	reference: 'string',
	createdAt: 'string',
	updatedAt: 'string',
	passwordExpiredAt: 'string | null',
	initializedAt: 'string | null'
});

export const projectStatus = type({
	message: 'string',
	step: 'number',
	totalStep: 'number'
});

export const authProviderSetting = type({
	enabled: 'boolean',
	'clientId?': '1 < string <= 100',
	'clientSecret?': '1 < string <= 100'
});

export const projectSettings = type({
	createdAt: 'string',
	id: 'string',
	trustedOrigins: 'string[] | null',
	updatedAt: 'string',
	'auth?': {
		email: authProviderSetting.optional(),
		google: authProviderSetting.optional(),
		github: authProviderSetting.optional(),
		discord: authProviderSetting.optional()
	}
});

export type ProjectDetail = typeof projectDetail.infer;
export type ProjectStatus = typeof projectStatus.infer;
