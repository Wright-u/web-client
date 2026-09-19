import type RenderElement from './RenderElement';

export const BACKGROUND_GRID_ID = 'whiteboard-background-grid';

export function createBackgroundGrid(): RenderElement {
	return {
		id: BACKGROUND_GRID_ID,
		type: 'background-grid',
		position: { x: 0, y: 0 },
		size: { width: 0, height: 0 },
		zIndex: -1,
		fixed: true
	};
}
