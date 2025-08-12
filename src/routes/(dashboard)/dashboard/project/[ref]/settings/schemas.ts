import { type } from 'arktype';
import * as v from 'valibot';

export const deleteProjectSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.maxLength(100))
});

export const resetDatabasePasswordSchema = v.object({
	password: v.pipe(v.string(), v.minLength(8), v.maxLength(100))
});

export const authProviderSettingSchema = v.object({
	enabled: v.boolean(),
	clientId: v.pipe(v.string(), v.minLength(1)),
	clientSecret: v.pipe(v.string(), v.minLength(1))
});

export const authProviderSchema = type({
	enabled: 'boolean',
	clientId: '1 < string <= 100',
	clientSecret: '1 < string <= 100'
});

export const updateProjectSettingsSchema = type({
	name: '1 < string <= 100 | undefined',
	description: '0 <= string <= 4000 | undefined',
	auth: {
		emailAndPasswordEnabled: 'boolean',
		google: authProviderSchema.optional(),
		github: authProviderSchema.optional(),
		discord: authProviderSchema.optional(),
		trustedOrigins: 'string[] | undefined'
	}
});

export type DeleteProjectSchema = v.InferInput<typeof deleteProjectSchema>;
export type ResetDatabasePasswordSchema = v.InferInput<typeof resetDatabasePasswordSchema>;
export type UpdateProjectSettingsSchema = typeof updateProjectSettingsSchema.infer;
