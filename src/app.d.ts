// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import('$lib/auth').Session;
			accessToken?: string;
			newProject?: import('$lib/project').ProjectReferenceSchema;
			home: URL;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
