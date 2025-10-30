import * as v from 'valibot';

export const deleteProjectSchema = v.pipe(
	v.object({
		id: v.string(),
		expected: v.string(),
		name: v.pipe(v.string(), v.minLength(1), v.maxLength(100))
	}),
	v.forward(
		v.partialCheck(
			[['name'], ['expected']],
			(s) => s.name === s.expected,
			(s) => `type "${s.input.expected}" to confirm deletion`
		),
		['name']
	)
);

export const resetDatabasePasswordSchema = v.object({
	password: v.pipe(
		v.string(),
		v.minLength(8),
		v.maxLength(100),
		v.regex(/[A-Z]/, 'must be at least one uppercase letter')
		// v.regex(/[!@#$%^&*(),.?":{}|<>]/, 'must be at least one special character')
	)
});

export const updateProjectInfoSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
	description: v.pipe(v.string(), v.minLength(0), v.maxLength(4000))
});

export const updateAllowedOriginsSchema = v.object({
	allowedOrigins: v.pipe(v.array(v.pipe(v.string(), v.url())), v.minLength(1), v.maxLength(100))
});

export type DeleteProjectSchema = v.InferInput<typeof deleteProjectSchema>;
export type ResetDatabasePasswordSchema = v.InferInput<typeof resetDatabasePasswordSchema>;
export type UpdateProjectInfoSchema = v.InferInput<typeof updateProjectInfoSchema>;
export type UpdateAllowedOriginsSchema = v.InferInput<typeof updateAllowedOriginsSchema>;
