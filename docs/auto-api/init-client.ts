import { env } from '$env/dynamic/private';
import { PostgrestClient } from '@wke-baas/postgrest-client';

export const postgrestClient = new PostgrestClient(env.BAAS_API_URL);
