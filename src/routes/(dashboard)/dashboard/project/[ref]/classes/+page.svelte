<script lang="ts">
	import { PermissionSelector } from '$lib/components/permission-selector/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input';
	import { UserClassTree } from '$lib/components/user-clas-tree';
	import { createClassFunc } from '$lib/remotes';

	let { data } = $props();
	let selectedName = $state('');
</script>

<div class="flex w-full flex-col p-2 font-mono">
	<form {...createClassFunc}>
		<Field.Group>
			<Field.Legend>Class Function API</Field.Legend>
			<Field.Set>
				<Field.Group>
					<div class="grid grid-cols-5 gap-4">
						<Field.Field class="col-span-4">
							<Field.Label for="function-name">Function Name</Field.Label>
							<Input id="function-name" {...createClassFunc.fields.name.as('text')} />
						</Field.Field>
						<Field.Field class="col-span-1">
							<Field.Label for="function-version">Version</Field.Label>
							<Input id="function-version" {...createClassFunc.fields.version.as('number')} />
						</Field.Field>
					</div>
					<Field.Field>
						<Field.Label for="function-description">Description</Field.Label>
						<Input class="h-32" id="function-description" {...createClassFunc.fields.description.as('text')} />
					</Field.Field>
					<Field.Field orientation="horizontal">
						{@const auth = createClassFunc.fields.authenticated.as('checkbox')}
						<Checkbox
							id="function-need-auth"
							name={auth.name}
							value={auth.value}
							checked={auth.checked}
							onCheckedChange={(v) => {
								createClassFunc.fields.authenticated.set(v);
							}}
						/>
						<Field.Label for="function-need-auth">Require Authentication</Field.Label>
					</Field.Field>
				</Field.Group>
				<Field.Separator />
				<Field.Set>
					<Field.Legend>API Root Class</Field.Legend>
					<Field.Description>Root class means all classes created by the API will under this class.</Field.Description>
					<Field.Field>
						<UserClassTree
							nodeClass={data.root}
							ref={data.project.reference}
							bind:selectedName
							onSelect={(c) => {
								createClassFunc.fields.root_node.class_id.set(c.id);
							}}
						/>
						{#if createClassFunc.fields.root_node.class_id.value()}
							<Card.Root>
								<Card.Content class="space-y-1">
									<div class="grid grid-cols-5">
										<Card.Description class="col-span-2">Permissions to be check</Card.Description>
										<Field.Field class="col-span-2" orientation="horizontal">
											{@const check = createClassFunc.fields.root_node.check_permission.as('checkbox')}
											<Checkbox
												id="check-permissions"
												name={check.name}
												value={check.value}
												checked={check.checked}
												onCheckedChange={(v) => {
													createClassFunc.fields.root_node.check_permission.set(v);
												}}
											/>
											<Field.Label for="check-permissions">Check Permissions</Field.Label>
										</Field.Field>
										<span class="col-span-1 text-sm italic"
											>Bits {createClassFunc.fields.root_node.check_bits.value() ?? 0}</span
										>
									</div>
								</Card.Content>
								<Card.Content>
									<PermissionSelector
										onChange={(v) => {
											createClassFunc.fields.root_node.check_bits.set(v.bits);
										}}
									/>
								</Card.Content>
							</Card.Root>
						{/if}
					</Field.Field>
				</Field.Set>
			</Field.Set>
		</Field.Group>
	</form>
</div>
