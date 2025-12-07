const transformPath = (path: string) => {
	return path.replace('/docs/', '');
};

type CodeResolver = () => Promise<{ default: string }>;

export async function getCodeRaw(name: string): Promise<string> {
	const modules = import.meta.glob('/docs/**/*', { query: 'raw' });
	const match = Object.entries(modules).find(([path]) => {
		return transformPath(path) === name;
	});

	if (!match) {
		throw new Error(`Document not found: ${name}`);
	}

	const [, resolver] = match as [string, CodeResolver];
	return (await resolver()).default as string;
}
