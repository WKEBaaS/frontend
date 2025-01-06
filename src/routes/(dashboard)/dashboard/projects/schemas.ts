import * as v from 'valibot';

export const projectSchema = v.object({
	name: v.string(),
	description: v.string(),
	reference: v.pipe(v.string(), v.length(20)),
	createdAt: v.string()
});

export type Project = v.InferInput<typeof projectSchema>;
