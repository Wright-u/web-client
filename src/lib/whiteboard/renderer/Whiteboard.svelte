<script lang="ts">
	import ElementComponentFactory from './ElementComponentFactory.svelte';
	import { ElementStore } from './ElementStore.svelte';
	import type { IElementService } from './IElementService';
	import { RenderPipeline } from './RenderPipeline';

	let {
		service,
		pipeline = new RenderPipeline(),
		factory = new ElementComponentFactory()
	}: {
		service: IElementService;
		pipeline?: RenderPipeline;
		factory?: ElementComponentFactory;
	} = $props();

	let store = $state<ElementStore>();
	const elements = $derived((store?.rawElements ?? []).map((element) => pipeline.run(element)));

	$effect(() => {
		const nextStore = new ElementStore(service);
		nextStore.fetch();
		store = nextStore;
	});
</script>

<div class="canvas" data-testid="whiteboard">
	{#each elements as element (element.id)}
		{@const ElementComponent = factory.get(element.type)}
		{#if ElementComponent}
			<ElementComponent {element} />
		{/if}
	{/each}
</div>

<style>
	.canvas {
		isolation: isolate;
		min-height: 100vh;
	}
</style>
