import { ElementStore } from '$lib/whiteboard/renderer/ElementStore.svelte';
import { BACKGROUND_GRID_ID } from '$lib/whiteboard/renderer/BackgroundGrid';
import type { IElementService } from '$lib/whiteboard/renderer/IElementService';
import type RenderElement from '$lib/whiteboard/renderer/RenderElement';
import { describe, expect, it, vi } from 'vitest';

const element: RenderElement = {
	id: 'element-1',
	type: 'note',
	position: { x: 0, y: 0 },
	size: { width: 100, height: 50 },
	zIndex: 0
};

describe('ElementStore', () => {
	it('keeps the fixed background grid while fetching and adding elements', () => {
		const fromService = { ...element, id: 'from-service' };
		const service: IElementService = { getWhiteboardElements: vi.fn(() => [fromService]) };
		const store = new ElementStore(service);

		expect(store.rawElements).toMatchObject([{ id: BACKGROUND_GRID_ID, fixed: true }]);
		expect(store.fetch()).toEqual([
			expect.objectContaining({ id: BACKGROUND_GRID_ID, fixed: true }),
			fromService
		]);
		store.add(element);
		store.add([{ ...element, id: 'second' }]);
		store.add({ ...element, id: BACKGROUND_GRID_ID, type: 'note' });

		expect(service.getWhiteboardElements).toHaveBeenCalledOnce();
		expect(store.rawElements.map(({ id }) => id)).toEqual([
			BACKGROUND_GRID_ID,
			'from-service',
			'element-1',
			'second'
		]);
	});
});
