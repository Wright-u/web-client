export type ElementResponse = {
    id: string;
    type: string;
    position: { x: number; y: number };
    zIndex: number;
    domainDrawData: unknown;
    entity: {
        id: string;
        type: string;
        metadata: unknown;
    };
}