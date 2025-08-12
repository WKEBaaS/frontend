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

export const oauthProviderSetting = type({
	enabled: 'boolean',
	clientId: '1 < string <= 100',
	clientSecret: '1 < string <= 100'
});

export const projectSettings = type({
	createdAt: 'string',
	id: 'string',
	trustedOrigins: 'string[] | null',
	updatedAt: 'string',
	'auth?': {
		emailAndPasswordEnabled: 'boolean',
		google: oauthProviderSetting.optional(),
		github: oauthProviderSetting.optional(),
		discord: oauthProviderSetting.optional()
	}
});

export type ProjectDetail = typeof projectDetail.infer;
export type ProjectStatus = typeof projectStatus.infer;
