import type RenderContext from './RenderContext';
import type RenderElement from './RenderElement';

export interface RenderStage {
	readonly name: string;
	appliesTo(element: RenderElement, context: RenderContext): boolean;
	transform(element: RenderElement, context: RenderContext): RenderElement;
}
