import * as v from 'valibot';

export const deleteProjectSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.maxLength(100))
});

export type DeleteProjectSchema = v.InferInput<typeof deleteProjectSchema>;
