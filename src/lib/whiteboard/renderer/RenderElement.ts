export type ElementPosition = { x: number; y: number };

export type RenderElementOptions = {
	id: string;
	position: ElementPosition;
	zIndex: number;
};

export default abstract class RenderElement {
	abstract readonly type: string;

	readonly id: string;
	position: ElementPosition;
	zIndex: number;

	abstract readonly flags: number;

	constructor(options: RenderElementOptions) {
		this.id = options.id;
		this.position = options.position;
		this.zIndex = options.zIndex;
	}
}
