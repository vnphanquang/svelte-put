import { debounce, isContentConfigDirectComponent } from './utils.js';

let autoincrement = 0;

/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {import('./public').TooltipContent<Props>} Content
 * @param {import('./public').TooltipParameter<Props, Content>} param
 */
export function compose(param) {
  /**
   * @param {HTMLElement} node
   * @param {undefined | (Content extends string ? string : Props)} composedParam
   * @returns {import('./public').TooltipComposedActionReturn<Props, Content>}
   */
  return function (node, composedParam = undefined) {
    let content = param.content;

    /** @type {any} */
    let composedContent;
    if (typeof content === 'string' && typeof composedParam === 'string') {
      composedContent = composedParam;
    } else if (isContentConfigDirectComponent(content)) {
      composedContent = {
        component: content,
        props: composedParam,
      };
    } else if ('component' in /** @type {any} */ (content)) {
      composedContent = {
        component: content.component,
        props: {
          ...content.props,
          .../** @type {Props} */ (composedParam),
        },
      };
    } else {
      composedContent = content;
    }

    return /** @type {any}*/ (tooltip(node, { ...param, content: composedContent }));
  };
}

/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {import('./public').TooltipContent<Props>} Content
 * @param {HTMLElement} node
 * @param {import('./public').TooltipParameter<Props, Content>} param
 * @returns {import('./public').TooltipActionReturn<Props, Content>}
 */
export function tooltip(node, param) {
  const { tag = 'div', content, target = 'parent', compute, debounce: debounceMs } = param;

  const tooltipId = node.getAttribute('aria-describedby') ?? `tooltip-${++autoincrement}`;
  if (!node.hasAttribute('aria-describedby')) {
    node.setAttribute('aria-describedby', tooltipId);
  }
  const tooltip = document.createElement(tag);
  tooltip.role = 'tooltip';
  tooltip.dataset.open = 'false';
  tooltip.id = tooltipId;

  if (target === 'parent') {
    if (node.parentElement) {
      if (node.nextSibling) {
        node.parentElement.insertBefore(tooltip, node.nextSibling);
      } else {
        node.parentElement.appendChild(tooltip);
      }
    } else {
      node.appendChild(tooltip);
    }
  } else if (target === 'body') {
    document.body.appendChild(tooltip);
  } else if (target === 'self') {
    node.appendChild(tooltip);
  } else if (typeof target === 'function') {
    target(node, tooltip);
  } else {
    target.appendChild(tooltip);
  }

  /** @type {string | import('svelte').SvelteComponent<Props>} */
  let computedContent;
  if (typeof content === 'string') {
    computedContent = tooltip.innerHTML = content;
  } else if (isContentConfigDirectComponent(content)) {
    computedContent = new content({ target: tooltip });
  } else {
    const { component: Component, props } = content;
    computedContent = new Component({
      target: tooltip,
      props,
    });
  }

  /**
   * @param {boolean | undefined} force
   */
  function toggle(force = undefined) {
    const open = force ?? (tooltip.dataset.open === 'true' ? false : true);
    tooltip.dataset.open = open.toString();
    tooltip.style.pointerEvents = open ? 'all' : 'none';
    if (open) {
      window.addEventListener('keydown', listenForEscape);
    } else {
      window.removeEventListener('keydown', listenForEscape);
    }
  }
  const debounceToggle = debounce(toggle, debounceMs || 0);

  /**
   * @param {KeyboardEvent} e
   */
  function listenForEscape(e) {
    if (e.key === 'Escape') {
      hide();
    }
  }

  function show() {
    debounceToggle(true);
  }

  function hide() {
    debounceToggle(false);
  }

  node.addEventListener('mouseenter', show);
  node.addEventListener('mouseleave', hide);
  node.addEventListener('focus', show);
  node.addEventListener('blur', hide);

  tooltip.addEventListener('mouseenter', show);
  tooltip.addEventListener('mouseleave', hide);

  /** @type {undefined | (() => void)} */
  let computeCleanUp = undefined;
  const computed = compute?.({
    node,
    tooltip,
    content: /** @type {any} */ (computedContent),
  });
  if (typeof computed === 'function') {
    computeCleanUp = computed;
  } else if (computed !== undefined) {
    computed.then((resolved) => {
      if (resolved) {
        computeCleanUp = resolved;
      }
    });
  }

  return {
    destroy() {
      node.removeEventListener('mouseenter', show);
      node.removeEventListener('mouseleave', hide);
      node.removeEventListener('focus', show);
      node.removeEventListener('blur', hide);

      tooltip.addEventListener('mouseenter', show);
      tooltip.addEventListener('mouseleave', hide);
      computeCleanUp?.();
    },
  };
}
