import type { PERMISSION_DEFINITIONS } from '.';

export type PermissionDefinition = (typeof PERMISSION_DEFINITIONS)[number];

export type PermissionOnChangeValue = {
	bits: number; // 新的總 Bitmask 數值
	type: PermissionDefinition; // 觸發變更的權限項目
	action: 'added' | 'removed'; // 動作類型
};
