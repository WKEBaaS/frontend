// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			newProject?: import('$lib/project').ProjectReferenceSchema;
			externalURL: URL;
			session?: import('better-auth').Session;
			user?: import('better-auth').User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
