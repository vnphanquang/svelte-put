<script lang="ts">
  import { type SwipeStartEventDetail, SwipeEndEventDetail, swipeable } from '@svelte-put/swipeable';

	function handleSwipeStart(event: CustomEvent<SwipeStartEventDetail>) {
		const { direction, distance } = event.detail;
	}

	function handleSwipeEnd(event: CustomEvent<SwipeEndEventDetail>) {
		const { direction, distance, passThreshold } = event.detail;
	}
</script>

<div use:swipeable onswipestart={handleSwipeStart} onswipeend={handleSwipeEnd}></div>