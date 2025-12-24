import * as v from 'valibot';

export const createClassSchema = v.object({
	project_ref: v.string(),
	parent_class_id: v.string(),
	entity_id: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
	chinese_name: v.string(),
	chinese_description: v.optional(v.nullable(v.string())),
	english_name: v.optional(v.nullable(v.string())),
	english_description: v.optional(v.nullable(v.string()))
});

export const deleteClassSchema = v.object({
	class_id: v.string(),
	project_ref: v.string(),
	recursive: v.boolean()
});

export type CreateClassInput = v.InferInput<typeof createClassSchema>;
export type DeleteClassInput = v.InferInput<typeof deleteClassSchema>;
