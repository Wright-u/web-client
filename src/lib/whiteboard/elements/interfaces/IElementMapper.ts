import type RenderElement from '$lib/whiteboard/renderer/RenderElement';

export default interface IElementMapper<T> {
	name(): string;
	toElement(data: T): RenderElement;
}
