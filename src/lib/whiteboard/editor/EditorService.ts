import type { AxiosInstance } from "axios";
import type RenderElement from "../renderer/RenderElement";
import type { IEditorService } from "./interfaces/IEditorService";
import type { ElementResponse } from "./ElementResponse";
import type IElementMapperFactory from "../elements/interfaces/IElementMapperFactory";

export default class EditorService implements IEditorService {
    private api: AxiosInstance;
    private mapperFactory: IElementMapperFactory<ElementResponse>;

    constructor(api: AxiosInstance, mapperFactory: IElementMapperFactory<ElementResponse>) {
        this.api = api;
        this.mapperFactory = mapperFactory;
    }

    async getWhiteboardElements(): Promise<RenderElement[]> {
        const response = await this.api.get<ElementResponse[]>('editor/elements');
        const mapper = this.mapperFactory.createMapper('element');
        return response.data.map(mapper.toElement);
    }

}