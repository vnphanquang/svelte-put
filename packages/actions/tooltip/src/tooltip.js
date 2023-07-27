import { debounce, isContentConfigDirectComponent } from './utils.js';

let autoincrement = 0;

/**
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @overload
 * @param {import('./public').TooltipContainer & {
 *  content: import('svelte').ComponentType<import('svelte').SvelteComponent<Props, Events, Slots>>;
 *  compute?: import('./public').TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
 * }} param
 * @returns {import('./public').PreparedTooltipAction<Props>}
 */
/**
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 * @template {import('./public').TooltipComponentBaseProps} Props
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
 *  compute?: import('./public').TooltipCompute<{}, string>;
 * }} param
 * @returns {import('./public').PreparedTooltipAction<string>}
 */
/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {import('./public').TooltipContent<Props>} Content
 * @template {import('./public').TooltipComputeContent<Props>} ComputeContent
 * @param {import('./public').TooltipParameter<Props, Content, ComputeContent>} param
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
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {import('./public').TooltipContent<Props>} Content
 * @template {import('./public').TooltipComputeContent<Props>} ComputeContent
 * @overload
 * @param {HTMLElement} node
 * @param {import('./public').TooltipContainer & {
 *  content: import('svelte').ComponentType<import('svelte').SvelteComponent<Props, Events, Slots>>;
 *  compute?: import('./public').TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
 * }} param
 * @returns {import('svelte/action').ActionReturn<import('./public').TooltipParameter<Props, Content, ComputeContent>, import('./public').TooltipAttributes>}
 */
/**
 * @template {Record<string, any>} Events
 * @template {Record<string, any>} Slots
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {import('./public').TooltipContent<Props>} Content
 * @template {import('./public').TooltipComputeContent<Props>} ComputeContent
 * @overload
 * @param {HTMLElement} node
 * @param {import('./public').TooltipContainer & {
 *  content: {
 *   component: import('svelte').ComponentType<import('svelte').SvelteComponent<Props, Events, Slots>>;
 *   props?: Props,
 *  },
 *  compute?: import('./public').TooltipCompute<Props, import('svelte').SvelteComponent<Props, Events, Slots>>;
 * }} param
 * @returns {import('svelte/action').ActionReturn<import('./public').TooltipParameter<Props, Content, ComputeContent>, import('./public').TooltipAttributes>}
 */
/**
 * @overload
 * @param {HTMLElement} Node
 * @param {import('./public').TooltipContainer & {
 *  content: string;
 *  compute?: import('./public').TooltipCompute<{}, string>;
 * }} param
 * @returns {import('svelte/action').ActionReturn<import('./public').TooltipParameter<Props, string, string>, import('./public').TooltipAttributes>}
 */
/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @template {import('./public').TooltipContent<Props>} Content
 * @template {import('./public').TooltipComputeContent<Props>} ComputeContent
 * @param {HTMLElement} node
 * @param {import('./public').TooltipParameter<Props, Content, ComputeContent>} param
 * @returns {import('svelte/action').ActionReturn<import('./public').TooltipParameter<Props, Content, ComputeContent>, import('./public').TooltipAttributes>}
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

  let pointerEvents = {
    default: 'none',
    visible: 'all',
  };
  if (typeof param.pointerEvents === 'boolean') {
    if (!param.pointerEvents) {
      pointerEvents = {
        default: '',
        visible: '',
      };
    }
  } else {
    pointerEvents = {
      ...pointerEvents,
      ...param.pointerEvents,
    };
  }

  let visibleAttribute = '';
  if (param.visibleAttribute === true || param.visibleAttribute === undefined) {
    visibleAttribute = 'data-visible';
  } else if (param.visibleAttribute) {
    visibleAttribute = param.visibleAttribute;
  }

  let aria = { role: '', id: '' };
  if (param.aria === undefined || param.aria === true) {
    aria.role = 'tooltip';
    aria.id = node.getAttribute('aria-describedby') ?? `tooltip-${++autoincrement}`;
  } else if (param.aria) {
    aria.role = param.aria.role ?? 'tooltip';
    aria.id =
      param.aria.id ?? node.getAttribute('aria-describedby') ?? `tooltip-${++autoincrement}`;
  }

  const tooltip = document.createElement(tag);
  if (aria.role) tooltip.role = aria.role;
  if (aria.id) {
    if (!node.hasAttribute('aria-describedby')) {
      node.setAttribute('aria-describedby', aria.id);
    }
    tooltip.id = aria.id;
  }
  tooltip.style.pointerEvents = pointerEvents.default;
  if (visibleAttribute) tooltip.setAttribute(visibleAttribute, 'false');
  if (classes.default) tooltip.classList.toggle(classes.default, true);

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
  /** @type {undefined | (() => void)} */
  let computeCleanUp = undefined;
  const wait = 'requestIdleCallback' in window ? requestIdleCallback : setTimeout;
  wait(() => {
    if (typeof content === 'string') {
      computedContent = tooltip.innerHTML = content;
    } else if (isContentConfigDirectComponent(content)) {
      computedContent = new content({ target: tooltip });
    } else {
      const { component: Component, props } = content;
      computedContent = new Component({
        target: tooltip,
        props: /** @type {any} */ ({
          ...props,
          visible: false,
        }),
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
    if (visibleAttribute) tooltip.setAttribute(visibleAttribute, visible.toString());
    tooltip.style.pointerEvents = visible ? pointerEvents.visible : pointerEvents.default;
    if (classes.visible) tooltip.classList.toggle(classes.visible, visible);
    if (typeof computedContent !== 'string') computedContent.$set(/** @type {any} */ ({ visible }));
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

  return {
    destroy() {
      node.removeEventListener('mouseenter', onMouseEnterNode);
      node.removeEventListener('mouseleave', onMouseLeaveNode);
      node.removeEventListener('focus', onFocusNode);
      node.removeEventListener('blur', onBlurNode);
      tooltip.removeEventListener('mouseenter', onMouseEnterTooltip);
      tooltip.removeEventListener('mouseleave', onMouseLeaveTooltip);
      window.removeEventListener('keydown', listenForEscape);

      computeCleanUp?.();
    },
  };
}
