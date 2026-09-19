import type RenderElement from "./RenderElement";

export interface IElementService {
	getWhiteboardElements(): RenderElement[];
}