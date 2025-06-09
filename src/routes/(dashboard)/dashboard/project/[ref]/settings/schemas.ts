import * as v from 'valibot';

export const deleteProjectSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.maxLength(100))
});

export const resetDatabasePasswordSchema = v.object({
	password: v.pipe(v.string(), v.minLength(8), v.maxLength(100))
});

export type DeleteProjectSchema = v.InferInput<typeof deleteProjectSchema>;
export type ResetDatabasePasswordSchema = v.InferInput<typeof resetDatabasePasswordSchema>;
