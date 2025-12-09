import { Position } from '@xyflow/svelte';
export interface DatabaseSchemaColumn {
	name: string;
	type: string;
	nullable?: boolean;
	default?: string;
	primaryKey?: boolean;
	unique?: boolean;
	foreignKey?: boolean;
	handles?: {
		id: string;
		position: Position;
		type: 'source' | 'target';
	}[];
}
