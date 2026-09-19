import type { WhiteboardElement } from '../types/model';

export interface PipelineStage {
    name: string;
    appliesTo?: (el: WhiteboardElement) => boolean;
    transform: (el: WhiteboardElement) => WhiteboardElement;
}

function isExempt(el: WhiteboardElement, stage: PipelineStage): boolean {
    if (el.exemptFrom?.includes(stage.name)) return true;
    if (stage.appliesTo && !stage.appliesTo(el)) return true;
    return false;
}

function applyToElement(el: WhiteboardElement, stages: PipelineStage[]): WhiteboardElement {
    let result = stages.reduce(
        (current, stage) => (isExempt(current, stage) ? current : stage.transform(current)),
        el
    );
    if (result.children) {
        result = { ...result, children: runPipeline(result.children, stages) };
    }
    return result;
}

export function runPipeline(
    elements: WhiteboardElement[],
    stages: PipelineStage[]
): WhiteboardElement[] {
    return elements.map((el) => applyToElement(el, stages));
}