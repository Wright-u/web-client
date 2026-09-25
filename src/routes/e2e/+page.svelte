<script lang="ts">
	import ElementComponentFactory from '$lib/whiteboard/renderer/ElementComponentFactory.svelte';
	import { ElementStore } from '$lib/whiteboard/renderer/ElementStore.svelte';
	import RenderElement from '$lib/whiteboard/renderer/RenderElement';
	import FakeNote from './FakeNote.svelte';
	import Whiteboard from '$lib/whiteboard/renderer/Whiteboard.svelte';

	class FakeNoteElement extends RenderElement {
		readonly type = 'note';
		readonly flags = 0;

		constructor() {
			super({
				id: 'fake-note-1',
				position: { x: 24, y: 32 },
				zIndex: 1
			});
		}
	}

	const store = new ElementStore({
		getWhiteboardElements: async () => [new FakeNoteElement()]
	});
	const factory = new ElementComponentFactory({ note: FakeNote });
</script>

<Whiteboard {store} {factory} />
