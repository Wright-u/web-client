import { BACKGROUND_GRID_ID, createBackgroundGrid } from '../elements/background/BackgroundGrid';
import type { IEditorService } from '../editor/interfaces/IEditorService';
import type RenderElement from './RenderElement';
import type IRenderStore from './IRenderStore';

export class ElementStore implements IRenderStore {
	rawElements = $state<RenderElement[]>([createBackgroundGrid()]);

	constructor(private readonly service: IEditorService) {}

	add(element: RenderElement): void;
	add(elements: RenderElement[]): void;
	add(elements: RenderElement | RenderElement[]): void {
		const additions = (Array.isArray(elements) ? elements : [elements]).filter(
			(element) => element.id !== BACKGROUND_GRID_ID
		);
		this.rawElements = [...this.rawElements, ...additions];
	}

	async load(): Promise<void> {
		const fetched = await this.service.getWhiteboardElements();

		this.rawElements = [
			createBackgroundGrid(),
			...fetched
				.filter((element) => element.id !== BACKGROUND_GRID_ID)
		];
	}

	get elements(): RenderElement[] {
		return this.rawElements;
	}
}
