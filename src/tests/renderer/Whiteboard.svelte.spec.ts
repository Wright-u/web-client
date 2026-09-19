import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MockElement from './__mocks__/MockElement.svelte';
import type { IElementService } from '$lib/whiteboard/renderer/IElementService';
import { RenderPipeline, type RenderStage } from '$lib/whiteboard/renderer/RenderPipeline';
import ElementComponentFactory from '$lib/whiteboard/renderer/ElementComponentFactory.svelte';
import Whiteboard from '$lib/whiteboard/renderer/Whiteboard.svelte';

describe('Whiteboard', () => {
	it('fetches browser data, applies the pipeline, and renders registered element components', async () => {
		const service: IElementService = {
			getWhiteboardElements: vi.fn(() => [
				{
					id: 'note-1',
					type: 'note',
					position: { x: 0, y: 0 },
					size: { width: 100, height: 50 },
					zIndex: 0
				}
			])
		};
		const stage: RenderStage = {
			name: () => 'label',
			transform: (element) => ({ ...element, type: 'mock' })
		};

		render(Whiteboard, {
			service,
			pipeline: new RenderPipeline([stage]),
			factory: new ElementComponentFactory({ mock: MockElement })
		});

		await expect.element(page.getByTestId('whiteboard')).toBeInTheDocument();
		await expect.element(page.getByTestId('background-grid')).toBeInTheDocument();
		await expect
			.element(page.getByTestId('background-grid'))
			.toHaveStyle({ position: 'fixed' });
		await expect.element(page.getByTestId('mock-element')).toHaveTextContent('note-1:mock');
		expect(service.getWhiteboardElements).toHaveBeenCalledOnce();
	});
});
