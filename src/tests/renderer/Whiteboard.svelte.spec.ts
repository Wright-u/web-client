import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MockElement from './__mocks__/MockElement.svelte';
import type { IEditorService } from '$lib/whiteboard/editor/interfaces/IEditorService';
import RenderElement from '$lib/whiteboard/renderer/RenderElement';
import ElementComponentFactory from '$lib/whiteboard/renderer/ElementComponentFactory.svelte';
import Whiteboard from '$lib/whiteboard/renderer/Whiteboard.svelte';

class TestElement extends RenderElement {
	readonly type = 'note';
	readonly flags = 0;

	constructor() {
		super({
			id: 'note-1',
			position: { x: 0, y: 0 },
			zIndex: 0
		});
	}
}

describe('Whiteboard', () => {
	it('fetches browser data and renders registered element components', async () => {
		const service: IEditorService = {
			getWhiteboardElements: vi.fn(() => [new TestElement()])
		};
		render(Whiteboard, {
			service,
			factory: new ElementComponentFactory({ note: MockElement })
		});

		await expect.element(page.getByTestId('whiteboard')).toBeInTheDocument();
		await expect.element(page.getByTestId('background-grid')).toBeInTheDocument();
		await expect
			.element(page.getByTestId('background-grid'))
			.toHaveStyle({ position: 'absolute' });
		await expect.element(page.getByTestId('mock-element')).toHaveTextContent('note-1:note');
		expect(service.getWhiteboardElements).toHaveBeenCalledOnce();
	});
});
