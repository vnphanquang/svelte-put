import iconInfo from '$lib/assets/images/svg/phosphor/status/info.svg?url';

const iconModules = import.meta.glob<string>('$lib/assets/images/svg/phosphor/status/*.svg', {
	query: '?url',
	import: 'default',
});

export async function getNotificationIcon(status: App.Status) {
	const path = `$lib/assets/images/svg/phosphor/status/${status}.svg`;
	if (path in iconModules) {
		return await iconModules[path]();
	}
	return iconInfo;
}
