
// FIXME: change this to compose function that returns a svelte action
// /**
//  * @template {import('./public').TooltipComponentBaseProps} Props
//  * @param {import('./public').TooltipParameter<Props>} param
//  */
// export function useTooltip(param) {
//   const config = resolveConfig(param);
//   /**
//    * @param {Props} props
//    * @param {import('./public').TooltipRenderTarget} target
//    * @returns {import('./public').TooltipConfig<Props>}
//    */
//   return function(props, target) {
//     return {
//       component: config.component,
//       props: {
//         ...config.props,
//         ...props,
//       },
//       target: target ?? config.target,
//     };
//   };
// }

export function compose() {
  return function() {

  };
}

let autoincrement = 0;

/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @param {HTMLElement} node
 * @param {import('./public').TooltipParameter<Props>} param
 */
export function tooltip(node, param) {
  const config = resolveConfig(param);
  const { component: Component, props, target } = config;

  /** @type {HTMLElement} */
  let htmlTarget;
  switch (target) {
    case 'body':
      htmlTarget = document.body;
      break;
    case 'self':
      htmlTarget = node;
      break;
    case undefined:
    case 'parent':
      htmlTarget = node.parentElement ?? node;
      break;
    default:
      htmlTarget = target;
      break;
  }

  const tooltipId = node.getAttribute('aria-describedby') ?? `tooltip-${++autoincrement}`;
  if (!node.hasAttribute('aria-describedby')) {
    node.setAttribute('aria-describedby', tooltipId);
  }
  const container = document.createElement('div');
  container.role = 'tooltip';
  container.dataset.open = 'false';
  container.id = tooltipId;

  htmlTarget.appendChild(container);
  const component = new Component({
    target: container,
    props,
  });

  // float(htmlTarget, container);
}

/**
 * @template {import('./public').TooltipComponentBaseProps} Props
 * @param {import('./public').TooltipParameter<Props>} param
 * @returns {import('./public').TooltipConfig<Props>}
 */
function resolveConfig(param) {
  if (Array.isArray(param)) {
    return {
      component: param[0],
      props: param[1],
    };
  } else {
    return param;
  }
}
