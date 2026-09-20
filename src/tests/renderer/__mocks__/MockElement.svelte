<script lang="ts">
	import type RenderElement from '$lib/whiteboard/renderer/RenderElement';

	let { element }: { element: RenderElement } = $props();
</script>

<article data-testid="mock-element">{element.id}:{element.type}</article>
