import { type } from 'arktype';

export const authProvider = type({
	enabled: 'boolean',
	'clientId?': 'string <= 100',
	'clientSecret?': 'string <= 100'
});

export const updateAuthProviderSchema = type({
	type: type.enumerated('email', 'google', 'github', 'discord').optional(),
	emailEnabled: 'boolean',
	googleEnabled: 'boolean',
	googleClientId: 'string <= 100 | undefined',
	googleClientSecret: 'string <= 100 | undefined',
	githubEnabled: 'boolean',
	githubClientId: 'string <= 100 | undefined',
	githubClientSecret: 'string <= 100 | undefined',
	discordEnabled: 'boolean',
	discordClientId: 'string <= 100 | undefined',
	discordClientSecret: 'string <= 100 | undefined'
}).narrow((s, ctx) => {
	if (s.googleEnabled && (!s.googleClientId || !s.googleClientSecret)) {
		return ctx.mustBe('googleClientId and googleClientSecret must be provided if Google authentication is enabled');
	}
	if (s.githubEnabled && (!s.githubClientId || !s.githubClientSecret)) {
		return ctx.mustBe('githubClientId and githubClientSecret must be provided if GitHub authentication is enabled');
	}
	if (s.discordEnabled && (!s.discordClientId || !s.discordClientSecret)) {
		return ctx.mustBe('discordClientId and discordClientSecret must be provided if Discord authentication is enabled');
	}
	return true;
});

export type UpdateAuthProvider = typeof updateAuthProviderSchema.infer;
export type AuthProvider = typeof authProvider.infer;
