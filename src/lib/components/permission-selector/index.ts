import PermissionSelector from './permission-selector.svelte';
export { PermissionSelector };

export const PERMISSION_DEFINITIONS = [
	{ name: 'read-class', label: '讀取Class', bit: 1 },
	{ name: 'read-object', label: '讀取物件', bit: 2 },
	{ name: 'insert', label: '新增', bit: 4 },
	{ name: 'delete', label: '刪除', bit: 8 },
	{ name: 'update', label: '更新', bit: 16 },
	{ name: 'modify', label: '修改', bit: 32 },
	{ name: 'subscribe', label: '訂閱', bit: 64 }
] as const;
