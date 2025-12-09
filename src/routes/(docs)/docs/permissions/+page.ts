import { type Edge, type Node, Position } from '@xyflow/svelte';
import type { PageLoad } from './$types';
import type { DatabaseSchemaColumn } from '$lib/components/database-schema/index.js';

const authUsersColumns: DatabaseSchemaColumn[] = [
	{
		name: 'id',
		type: 'uuid',
		primaryKey: true,
		foreignKey: true,
		default: 'uuidv7()',
		handles: [
			{ id: 'id_right', type: 'target', position: Position.Left },
			{ id: 'id_left', type: 'target', position: Position.Right }
		]
	},
	{ name: 'role', type: 'varchar(100)', default: "'authenticated'" },
	{ name: 'name', type: 'varchar(255)' },
	{ name: 'email', type: 'varchar(255)', unique: true },
	{ name: 'email_verified', type: 'boolean', default: 'false' },
	{ name: 'created_at', type: 'timestamptz', default: 'CURRENT_TIMESTAMP' },
	{ name: 'updated_at', type: 'timestamptz', default: 'CURRENT_TIMESTAMP' },
	{ name: 'deleted_at', type: 'timestamptz', nullable: true },
	{ name: 'image', type: 'text', nullable: true }
];

const authGroupsColumns: DatabaseSchemaColumn[] = [
	{
		name: 'id',
		type: 'uuid',
		primaryKey: true,
		default: 'uuidv7()',
		handles: [{ id: 'id_right', type: 'target', position: Position.Right }]
	},
	{ name: 'name', type: 'varchar(255)', unique: true },
	{ name: 'description', type: 'text', nullable: true },
	{ name: 'created_at', type: 'timestamptz', default: 'CURRENT_TIMESTAMP' },
	{ name: 'updated_at', type: 'timestamptz', default: 'CURRENT_TIMESTAMP' },
	{ name: 'deleted_at', type: 'timestamptz', nullable: true },
	{ name: 'is_enabled', type: 'boolean', default: 'true' },
	{ name: 'display_name', type: 'varchar(255)', default: "''" }
];

const dboPermissionsColumns: DatabaseSchemaColumn[] = [
	{
		name: 'class_id',
		type: 'varchar(21)',
		foreignKey: true,
		handles: [{ id: 'class_id_left', type: 'source', position: Position.Left }]
	},
	{ name: 'role_type', type: 'dbo.permission_role_type' },
	{
		name: 'role_id',
		type: 'uuid',
		default: 'auth.group.id|auth.user.id',
		handles: [
			{ id: 'role_id_left', type: 'source', position: Position.Left },
			{ id: 'role_id_right', type: 'source', position: Position.Right }
		]
	},
	{ name: 'permission_bits', type: 'smallint', default: '1' }
];

const dboPermissionEnumColumns: DatabaseSchemaColumn[] = [
	{
		name: 'id',
		type: 'uuid',
		primaryKey: true,
		default: 'uuidv7()'
	},
	{ name: 'name', type: 'text', unique: true },
	{ name: 'bit', type: 'smallint' }
];

const dboClassesColumns: DatabaseSchemaColumn[] = [
	{
		name: 'id',
		type: 'varchar(21)',
		primaryKey: true,
		unique: true,
		default: 'nanoid',
		handles: [
			{ id: 'id_right', type: 'target', position: Position.Right },
			{ id: 'id_left', type: 'target', position: Position.Left }
		]
	},
	{ name: 'entity_id', type: 'integer', foreignKey: true, default: 'ref entities' },
	{ name: 'chinese_name', type: 'varchar(256)' },
	{ name: 'chinese_desc', type: 'varchar(4000)' },
	{ name: 'english_name', type: 'varchar(256)' },
	{ name: 'english_desc', type: 'varchar(4000)' },
	{ name: 'id_path', type: 'varchar', unique: true },
	{ name: 'name_path', type: 'varchar', unique: true },
	{ name: 'created_at', type: 'timestamp', default: 'now()' },
	{ name: 'updated_at', type: 'timestamp', default: 'now()' },
	{ name: 'deleted_at', type: 'timestamp' },
	{ name: 'object_count', type: 'integer', default: '0' },
	{ name: 'class_rank', type: 'smallint', default: '0' },
	{ name: 'object_rank', type: 'smallint', default: '0' },
	{ name: 'hierarchy_level', type: 'smallint' },
	{ name: 'click_count', type: 'integer', default: '0' },
	{ name: 'keywords', type: 'text[]', default: "'{{}}'" },
	{
		name: 'owner_id',
		type: 'uuid',
		foreignKey: true,
		default: 'ref auth',
		handles: [{ id: 'owner_id_right', type: 'source', position: Position.Right }]
	},
	{ name: 'is_hidden', type: 'boolean', default: 'false' },
	{ name: 'is_child', type: 'boolean', default: 'false' }
];

export type Table = {
	name: string;
	columns: DatabaseSchemaColumn[];
};

type LoadResult = {
	nodes: Node[];
	edges: Edge[];
};

const tableNodes: Node<Table>[] = [
	{
		id: 'auth.groups',
		type: 'table',
		position: { x: 225, y: 250 },
		data: { name: 'auth.groups', columns: authGroupsColumns }
	},
	{
		id: 'auth.users',
		type: 'table',
		position: { x: -225, y: 250 },
		data: { name: 'auth.users', columns: authUsersColumns }
	},
	{
		id: 'dbo.classes',
		type: 'table',

		position: { x: -600, y: 0 },
		data: { name: 'dbo.classes', columns: dboClassesColumns }
	},
	{
		id: 'dbo.permissions',
		type: 'table',
		position: { x: 0, y: 0 },
		data: { name: 'dbo.permissions', columns: dboPermissionsColumns }
	},
	{
		id: 'dbo.permission_enum',
		type: 'table',
		position: { x: 100, y: -200 },
		data: { name: 'dbo.permission_enum', columns: dboPermissionEnumColumns }
	}
];

export const load: PageLoad<LoadResult> = async () => {
	return {
		nodes: [
			...tableNodes,
			{
				id: 'permission-enum-note',
				type: 'permission-note',
				position: { x: 380, y: -400 },
				data: {}
			}
		],
		edges: [
			{
				id: 'permission-class-id',
				source: 'dbo.permissions',
				target: 'dbo.classes',
				sourceHandle: 'class_id_left',
				targetHandle: 'id_right'
			},
			{
				id: 'permission-role-id-group',
				source: 'dbo.permissions',
				target: 'auth.groups',
				sourceHandle: 'role_id_right',
				targetHandle: 'id_right',
				label: 'role_type = group'
			},
			{
				id: 'permission-role-id-user',
				source: 'dbo.permissions',
				target: 'auth.users',
				sourceHandle: 'role_id_left',
				targetHandle: 'id_right',
				label: 'role_type = user'
			}
		]
	};
};
