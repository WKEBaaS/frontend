// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import('$lib/auth').Session;
			newProject?: import('$lib/project').ProjectReferenceSchema;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
