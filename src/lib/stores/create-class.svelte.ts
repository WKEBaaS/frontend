import type { CreateClassInput } from '$lib/schemas';

const INITIAL_CLASS_INPUT: CreateClassInput = {
	parent_class_id: '',
	entity_id: null,
	project_ref: '',
	chinese_name: '',
	chinese_description: null,
	english_name: null,
	english_description: null
};

export class CreateClassStore {
	in = $state(INITIAL_CLASS_INPUT);

	constructor(init: CreateClassInput | null = null) {
		if (!init) return;
		this.in = { ...this.in, ...init };
	}

	set(input: CreateClassInput) {
		this.in = { ...input };
	}

	reset() {
		this.in = { ...INITIAL_CLASS_INPUT };
	}

	value(): CreateClassInput {
		return this.in;
	}
}
