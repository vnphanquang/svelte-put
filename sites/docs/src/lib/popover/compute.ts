import { arrow, autoUpdate, computePosition, offset, shift, flip } from '@floating-ui/dom';

/**
 * Compute the position of the target element relative to the control element
 * Used in popovers, such as tooltips
 */
export function compute(controlEl: HTMLButtonElement, targetEl: HTMLElement, arrowEl: HTMLElement) {
	return autoUpdate(controlEl, targetEl, async () => {
		const arrowLen = arrowEl.offsetWidth;
		const floatingOffset = Math.sqrt(2 * arrowLen ** 2) / 2;

		if (!controlEl) return;
		const { x, y, middlewareData, placement } = await computePosition(controlEl, targetEl, {
			placement: 'top',
			middleware: [
				offset(floatingOffset),
				flip({
					fallbackAxisSideDirection: 'start',
					crossAxis: false,
				}),
				shift(),
				arrow({
					element: arrowEl,
				}),
			],
		});
		targetEl.style.left = `${x}px`;
		targetEl.style.top = `${y}px`;

		const staticSide = /** @type {const} */ {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right',
		}[placement.split('-')[0]];

		if (middlewareData.arrow && staticSide) {
			const { x, y } = middlewareData.arrow;
			Object.assign(arrowEl.style, {
				left: x != null ? `${x}px` : '',
				top: y != null ? `${y}px` : '',
				right: '',
				bottom: '',
				[staticSide]: `${-arrowLen / 2}px`,
				transform: 'rotate(45deg)',
			});
		}
	});
}
