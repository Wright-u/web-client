<script lang="ts">
	import { ElementStore } from '$lib/whiteboard/renderer/ElementStore.svelte';
	import Whiteboard from '$lib/whiteboard/renderer/Whiteboard.svelte';

	const store = new ElementStore({
		getWhiteboardElements: async () => []
	});
</script>

<Whiteboard {store} />
