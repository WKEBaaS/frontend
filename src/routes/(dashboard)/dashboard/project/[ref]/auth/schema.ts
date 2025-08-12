import { type } from 'arktype';

export const updateEmailAndPasswordSchema = type({
	emailAndPasswordEnabled: 'boolean'
});

export type UpdateEmailAndPassword = typeof updateEmailAndPasswordSchema.infer;
