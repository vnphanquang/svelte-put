import { DEFAULT_TOC_PARAMETERS } from './toc.constants';
import type { TocParameters, TocEventItemDetails, ResolvedTocParameters } from './toc.types';
import { slugify } from './toc.utils';

/**
 * Resolve the raw {@link TocParameters} object from `toc` input
 * @internal
 * @param parameters - parameters taken from `toc` input
 */
export function resolveParameters(parameters: Partial<TocParameters> = {}): ResolvedTocParameters {
  const mergedParameters = {
    ...DEFAULT_TOC_PARAMETERS,
    ...parameters,
  };

  let { ignoreSelector } = mergedParameters;
  const { anchored, indicator } = mergedParameters;

  if (typeof ignoreSelector === 'string') {
    ignoreSelector = [ignoreSelector];
  }

  return {
    ...mergedParameters,
    anchored:
      typeof anchored === 'boolean'
        ? anchored
          ? (DEFAULT_TOC_PARAMETERS.anchored as number)
          : -1
        : anchored,
    indicator:
      typeof indicator === 'boolean'
        ? indicator
          ? (DEFAULT_TOC_PARAMETERS.indicator as string)
          : ''
        : indicator,
    selector: `${mergedParameters.selector}${ignoreSelector.map((i) => `:not(${i})`).join()}`,
  };
}

/**
 * Utility to add an inline style tag
 * @internal
 * @param id - id of style tag to add
 * @param styleString - inline style string
 */
function addStyle(id: string, styleString: string) {
  const style = document.createElement('style');
  style.id = id;
  style.textContent = styleString;
  document.head.append(style);
}

/**
 * Utility to remove a style tag
 * @internal
 * @param id - id of style tag to remove
 */
function removeStyle(id: string) {
  document.getElementById(id)?.remove();
}

/**
 * Main operation of the `toc` action. Transform matching
 * DOM elements to facilitate table of contents navigation
 * @internal
 * @param elements - the elements to transform
 * @param parameters - the parameters resolved from `toc` input
 */
export function transformTocItems(elements: HTMLElement[], parameters: ResolvedTocParameters) {
  const {
    injectedStyleId,
    insertedAnchorClass,
    anchored,
    indicator,
    insertedParagraphClass,
    itemClass,
  } = parameters;

  const items: TocEventItemDetails[] = [];

  if (indicator && !document.getElementById(injectedStyleId)) {
    addStyle(
      injectedStyleId,
      `.${insertedAnchorClass}:hover::before {
        content: '${indicator}';
        position: absolute;
        right: 101%;
      }`,
    );
  }

  for (const element of elements) {
    let id = element.id;
    if (id) {
      element.setAttribute('data-original-id', element.id);
    }
    if (!element.id) {
      if (!element.textContent) {
        console.error('Element must have either text content or id attribute');
      }
      element.id = id = slugify(element.textContent || '').substring(0, 51);
    }

    let anchor: HTMLAnchorElement | undefined;
    let p: HTMLParagraphElement | undefined;
    if (anchored !== -1) {
      // wrap content in anchor tag
      anchor = document.createElement('a');
      anchor.style.position = 'relative';
      anchor.className = insertedAnchorClass;
      anchor.href = `#${id}`;
      anchor.innerHTML = element.innerHTML;
      element.innerHTML = '';
      element.appendChild(anchor);

      // set element position to 'relative'
      element.className = `${itemClass} ${element.className}`;
      const position = getComputedStyle(element).getPropertyValue('position');
      if (position === 'static') {
        (element as HTMLHeadingElement).style.position = 'relative';
      }

      // add a hidden paragraph for scroll padding
      if (anchored !== 0) {
        p = document.createElement('p');
        p.className = insertedParagraphClass;
        p.style.bottom = '100%';
        p.style.position = 'absolute';
        p.style.visibility = 'hidden';
        p.style.marginTop = `-${anchored}px`;
        p.style.height = `${anchored}px`;
        p.style.zIndex = `-1`;
        p.id = id;
        element.removeAttribute('id');
        element.appendChild(p);
      }
    }

    items.push({
      element: element as HTMLElement,
      id,
      text: element.textContent ?? '',
      anchor,
      p,
    });
  }

  return items;
}

/**
 * Restore all dom elements transformed by the `toc` action.
 * @internal
 * @param elements - the elements to restore
 * @param parameters - the parameters resolved from `toc` input
 */
export function restoreTocItems(elements: HTMLElement[], parameters: ResolvedTocParameters) {
  const { insertedAnchorClass, insertedParagraphClass, itemClass, injectedStyleId } = parameters;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const paragraph = element.querySelector(`.${insertedParagraphClass}`);
    paragraph?.remove();

    const anchor = element.querySelector(`.${insertedAnchorClass}`);
    if (anchor) {
      const innerHTML = anchor.innerHTML;
      anchor.remove();
      element.innerHTML = innerHTML;
    }

    const className = element.className;
    className.replace(itemClass, '');
    element.className = className;
    element.id = element.getAttribute('data-original-id') || '';
  }

  removeStyle(injectedStyleId);
}
