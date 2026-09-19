import { describe, expect, it, vi } from 'vitest';
import type RenderElement from '$lib/whiteboard/renderer/RenderElement';
import { RenderPipeline, type RenderStage } from '$lib/whiteboard/renderer/RenderPipeline';

const element: RenderElement = {
	id: 'element-1',
	type: 'note',
	position: { x: 10, y: 20 },
	size: { width: 100, height: 50 },
	zIndex: 1
};

describe('RenderPipeline', () => {
	it('runs stages in order and passes each result to the next stage', () => {
		const move: RenderStage = {
			name: () => 'move',
			transform: vi.fn((current) => ({
				...current,
				position: { x: current.position.x + 5, y: 20 }
			}))
		};
		const resize: RenderStage = {
			name: () => 'resize',
			transform: vi.fn((current) => ({
				...current,
				size: { width: current.size.width * 2, height: 50 }
			}))
		};

		const result = new RenderPipeline([move, resize]).run(element);

		expect(result).toMatchObject({
			position: { x: 15, y: 20 },
			size: { width: 200, height: 50 }
		});
		expect(resize.transform).toHaveBeenCalledWith(
			expect.objectContaining({ position: { x: 15, y: 20 } })
		);
	});

	it('does not run a stage named in an element exemption list', () => {
		const transform = vi.fn((current: RenderElement) => current);
		const exemptElement = {
			...element,
			exemptFrom: ['locked']
		};
		const result = new RenderPipeline([{ name: () => 'locked', transform }]).run(exemptElement);

		expect(transform).not.toHaveBeenCalled();
		expect(result).toBe(exemptElement);
	});

	it('does not transform fixed elements', () => {
		const transform = vi.fn((current: RenderElement) => current);
		const fixedElement = { ...element, fixed: true };

		expect(new RenderPipeline([{ name: () => 'move', transform }]).run(fixedElement)).toBe(
			fixedElement
		);
		expect(transform).not.toHaveBeenCalled();
	});
});
