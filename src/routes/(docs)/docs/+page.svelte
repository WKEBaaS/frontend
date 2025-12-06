<script lang="ts">
	import * as Code from '$lib/components/ui/code/index.js';
	import { PMCommand } from '$lib/components/ui/pm-command/index.js';

	const code = `const sayHello = () => {
    console.log('Hello!');
}`;
</script>

<div class="w-full space-y-6 px-4">
	<h1>Documentation</h1>
	<p>This is the documentation page.</p>

	<PMCommand command="execute" args={['shadcn-svelte@next', 'add']} />
	<PMCommand command="add" args={['bits-ui', '-D']} />

	<Code.Root lang="typescript" class="w-full" {code} />
</div>
