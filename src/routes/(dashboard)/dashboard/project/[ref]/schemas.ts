import * as v from 'valibot';

export const projectDetailSchema = v.object({
	id: v.string(),
	name: v.string(),
	description: v.nullable(v.string()),
	reference: v.string(),
	createdAt: v.string(),
	updatedAt: v.string(),
	passwordExpiredAt: v.nullable(v.string()),
	initializedAt: v.nullable(v.string())
});

export const projectStatusSchema = v.object({
	message: v.string(),
	step: v.number(),
	totalStep: v.number()
});

export const authProviderSchema = v.object({
	enabled: v.boolean(),
	clientId: v.optional(v.pipe(v.string(), v.maxLength(100))),
	clientSecret: v.optional(v.pipe(v.string(), v.maxLength(100)))
});

export const authProviderSettingSchema = v.object({
	enabled: v.boolean(),
	clientId: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(100))),
	clientSecret: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(100)))
});

export const projectSettings = v.object({
	createdAt: v.string(),
	id: v.string(),
	trustedOrigins: v.nullable(v.array(v.string())),
	updatedAt: v.string(),
	auth: v.optional(
		v.object({
			email: v.optional(authProviderSettingSchema),
			google: v.optional(authProviderSettingSchema),
			github: v.optional(authProviderSettingSchema),
			discord: v.optional(authProviderSettingSchema)
		})
	)
});

export type ProjectDetail = v.InferOutput<typeof projectDetailSchema>;
export type ProjectStatus = v.InferOutput<typeof projectStatusSchema>;
