import * as v from 'valibot';

export const projectDetailSchema = v.object({
	id: v.string(),
	name: v.string(),
	description: v.nullish(v.string()),
	reference: v.string(),
	createdAt: v.string(),
	updatedAt: v.string()
});

export type ProjectDetail = v.InferInput<typeof projectDetailSchema>;
