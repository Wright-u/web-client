<script lang="ts">
	import type { ClassNodeElement } from '../../types/model';
	let {
		element,
		ondrag
	}: {
		element: ClassNodeElement;
		ondrag: (x: number, y: number) => void;
	} = $props();
</script>

<div
	class="class-node"
	style="left: {element.position.x}px; top: {element.position.y}px;
         width: {element.size.width}px; height: {element.size.height}px;
         z-index: {element.zIndex};"
>
	<strong>{element.title}</strong>
	<ul>
		{#each element.fields as field}
			<li>{field}</li>
		{/each}
	</ul>
</div>
