<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import type { Permission } from '$lib/schemas';
	import { Plus, Save, Shield, Trash2, User, Users } from '@lucide/svelte';
	import { SvelteMap } from 'svelte/reactivity';

	// 1. 定義權限常數
	const PERMISSION_DEFINITIONS = [
		{ name: 'read-class', label: '讀取類別', bit: 1 },
		{ name: 'read-object', label: '讀取物件', bit: 2 },
		{ name: 'insert', label: '新增', bit: 4 },
		{ name: 'delete', label: '刪除', bit: 8 },
		{ name: 'update', label: '更新', bit: 16 },
		{ name: 'modify', label: '修改', bit: 32 },
		{ name: 'subscribe', label: '訂閱', bit: 64 }
	] as const;

	let { data } = $props();
	const permissionsMap = $derived(new SvelteMap(data.permissions.map((p) => [p.role_id, p])));

	let pendingPermissions = $state<Permission[]>([
		{
			class_id: 'a',
			role_type: 'USER',
			role_id: 'user-1234',
			permission_bits: 3
		}
	]);

	let isEditing = $state(false);
	let isSaving = $state(false);

	function addPermission() {
		pendingPermissions.push({
			class_id: data.classData.id,
			role_type: 'USER',
			role_id: '',
			role_name: '',
			permission_bits: 0
		});
	}

	function removePermission(index: number) {
		pendingPermissions = pendingPermissions.filter((_, i) => i !== index);
	}

	// async function savePermissions() {
	//   isSaving = true;
	//   try {
	//     await new Promise(resolve => setTimeout(resolve, 1000));
	//     isEditing = false;
	//   } finally {
	//     isSaving = false;
	//   }
	// }

	function toggleBit(permissionIndex: number, bit: number, checked: boolean) {
		if (checked) {
			pendingPermissions[permissionIndex].permission_bits |= bit;
		} else {
			pendingPermissions[permissionIndex].permission_bits &= ~bit;
		}
	}
</script>

<div class="container mx-auto max-w-5xl space-y-6 p-6">
	<div class="flex items-center justify-between">
		<div class="space-y-1">
			<div class="flex items-center gap-3">
				<Shield class="text-muted-foreground h-8 w-8" />
				<div>
					<h1 class="text-3xl font-bold tracking-tight">權限管理</h1>
					<p class="text-muted-foreground text-sm">
						{data.classData.chinese_name || data.classData.english_name || data.classData.id}
					</p>
				</div>
			</div>
		</div>

		{#if !isEditing}
			<Button onclick={() => (isEditing = true)}>編輯權限</Button>
		{:else}
			<div class="flex gap-2">
				<Button variant="outline" onclick={() => (isEditing = false)}>取消</Button>
				<Button disabled={isSaving}>
					<Save class="mr-2 h-4 w-4" />
					{isSaving ? '儲存中...' : '儲存'}
				</Button>
			</div>
		{/if}
	</div>

	<Separator />

	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-semibold">權限列表</h2>
			{#if isEditing}
				<Button size="sm" variant="outline" onclick={addPermission}>
					<Plus class="mr-2 h-4 w-4" />
					新增權限
				</Button>
			{/if}
		</div>

		{#if permissionsMap.size === 0}
			<Card.Card>
				<Card.Content class="flex flex-col items-center justify-center py-12">
					<Shield class="text-muted-foreground/50 mb-4 h-12 w-12" />
					<p class="text-muted-foreground">尚未設定權限</p>
					{#if isEditing}
						<Button class="mt-4" variant="outline" onclick={addPermission}>
							<Plus class="mr-2 h-4 w-4" />
							新增第一個權限
						</Button>
					{/if}
				</Card.Content>
			</Card.Card>
		{:else}
			<div class="space-y-3">
				{#each permissionsMap.values() as permission, i (permission.role_id)}
					<Card.Card>
						<Card.Content class="p-4">
							{#if isEditing}
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
														id={`perm-${i}-${def.name}`}
														checked={(permission.permission_bits & def.bit) === def.bit}
														onCheckedChange={(checked) => toggleBit(i, def.bit, checked as boolean)}
													/>
													<div class="grid gap-1.5 leading-none">
														<Label
															for={`perm-${i}-${def.name}`}
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
										<Button
											size="icon"
											variant="ghost"
											onclick={() => removePermission(i)}
											class="text-destructive hover:text-destructive"
										>
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
												<Badge
													variant={permission.role_type === 'USER' ? 'default' : 'secondary'}
													class="h-5 px-1.5 text-[10px]"
												>
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
					</Card.Card>
				{/each}
			</div>
		{/if}
	</div>
</div>
