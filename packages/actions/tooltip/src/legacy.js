/**
 * @template {import('./legacy').TooltipComponentBaseProps} Props
 * @param {import('./legacy').TooltipContentConfig<Props>} content
 * @returns {content is (import('svelte').ComponentType<import('svelte').SvelteComponent<Props>>)}
 */
function isContentConfigDirectComponent(content) {
  return typeof content !== 'string' && !('component' in content);
}

let autoincrement = 0;

/**
 * @template {import('./legacy').TooltipComponentBaseProps} Props
 * @template {import('./legacy').TooltipContentConfig<Props>} Content
 * @param {import('./legacy').TooltipParameter<Props, Content>} param
 * @returns
 */
export function compose(param) {
  /**
   * @param {HTMLElement} node
   * @param {undefined | import('./legacy').ComposedTooltipParameter<Props, Content>} composedParam
   * @returns {import('./legacy').TooltipActionReturn<Props, Content>}
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
          composedParam,
        },
      };
    } else {
      composedContent = content;
    }

    return tooltip(node, { ...param, content: composedContent });
  };
}

/**
 * @template {import('./legacy').TooltipComponentBaseProps} Props
 * @template {import('./legacy').TooltipContentConfig<Props>} Content
 * @param {HTMLElement} node
 * @param {import('./legacy').TooltipParameter<Props, Content>} param
 * @returns {import('./legacy').TooltipActionReturn<Props, Content>}
 */
export function tooltip(node, param) {
  const { tag = 'div', content, target = 'parent', compute } = param;

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

  function onMouseLeave() {
    tooltip.dataset.open = 'false';
  }

  function onMouseEnter() {
    tooltip.dataset.open = 'true';
  }

  node.addEventListener('mouseenter', onMouseEnter);
  node.addEventListener('mouseleave', onMouseLeave);

  /** @type {undefined | (() => void)} */
  let computeCleanUp = undefined;
  const computed = compute?.({
    node,
    tooltip,
    param,
    content: /** @type {import('./legacy').TooltipComputeParam<Props, Content>['content']} */ (
      computedContent
    ),
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
      node.removeEventListener('mouseenter', onMouseEnter);
      node.removeEventListener('mouseleave', onMouseLeave);
      computeCleanUp?.();
    },
  };
}
