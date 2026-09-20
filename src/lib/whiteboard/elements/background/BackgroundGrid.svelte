<script lang="ts">
	import type RenderElement from '$lib/whiteboard/renderer/RenderElement';

	let {
		element,
		pan,
		zoom
	}: {
		element: RenderElement;
		pan: { x: number; y: number };
		zoom: number;
	} = $props();

	const gridStep = $derived(28 * 2 ** Math.round(Math.log2(1 / zoom)));
	const gridSize = $derived(gridStep * zoom);
</script>

<div
	class="background-grid"
	data-testid="background-grid"
	data-element-id={element.id}
	aria-hidden="true"
	style:background-position={`${pan.x}px ${pan.y}px`}
	style:background-size={`${gridSize}px ${gridSize}px`}
></div>

<style>
	.background-grid {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background-color: white;
		background-image: radial-gradient(circle, rgb(203 213 225) 1px, transparent 1.25px);
		transition:
			background-position 110ms cubic-bezier(0.22, 1, 0.36, 1),
			background-size 180ms cubic-bezier(0.22, 1, 0.36, 1);
	}
</style>
