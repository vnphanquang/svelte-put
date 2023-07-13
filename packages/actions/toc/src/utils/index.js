/**
 * Slugify a string
 *
 * @public
 *
 * @param {string} text - text to slugify
 * @returns {string}
 */
export function slugify(text) {
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
