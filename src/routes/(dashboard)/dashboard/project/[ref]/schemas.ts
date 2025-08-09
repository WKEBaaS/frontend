import * as v from 'valibot';

export const projectDetailSchema = v.object({
	id: v.string(),
	name: v.string(),
	description: v.nullish(v.string()),
	reference: v.string(),
	createdAt: v.string(),
	updatedAt: v.string(),
	passwordExpiredAt: v.nullish(v.string()),
	initializedAt: v.nullish(v.string())
});

export const projectStatusSchema = v.object({
	message: v.string(),
	step: v.number(),
	totalStep: v.number()
});

export type ProjectDetail = v.InferInput<typeof projectDetailSchema>;
export type ProjectStatus = v.InferInput<typeof projectStatusSchema>;
