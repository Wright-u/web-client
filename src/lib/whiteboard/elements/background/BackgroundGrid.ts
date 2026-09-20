import RenderElement from '$lib/whiteboard/renderer/RenderElement';
import { RenderFlags } from '$lib/whiteboard/renderer/RenderFlags';

export const BACKGROUND_GRID_ID = 'whiteboard-background-grid';

class BackgroundGridElement extends RenderElement {
	readonly type = 'background-grid';
	readonly flags = RenderFlags.FIXED;

	constructor() {
		super({
			id: BACKGROUND_GRID_ID,
			position: { x: 0, y: 0 },
			zIndex: -1
		});
	}
}

export function createBackgroundGrid(): RenderElement {
	return new BackgroundGridElement();
}
