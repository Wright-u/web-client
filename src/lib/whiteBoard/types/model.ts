export interface BaseElement {
    id: string;
    type: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
    parentId: string | null;
    children?: WhiteboardElement[]; // optional 
    exemptFrom?: string[]; // optinal 
}

export interface ClassNodeElement extends BaseElement {
    type: 'classNode';
    title: string;
    fields: string[];
}

export interface ShapeElement extends BaseElement {
    type: 'shape';
}

export type WhiteboardElement = ClassNodeElement | ShapeElement;