import * as v from 'valibot';

export const createProjectSchema = v.object({
	name: v.pipe(v.string(), v.minLength(4), v.maxLength(100)),
	description: v.pipe(v.string(), v.minLength(4), v.maxLength(4000))
});

export const createProjectResponseSchema = v.object({
	id: v.string(),
	reference: v.string()
});

export const projectSchema = v.object({
	name: v.string(),
	description: v.nullable(v.string()),
	reference: v.string(),
	ownerID: v.string(),
	createdAt: v.string(),
	updatedAt: v.string()
});

export const projectListSchema = v.array(projectSchema);

export type CreateProjectInput = v.InferInput<typeof createProjectSchema>;
export type Project = v.InferOutput<typeof projectSchema>;
export type ProjectList = v.InferOutput<typeof projectListSchema>;
