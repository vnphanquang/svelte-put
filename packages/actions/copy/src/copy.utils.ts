/**
 * Copy a text to the clipboard. Will attempt to use the new `navigator.clipboard` API,
 * but will fallback to the `execCommand()` if `navigator.clipboard` is not available.
 * @public
 *
 * @remarks
 *
 * This is shamelessly "copied" from {@link https://github.com/vuejs/vitepress/blob/43c89d66c0d8c87e244a0a0e73a897509b977e65/src/client/app/composables/copyCode.ts | vitepress source code}
 *
 * @param text - text to copy
 */
export function copyToClipboard(text: string) {
  try {
    return navigator.clipboard.writeText(text);
  } catch {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;

    element.value = text;

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '');

    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt'; // Prevent zooming on iOS

    const selection = document.getSelection();
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;

    document.body.appendChild(element);
    element.select();

    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = text.length;

    document.execCommand('copy');
    document.body.removeChild(element);

    if (originalRange && selection) {
      selection.removeAllRanges(); // originalRange can't be truthy when selection is falsy
      selection.addRange(originalRange);
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      (previouslyFocusedElement as HTMLElement).focus();
    }
  }
}
