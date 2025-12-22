<script lang="ts">
	import type { OnChangeFn } from '$lib/types';
	import { Checkbox } from '../ui/checkbox';
	import { Label } from '../ui/label';
	import { PERMISSION_DEFINITIONS } from '.';
	import type { PermissionOnChangeValue } from './types';

	interface PermissionSelectorProps {
		bits?: number;
		onChange?: OnChangeFn<PermissionOnChangeValue>;
	}

	let { bits = $bindable(0), onChange }: PermissionSelectorProps = $props();

	const hasPermission = (bit: number) => {
		return (bits & bit) === bit;
	};
	const toggleBit = (bit: number, checked: boolean) => {
		if (checked) {
			bits |= bit;
		} else {
			bits &= ~bit;
		}
	};
</script>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
	{#each PERMISSION_DEFINITIONS as def (def.name)}
		<div class="flex items-center space-x-2">
			<Checkbox
				id={def.name}
				checked={hasPermission(def.bit)}
				onCheckedChange={(checked) => {
					toggleBit(def.bit, checked);
					onChange?.({ bits, type: def, action: checked ? 'added' : 'removed' });
				}}
			/>
			<Label for={def.name} class="cursor-pointer">
				{def.label}
			</Label>
		</div>
	{/each}
</div>
