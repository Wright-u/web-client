export default interface RenderElement {
	id: string;
	type: string;
	position: { x: number; y: number };
	size: { width: number; height: number };
	zIndex: number;
	fixed?: boolean;
	exemptFrom?: string[];
}
