<script lang="ts">
	import type { IElementService } from '$lib/whiteboard/renderer/IElementService';
	import Whiteboard from '$lib/whiteboard/renderer/Whiteboard.svelte';

	const service: IElementService = {
		getWhiteboardElements: () => []
	};
</script>

<Whiteboard {service} />
