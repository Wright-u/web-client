<script lang="ts">
	import ElementComponentFactory from './ElementComponentFactory.svelte';
	import BackgroundGrid from '../elements/background/BackgroundGrid.svelte';
	import {
		BACKGROUND_GRID_ID,
		createBackgroundGrid
	} from '../elements/background/BackgroundGrid';
	import type IRenderStore from './IRenderStore';

	let {
		store,
		factory = new ElementComponentFactory()
	}: {
		store: IRenderStore;
		factory?: ElementComponentFactory;
	} = $props();

	let zoom = $state(1);
	let pan = $state({ x: 0, y: 0 });
	let dragStart = $state<{ pointerX: number; pointerY: number; panX: number; panY: number }>();

	function panStart(event: PointerEvent) {
		if (event.button !== 0) return;
		const viewport = event.currentTarget as HTMLDivElement;
		const element = (event.target as Element).closest<HTMLElement>('[data-element-id]');
		if (element && element.getAttribute('aria-hidden') !== 'true') {
			element.tabIndex = 0;
			element.focus({ preventScroll: true });
			return;
		}

		viewport.focus({ preventScroll: true });

		dragStart = {
			pointerX: event.clientX,
			pointerY: event.clientY,
			panX: pan.x,
			panY: pan.y
		};
		viewport.setPointerCapture(event.pointerId);
	}

	function panMove(event: PointerEvent) {
		if (!dragStart) return;

		pan = {
			x: dragStart.panX + event.clientX - dragStart.pointerX,
			y: dragStart.panY + event.clientY - dragStart.pointerY
		};
	}

	function panEnd(event: PointerEvent) {
		dragStart = undefined;
		const canvas = event.currentTarget as HTMLDivElement;
		if (canvas.hasPointerCapture(event.pointerId)) {
			canvas.releasePointerCapture(event.pointerId);
		}
	}

	function zoomAtPointer(event: WheelEvent) {
		event.preventDefault();
		const viewport = event.currentTarget as HTMLDivElement;
		const bounds = viewport.getBoundingClientRect();
		const pointerX = event.clientX - bounds.left;
		const pointerY = event.clientY - bounds.top;
		const nextZoom = Math.min(4, Math.max(0.25, zoom * (event.deltaY < 0 ? 1.1 : 1 / 1.1)));
		const zoomRatio = nextZoom / zoom;

		pan = {
			x: pointerX - (pointerX - pan.x) * zoomRatio,
			y: pointerY - (pointerY - pan.y) * zoomRatio
		};
		zoom = nextZoom;
	}

	$effect(() => {
		store.load().catch((err)=> {
			console.log("Failed to load elements", err);
		})
	});
</script>

<div
	class="viewport"
	class:panning={dragStart}
	data-testid="whiteboard"
	role="application"
	aria-label="Whiteboard"
	tabindex="-1"
	onpointerdown={panStart}
	onpointermove={panMove}
	onpointerup={panEnd}
	onpointercancel={panEnd}
	onwheel={zoomAtPointer}
>
	<BackgroundGrid element={createBackgroundGrid()} {pan} {zoom} />
	<div
		class="canvas"
		class:panning={dragStart}
		style:transform={`translate(${pan.x}px, ${pan.y}px) scale(${zoom})`}
	>
		{#each store?.elements ?? [] as element (element.id)}
			{#if element.id !== BACKGROUND_GRID_ID}
				{@const ElementComponent = factory.get(element.type)}
				{#if ElementComponent}
					<ElementComponent {element} />
				{/if}
			{/if}
		{/each}
	</div>
</div>

<style>
	.viewport {
		position: fixed;
		inset: 0;
		overflow: hidden;
		isolation: isolate;
		touch-action: none;
		user-select: none;
		outline: none;
	}

	.canvas {
		position: absolute;
		inset: 0;
		transform-origin: 0 0;
		will-change: transform;
		transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.canvas.panning {
		transition-duration: 110ms;
	}

	.viewport.panning,
	.canvas.panning {
		cursor: grabbing;
	}

	.viewport :global([data-element-id]:focus),
	.viewport :global([data-element-id]:focus-within) {
		user-select: text;
	}
</style>
