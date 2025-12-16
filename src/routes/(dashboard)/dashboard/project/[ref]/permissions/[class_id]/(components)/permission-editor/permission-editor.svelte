<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import type { Permission } from '$lib/schemas';
	import { Trash2, User, Users } from '@lucide/svelte/icons';
	import { PERMISSION_DEFINITIONS } from '.';

	interface PermissionEditorProps {
		permission: Permission;
		editing: boolean;
		onRemove?: () => void;
	}

	const initPermission: Permission = {
		class_id: '',
		permission_bits: 0,
		role_type: 'USER',
		role_id: ''
	};

	function toggleBit(bit: number, checked: boolean) {
		if (checked) {
			permission.permission_bits |= bit;
		} else {
			permission.permission_bits &= ~bit;
		}
	}

	let {
		editing = $bindable(false),
		permission = $bindable(initPermission),
		onRemove = () => {}
	}: PermissionEditorProps = $props();
</script>

<Card.Root class="p-1">
	<Card.Content class="p-4">
		{#if editing}
			<div class="grid gap-6 md:grid-cols-[220px_1fr_auto]">
				<div class="space-y-4">
					<div class="space-y-2">
						<Label>類型</Label>
						<Select.Root type="single" bind:value={permission.role_type}>
							<Select.Trigger>
								{permission.role_type}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="USER">USER</Select.Item>
								<Select.Item value="GROUP">GROUP</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>

					<div class="space-y-2">
						<Label>角色 ID (UUID)</Label>
						<Input type="text" bind:value={permission.role_id} placeholder="UUID" class="font-mono text-xs" />
					</div>

					<div class="pt-2">
						<Badge variant="outline" class="w-full justify-center font-mono">
							Total Bits: {permission.permission_bits}
						</Badge>
					</div>
				</div>

				<div class="rounded-md border p-4">
					<Label class="mb-4 block text-base">權限設定</Label>
					<div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
						{#each PERMISSION_DEFINITIONS as def (def.bit)}
							<div class="flex flex-row items-start space-y-0 space-x-3">
								<Checkbox
									checked={(permission.permission_bits & def.bit) === def.bit}
									onCheckedChange={(checked) => toggleBit(def.bit, checked as boolean)}
								/>
								<div class="grid gap-1.5 leading-none">
									<Label
										class="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{def.label}
									</Label>
									<p class="text-muted-foreground font-mono text-[0.8rem]">
										{def.name} ({def.bit})
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="flex items-start">
					<Button size="icon" variant="ghost" onclick={onRemove} class="text-destructive hover:text-destructive">
						<Trash2 class="h-4 w-4" />
					</Button>
				</div>
			</div>
		{:else}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					{#if permission.role_type === 'USER'}
						<div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
							<User class="text-primary h-6 w-6" />
						</div>
					{:else}
						<div class="bg-secondary/50 flex h-12 w-12 items-center justify-center rounded-lg">
							<Users class="h-6 w-6" />
						</div>
					{/if}

					<div class="flex flex-col">
						<div class="flex items-center gap-2">
							<Badge variant={permission.role_type === 'USER' ? 'default' : 'secondary'} class="h-5 px-1.5 text-[10px]">
								{permission.role_type}
							</Badge>
							<h4 class="mb-1 text-lg leading-none font-semibold">
								{permission.role_name || '(未命名角色)'}
							</h4>
							<code class="text-muted-foreground font-mono text-xs">
								{permission.role_id}
							</code>
						</div>

						<div class="mt-2 flex flex-wrap gap-1">
							{#each PERMISSION_DEFINITIONS as def (def.bit)}
								{#if (permission.permission_bits & def.bit) === def.bit}
									<Badge variant="outline" class="text-xs">
										{def.label}
									</Badge>
								{/if}
							{/each}
							{#if permission.permission_bits === 0}
								<span class="text-muted-foreground text-sm">無權限</span>
							{/if}
						</div>
					</div>
				</div>

				<div class="pl-4 text-right">
					<Badge variant="secondary" class="font-mono">
						bits: {permission.permission_bits}
					</Badge>
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
