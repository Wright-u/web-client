import type { ElementResponse } from "$lib/whiteboard/editor/ElementResponse";
import type { RenderElementOptions } from "$lib/whiteboard/renderer/RenderElement";
import type RenderElement from "$lib/whiteboard/renderer/RenderElement";
import type IElementMapper from "../interfaces/IElementMapper";

export default abstract class ResponseElementMapper<MTD> implements IElementMapper<ElementResponse> {
    abstract name(): string;

    toElement(data: ElementResponse): RenderElement {
        const baseOptions: RenderElementOptions = {
            id: data.id,
            position: data.position,
            zIndex: data.zIndex
        };

        return this.build(baseOptions, data.entity.metadata as MTD);
    }

    abstract build(baseOptions: RenderElementOptions, metadata: MTD) : RenderElement;

}