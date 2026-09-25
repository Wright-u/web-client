import type RenderElement from './RenderElement';

export default interface IRenderStore {
	load(): Promise<void>;
	add(element: RenderElement): void;
	add(elements: RenderElement[]): void;
	add(elements: RenderElement | RenderElement[]): void;
	readonly elements: RenderElement[];
}
