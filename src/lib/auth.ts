import { env } from '$env/dynamic/private';
import { importJWK, jwtVerify } from 'jose';
import * as v from 'valibot'; // 1.24 kB

export const jwtCookieName = 'token';

const SessionSchema = v.object({
	sub: v.string(),
	iss: v.string(),
	iat: v.number(),
	exp: v.number(),
	displayName: v.string(),
	username: v.string(),
	email: v.nullable(v.pipe(v.string(), v.email()))
});
export type Session = v.InferInput<typeof SessionSchema> | null;

export const validateJwt = async (token: string): Promise<Session> => {
	try {
		const jwk = await JSON.parse(env.JWK_PRBLIC_KEY);
		const publicKey = await importJWK(jwk);
		const { payload } = await jwtVerify(token, publicKey, {});
		const session = v.parse(SessionSchema, payload);
		return session;
	} catch (error) {
		console.error('JWT validation failed:', error);
	}

	return null;
};
