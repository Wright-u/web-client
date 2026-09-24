import type IElementMapper from "./IElementMapper";

export default interface IElementMetadataMapperFactory<T> {
    createMapper(type: string): IElementMapper<T>;
}