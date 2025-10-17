import * as v from 'valibot';

export const authProviderSchema = v.object({
	enabled: v.boolean(),
	clientId: v.optional(v.pipe(v.string(), v.maxLength(100))),
	clientSecret: v.optional(v.pipe(v.string(), v.maxLength(100)))
});

export const updateAuthProviderType = ['email', 'google', 'github', 'discord'] as const;
export const updateAuthProviderSchema = v.pipe(
	v.object({
		type: v.optional(v.picklist(updateAuthProviderType)),
		emailEnabled: v.boolean(),
		googleEnabled: v.boolean(),
		googleClientId: v.optional(v.pipe(v.string(), v.maxLength(100))),
		googleClientSecret: v.optional(v.pipe(v.string(), v.maxLength(100))),
		githubEnabled: v.boolean(),
		githubClientId: v.optional(v.pipe(v.string(), v.maxLength(100))),
		githubClientSecret: v.optional(v.pipe(v.string(), v.maxLength(100))),
		discordEnabled: v.boolean(),
		discordClientId: v.optional(v.pipe(v.string(), v.maxLength(100))),
		discordClientSecret: v.optional(v.pipe(v.string(), v.maxLength(100)))
	}),
	v.forward(
		v.partialCheck(
			[['googleEnabled'], ['googleClientId']],
			(s) => !s.googleEnabled || !!s.googleClientId,
			'must be provided if Google authentication is enabled.'
		),
		['googleClientId']
	),
	v.forward(
		v.partialCheck(
			[['googleEnabled'], ['googleClientSecret']],
			(s) => !s.googleEnabled || !!s.googleClientSecret,
			'must be provided if Google authentication is enabled.'
		),
		['googleClientSecret']
	),
	v.forward(
		v.partialCheck(
			[['githubEnabled'], ['githubClientId']],
			(s) => !s.githubEnabled || !!s.githubClientId,
			'must be provided if GitHub authentication is enabled.'
		),
		['githubClientId']
	),
	v.forward(
		v.partialCheck(
			[['githubEnabled'], ['githubClientSecret']],
			(s) => !s.githubEnabled || !!s.githubClientSecret,
			'must be provided if GitHub authentication is enabled.'
		),
		['githubClientSecret']
	),
	v.forward(
		v.partialCheck(
			[['discordEnabled'], ['discordClientId']],
			(s) => !s.discordEnabled || !!s.discordClientId,
			'must be provided if Discord authentication is enabled.'
		),
		['discordClientId']
	),
	v.forward(
		v.partialCheck(
			[['discordEnabled'], ['discordClientSecret']],
			(s) => !s.discordEnabled || !!s.discordClientSecret,
			'must be provided if Discord authentication is enabled.'
		),
		['discordClientSecret']
	)
);

export const updateProxyURLSchema = v.object({
	id: v.pipe(v.string(), v.uuid()),
	proxyURL: v.optional(v.pipe(v.string(), v.url(), v.maxLength(200)))
});

export type UpdateAuthProviderType = (typeof updateAuthProviderType)[number];
export type UpdateAuthProvider = v.InferInput<typeof updateAuthProviderSchema>;
export type AuthProvider = v.InferInput<typeof authProviderSchema>;
export type UpdateProxyURL = v.InferInput<typeof updateProxyURLSchema>;
