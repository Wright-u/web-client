<script lang="ts">
	import type RenderElement from './RenderElement';

	let { element }: { element: RenderElement } = $props();
</script>

<div
	class="background-grid"
	data-testid="background-grid"
	data-element-id={element.id}
	aria-hidden="true"
></div>

<style>
	.background-grid {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background-color: white;
		background-image: radial-gradient(circle, rgb(220 220 220) 1px, transparent 1.25px);
		background-size: 28px 28px;
	}
</style>
