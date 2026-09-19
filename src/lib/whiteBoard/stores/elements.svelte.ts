import type { WhiteboardElement } from '../types/model';
import { runPipeline, type PipelineStage } from '../utils/pipline';

// manage the whiteBoard 
export class WhiteboardStore {
  elements = $state<WhiteboardElement[]>([]);
  stages: PipelineStage[] = [];

  update(fn: (els: WhiteboardElement[]) => WhiteboardElement[]) {
    const updatedEls = fn(this.elements);
    this.elements = runPipeline(updatedEls, this.stages);
  }

  add(el: WhiteboardElement) {
    this.update((els) => [...els, el]);
  }
}

export const whiteboard = new WhiteboardStore();