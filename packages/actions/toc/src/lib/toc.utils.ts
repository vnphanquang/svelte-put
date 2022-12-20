/**
 * Slugify a string
 *
 * @public
 *
 * @param text - text to slugify
 * @returns slugified text
 */
export function slugify(text: string): string {
  if (!text) return text;
  return text
    .trim()
    .toLowerCase()
    .replace(/[''"]+/gi, '')
    .replace(/[^a-z0-9\-_]+/gi, '-')
    .replace(/-+$/, '')
    .replace(/^-+/, '')
    .replace(/-+/g, '-');
}
