import { BACKGROUND_GRID_ID, createBackgroundGrid } from '../elements/background/BackgroundGrid';
import type { IElementService } from './IElementService';
import type RenderElement from './RenderElement';

export class ElementStore {
	rawElements = $state<RenderElement[]>([createBackgroundGrid()]);

	constructor(private readonly service: IElementService) {}

	add(element: RenderElement): void;
	add(elements: RenderElement[]): void;
	add(elements: RenderElement | RenderElement[]): void {
		const additions = (Array.isArray(elements) ? elements : [elements]).filter(
			(element) => element.id !== BACKGROUND_GRID_ID
		);
		this.rawElements = [...this.rawElements, ...additions];
	}

	fetch(): RenderElement[] {
		this.rawElements = [
			createBackgroundGrid(),
			...this.service
				.getWhiteboardElements()
				.filter((element) => element.id !== BACKGROUND_GRID_ID)
		];
		return this.rawElements;
	}
}
