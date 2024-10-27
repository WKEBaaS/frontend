type Project = {
	id: number;
	name: string;
	description: string;
	createdAt: Date;
};

/** @type {import('./$types').PageLoad} */
export function load({ params: _ }) {
	const projects: Project[] = Array.from({ length: 10 }, (_, i) => ({
		id: i,
		name: `Project ${i + 1}`,
		description: `This is a description for project ${i + 1}.`,
		// random data after 2023, before 2024
		createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 31)),
	}));
	return {
		projects,
	};
}
