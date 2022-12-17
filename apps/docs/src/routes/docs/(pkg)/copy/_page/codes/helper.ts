import { copyToClipboard } from '@svelte-put/copy';

export function copy(text: string) {
  copyToClipboard(text);
}
