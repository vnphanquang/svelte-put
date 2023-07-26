import { tick } from 'svelte';

import { debounce, isContentConfigDirectComponent } from './utils.js';

let autoincrement = 0;

/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 * @overload
 * @param {import('./public').TooltipContainer & {
 *  content: import('svelte').ComponentType<import('svelte').SvelteComponent<Props, Events, Slots>>;
 *  compute?: import('./public').TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
 * }} param
 * @returns {import('./public').PreparedTooltipAction<Props>}
 */
/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 * @overload
 * @param {import('./public').TooltipContainer & {
 *  content: {
 *   component: import('svelte').ComponentType<import('svelte').SvelteComponent<Props, Events, Slots>>;
 *   props?: Props,
 *  },
 *  compute?: import('./public').TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
 * }} param
 * @returns {import('./public').PreparedTooltipAction<Props>}
 */
/**
 * @overload
 * @param {import('./public').TooltipContainer & {
 *  content: string;
 *  compute?: import('./public').TooltipCompute<Props, string>;
 * }} param
 * @returns {import('./public').PreparedTooltipAction<string>}
 */
/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {import('./public').TooltipContent<Props>} Content
 * @template {import('./public').TooltipComputeContent<Props>} ComputeContent
 * @param {import('./public').PreparedTooltipParameter<Props, Content, ComputeContent>} param
 * @returns {import('./public').PreparedTooltipAction<any>}
 */
export function prepare(param) {
  return function (node, composedParam) {
    let content = param.content;

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
          ...composedParam,
        },
      };
    } else {
      composedContent = content;
    }

    return tooltip(
      node,
      /** @type {any} */ ({
        ...param,
        content: composedContent,
      }),
    );
  };
}

/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @param {HTMLElement} node
 * @param {import('./public').TooltipParameter<Props>} param
 * @returns {import('./public').TooltipActionReturn<Props>}
 */
export function tooltip(node, param) {
  const { tag = 'div', content, target = 'parent', compute, debounce: debounceMs } = param;

  let classes = {
    default: '',
    visible: '',
  };
  if (typeof param.class === 'string') {
    classes.default = param.class;
  } else if (param.class) {
    classes = {
      ...classes,
      ...param.class,
    };
  }

  const tooltipId = node.getAttribute('aria-describedby') ?? `tooltip-${++autoincrement}`;
  if (!node.hasAttribute('aria-describedby')) {
    node.setAttribute('aria-describedby', tooltipId);
  }
  const tooltip = document.createElement(tag);
  tooltip.role = 'tooltip';
  tooltip.dataset.visible = 'false';
  tooltip.id = tooltipId;
  tooltip.classList.toggle(classes.default, true);

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

  let isMouseWithinNode = false;
  let isMouseWithinTooltip = false;
  let isNodeInFocus = false;
  function onMouseEnterNode() {
    isMouseWithinNode = true;
    debounceToggle();
  }
  function onMouseLeaveNode() {
    isMouseWithinNode = false;
    debounceToggle();
  }
  function onFocusNode() {
    isNodeInFocus = true;
    debounceToggle();
  }
  function onBlurNode() {
    isNodeInFocus = false;
    debounceToggle();
  }
  function onMouseEnterTooltip() {
    isMouseWithinTooltip = true;
    debounceToggle();
  }
  function onMouseLeaveTooltip() {
    isMouseWithinTooltip = false;
    debounceToggle();
  }

  /**
   * @param {boolean | undefined} force
   */
  function toggle(force = undefined) {
    const visible = force ?? (isMouseWithinNode || isMouseWithinTooltip || isNodeInFocus);
    tooltip.dataset.visible = visible.toString();
    tooltip.style.pointerEvents = visible ? 'all' : 'none';
    tooltip.classList.toggle(classes.visible, visible);
    if (visible) {
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
      debounceToggle(false);
    }
  }

  node.addEventListener('mouseenter', onMouseEnterNode);
  node.addEventListener('mouseleave', onMouseLeaveNode);
  node.addEventListener('focus', onFocusNode);
  node.addEventListener('blur', onBlurNode);
  tooltip.addEventListener('mouseenter', onMouseEnterTooltip);
  tooltip.addEventListener('mouseleave', onMouseLeaveTooltip);

  /** @type {undefined | (() => void)} */
  let computeCleanUp = undefined;

  tick().then(() => {
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
  });

  return {
    destroy() {
      node.removeEventListener('mouseenter', onMouseEnterNode);
      node.removeEventListener('mouseleave', onMouseLeaveNode);
      node.removeEventListener('focus', onFocusNode);
      node.removeEventListener('blur', onBlurNode);
      tooltip.removeEventListener('mouseenter', onMouseEnterTooltip);
      tooltip.removeEventListener('mouseleave', onMouseLeaveTooltip);

      computeCleanUp?.();
    },
  };
}
