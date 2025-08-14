import { type } from 'arktype';
import * as v from 'valibot';

export const deleteProjectSchema = type({
	expected: 'string',
	name: '1 <= string <= 100'
}).narrow((s, ctx) => {
	if (s.expected === s.name) return true;

	return ctx.reject({
		expected: `"${s.expected}" to confirm deletion.`,
		actual: s.name,
		path: ['name']
	});
});

export const resetDatabasePasswordSchema = v.object({
	password: v.pipe(
		v.string(),
		v.minLength(8),
		v.maxLength(100),
		v.regex(/[A-Z]/, 'must be at least one uppercase letter'),
		v.regex(/[!@#$%^&*(),.?":{}|<>]/, 'must be at least one special character')
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

export type DeleteProjectSchema = typeof deleteProjectSchema.infer;
export type ResetDatabasePasswordSchema = v.InferInput<typeof resetDatabasePasswordSchema>;
export type UpdateProjectInfoSchema = typeof updateProjectInfoSchema.infer;
