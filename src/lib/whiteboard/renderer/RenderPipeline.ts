import type RenderElement from './RenderElement';

export interface RenderStage {
	name(): string;
	transform(element: RenderElement): RenderElement;
}

export class RenderPipeline {
	constructor(private readonly stages: RenderStage[] = []) {}

	run(element: RenderElement): RenderElement {
		return this.stages.reduce(
			(current, stage) =>
				current.fixed || current.exemptFrom?.includes(stage.name())
					? current
					: stage.transform(current),
			element
		);
	}
}
