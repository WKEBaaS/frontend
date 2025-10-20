import * as v from 'valibot';

export const s3SettingSchema = v.object({
	id: v.pipe(v.string(), v.uuid()),
	project_id: v.pipe(v.string(), v.uuid()),
	access_key_id: v.string(),
	secret_access_key: v.string(),
	bucket: v.string(),
	created_at: v.pipe(v.string(), v.isoTimestamp()),
	updated_at: v.pipe(v.string(), v.isoTimestamp())
});

export type S3Setting = v.InferInput<typeof s3SettingSchema>;
