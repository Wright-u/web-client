import type IElementMapper from "../interfaces/IElementMapper";
import type IElementMapperFactory from "../interfaces/IElementMapperFactory";
import type { ElementResponse } from "../../editor/ElementResponse";

export default class ResponseElementMapperFactory implements IElementMapperFactory<ElementResponse> {
    private mappers = new Map<string, IElementMapper<ElementResponse>>();
    createMapper(type: string): IElementMapper<ElementResponse> {
        const mapper = this.mappers.get(type);
        if (!mapper) {
            throw new Error(`No mapper for type ${type}`);
        }
        return mapper;
    }

    register(mapper: IElementMapper<ElementResponse>): void {
        const type = mapper.name();
        if (this.mappers.has(type)) {
            throw new Error(`Mapper for type ${type} already registered`);
        }
        this.mappers.set(type, mapper);
    }
}

type MapperClass = (new () => IElementMapper<ElementResponse>);

function isMapperClass(value: unknown): value is MapperClass {
    return (
        typeof value === "function" &&
        typeof value.prototype?.name === "function" &&
        typeof value.prototype?.toElement === "function"
    );
}

const modules = import.meta.glob<{default?: unknown}>(
    [
        "../features/**",
        "!../features/*.{test,spec}.ts"
    ],
    { eager: true }
);

export function createDefaultFactory(): ResponseElementMapperFactory {
    const factory = new ResponseElementMapperFactory();
    for (const mod of Object.values(modules)) {
        if (isMapperClass(mod.default)) {
            factory.register(new mod.default());
        }
    }
    return factory;
}