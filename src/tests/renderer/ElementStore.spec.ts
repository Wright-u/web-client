import { BACKGROUND_GRID_ID } from '$lib/whiteboard/elements/background/BackgroundGrid';
import { ElementStore } from '$lib/whiteboard/renderer/ElementStore.svelte';
import type { IElementService } from '$lib/whiteboard/renderer/IElementService';
import RenderElement from '$lib/whiteboard/renderer/RenderElement';
import { RenderFlags } from '$lib/whiteboard/renderer/RenderFlags';
import { describe, expect, it, vi } from 'vitest';

class TestElement extends RenderElement {
	readonly type = 'note';
	readonly flags = 0;

	constructor(id: string) {
		super({
			id,
			position: { x: 0, y: 0 },
			zIndex: 0
		});
	}
}

describe('ElementStore', () => {
	it('keeps the fixed background grid while fetching and adding elements', () => {
		const element = new TestElement('element-1');
		const fromService = new TestElement('from-service');
		const service: IElementService = { getWhiteboardElements: vi.fn(() => [fromService]) };
		const store = new ElementStore(service);

		expect(store.rawElements).toMatchObject([
			{ id: BACKGROUND_GRID_ID, flags: RenderFlags.FIXED }
		]);
		expect(store.fetch()).toEqual([
			expect.objectContaining({ id: BACKGROUND_GRID_ID, flags: RenderFlags.FIXED }),
			fromService
		]);
		store.add(element);
		store.add([new TestElement('second')]);
		store.add(new TestElement(BACKGROUND_GRID_ID));

		expect(service.getWhiteboardElements).toHaveBeenCalledOnce();
		expect(store.rawElements.map(({ id }) => id)).toEqual([
			BACKGROUND_GRID_ID,
			'from-service',
			'element-1',
			'second'
		]);
	});
});
