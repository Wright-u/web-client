import type RenderElement from '../../renderer/RenderElement';

export interface IEditorService {
	getWhiteboardElements(): Promise<RenderElement[]> | RenderElement[];
}
