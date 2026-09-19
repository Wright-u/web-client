<script lang="ts">
	import { whiteboard } from '$lib/whiteBoard/stores/elements.svelte.ts';
	import ClassNode from '$lib/whiteBoard/components/nodes/ClassNode.svelte';

	function handleDrag(id: string, x: number, y: number) {
		whiteboard.update((els) =>
			els.map((el) => (el.id === id ? { ...el, position: { x, y } } : el))
		);
	}
</script>

<div class="canvas">
	{#each whiteboard.elements as el (el.id)}
		{#if el.type === 'classNode'}
			<ClassNode element={el} ondrag={(x, y) => handleDrag(el.id, x, y)} />
		{/if}
	{/each}
</div>
