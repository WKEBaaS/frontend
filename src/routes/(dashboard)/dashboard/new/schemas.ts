import * as v from 'valibot';

export const createProjectSchema = v.object({
	name: v.pipe(v.string(), v.minLength(4), v.maxLength(100)),
	description: v.pipe(v.string(), v.minLength(4), v.maxLength(4000))
});

export const createProjectResponseSchema = v.object({
	id: v.pipe(v.string(), v.uuid()),
	reference: v.pipe(v.string(), v.length(20)),
	message: v.string()
});

export type CreateProjectSchema = v.InferInput<typeof createProjectSchema>;
