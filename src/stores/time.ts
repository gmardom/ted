import { readable } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

export const formatter = Intl.DateTimeFormat("pl", {
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
});
