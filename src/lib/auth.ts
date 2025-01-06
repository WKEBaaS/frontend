import { env } from '$env/dynamic/private';
import { importSPKI, jwtVerify } from 'jose';
import * as v from 'valibot'; // 1.24 kB

export const jwtCookieName = 'token';

const SessionSchema = v.object({
	sub: v.string(),
	iss: v.string(),
	iat: v.number(),
	exp: v.number(),
	name: v.string(),
	email: v.pipe(v.string(), v.email())
});
export type Session = v.InferInput<typeof SessionSchema> | null;

export const validateJwt = async (token: string): Promise<Session> => {
	try {
		const publicKey = await importSPKI(env.AUTH_PUBLIC_KEY, 'RS256');
		const { payload } = await jwtVerify(token, publicKey, {});
		const session = v.parse(SessionSchema, payload);
		return session;
	} catch (error) {
		console.error('JWT validation failed:', error);
	}

	return null;
};
