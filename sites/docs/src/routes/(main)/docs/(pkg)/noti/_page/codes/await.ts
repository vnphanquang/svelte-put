import { notiStore } from './notification-store';

const pushed = notiStore.push('info');
const resolved = await pushed.resolve();
