import { type } from 'arktype';
import * as v from 'valibot';

export const deleteProjectSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.maxLength(100))
});

export const resetDatabasePasswordSchema = v.object({
	password: v.pipe(
		v.string(),
		v.minLength(8),
		v.maxLength(100),
		v.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
	)
});

export const authProviderSchema = type({
	enabled: 'boolean',
	clientId: '1 <= string <= 100',
	clientSecret: '1 <= string <= 100'
});

export const updateProjectInfoSchema = type({
	name: '1 <= string <= 100 | undefined',
	description: '0 <= string <= 4000 | undefined'
});

export type DeleteProjectSchema = v.InferInput<typeof deleteProjectSchema>;
export type ResetDatabasePasswordSchema = v.InferInput<typeof resetDatabasePasswordSchema>;
// export type ResetDatabasePasswordSchema = typeof resetDatabasePasswordSchema.infer;
export type UpdateProjectInfoSchema = typeof updateProjectInfoSchema.infer;
