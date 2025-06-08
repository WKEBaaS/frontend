import * as v from 'valibot';

export const projectSchema = v.object({
	name: v.string(),
	description: v.nullish(v.string()),
	reference: v.pipe(v.string(), v.length(20)),
	ownerID: v.string(),
	createdAt: v.string(),
	updatedAt: v.string()
});

export type Project = v.InferInput<typeof projectSchema>;
