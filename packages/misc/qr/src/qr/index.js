import QR from 'qrcode-generator';

const __ANCHOR_SIZE = 7;

/**
 * @internal
 * @param {import('./types').QRConfig} config
 */
export function resolveConfig(config) {
  return /** @satisfies {import('./types').QRConfig} */ ({
    margin: 1,
    shape: /** @type {const} */ ('square'),
    logoRatio: 1,
    moduleFill: 'currentcolor',
    anchorOuterFill: 'currentcolor',
    anchorInnerFill: 'currentcolor',
    ...config,
  });
}

/**
 * create SVG parts that make up a QR. You should typically use {@link createSVG} instead
 * @public
 * @param {import('./types').QRConfig} config
 * @param {import('./types').QRCode} [qr]
 */
export function createSVGParts(config, qr) {
  const { data, margin, shape, logo, logoRatio, anchorInnerFill, anchorOuterFill, moduleFill } =
    resolveConfig(config);
  if (!qr) {
    qr = QR(0, 'H');
    qr.addData(data);
    qr.make();
  }
  const count = qr.getModuleCount();
  const size = count + margin * 2;

  /** ---- ANCHORS ---- */
  /** @type {[string, number, number][]} */
  const anchors = [
    ['top-left', margin, margin],
    ['top-right', count - __ANCHOR_SIZE + margin, margin],
    ['bottom-left', margin, count - __ANCHOR_SIZE + margin],
  ];

  let anchorsSvg = '';
  for (const [position, x, y] of anchors) {
    let outerD = `M${x} ${y} h7 v7 h-7 v-7z m1 1 v5 h5 v-5 h-5 z`;
    let innerD = `M${x + 2} ${y + 2} h3 v3 h-3 v-3 z`;
    if (shape !== 'square') {
      outerD = `M${
        x + 0.5
      } ${y}h6s0.5 0 .5 .5v6s0 .5-.5 .5h-6s-.5 0-.5-.5v-6s0-.5 .5-.5zm.75 1s-.25 0-.25 .25v4.5s0 .25 .25 .25h4.5s.25 0 .25-.25v-4.5s0-.25 -.25 -.25h-4.5z`;
      innerD = `M${x + 2.5} ${
        y + 2
      } h2 s.5 0 .5 .5 v2 s0 .5-.5 .5 h-2 s-.5 0-.5-.5 v-2 s0-.5 .5-.5 z`;
    }
    const outerPath = `<path class="anchor-outer" fill="${anchorOuterFill}" d="${outerD}" />`;
    const innerPath = `<path class="anchor-outer" fill="${anchorInnerFill}" d="${innerD}" />`;
    anchorsSvg += `<g class="anchor" data-position="${position}">${outerPath} ${innerPath}</g>`;
  }
  anchorsSvg = `<g class="anchors">${anchorsSvg}</g>`;

  /** ---- MODULES ---- */
  let modulesSvg = '';
  for (let col = 0; col < count; col++) {
    for (let row = 0; row < count; row++) {
      if (!qr.isDark(col, row) || isAnchor(col, row, count) || (logo && isLogo(col, row, count)))
        continue;
      const x = col + margin;
      const y = row + margin;
      modulesSvg += `<rect class="module" fill="${moduleFill}" data-column="${col}" data-row="${row}" x="${x}" y="${y}" width="1" height="1" ${
        shape === 'circle' ? 'rx="0.5"' : ''
      } />`;
    }
  }
  modulesSvg = `<g class="modules">${modulesSvg}</g>`;

  /** ---- LOGO ---- */
  let logoSvg = '';
  if (logo) {
    const safelyRemovableSize = Math.floor(count * Math.sqrt(0.1));
    const { width, height } = calculateLogoSize(safelyRemovableSize * 0.8, logoRatio);
    const x = (size + margin - width) / 2;
    const y = (size + margin - height) / 2;
    logoSvg = `<image width="${width}" height="${height}" x="${x}" y="${y}" href="${logo}" class="logo" />`;
  }

  return {
    attributes: {
      viewBox: `0, 0 ${size} ${size}`,
      'data-qr': data,
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
    },
    anchors: anchorsSvg,
    modules: modulesSvg,
    logo: logoSvg,
  };
}

/**
 * create QR as an SVG string
 * @public
 * @param {import('./types').QRConfig} config
 */
export function createSVG(config) {
  const { anchors, attributes, logo, modules } = createSVGParts(config);
  return `<svg ${Object.entries(attributes)
    .map(([name, value]) => `${name}="${value}"`)
    .join(' ')}>${anchors} ${modules} ${logo}</svg>`;
}

/**
 * create QR as a base64 data URL (image/svg+xml)
 * @public
 * @param {import('./types').QRConfig} config
 */
export function createBase64Image(config) {
  const svg = createSVG(config);
  const svg64 = btoa(svg);
  const b64start = `data:image/svg+xml;base64,`;
  const image64 = b64start + svg64;
  return image64;
}

/**
 * @internal
 * @param {number} col
 * @param {number} row
 * @param {number} count
 */
function isAnchor(col, row, count) {
  if (row <= __ANCHOR_SIZE) return col <= __ANCHOR_SIZE || col >= count - __ANCHOR_SIZE;
  if (col <= __ANCHOR_SIZE) return row >= count - __ANCHOR_SIZE;
  return false;
}

/**
 * @internal
 * @param {number} col
 * @param {number} row
 * @param {number} count
 */
function isLogo(col, row, count) {
  const center = count / 2;
  const maskXToYRatio = 1;

  const safelyRemovableHalf = Math.floor((count * Math.sqrt(0.1)) / 2);
  const safelyRemovableHalfX = safelyRemovableHalf * maskXToYRatio;
  const safelyRemovableHalfY = safelyRemovableHalf / maskXToYRatio;
  const safelyRemovableStartX = center - safelyRemovableHalfX;
  const safelyRemovableEndX = center + safelyRemovableHalfX;
  const safelyRemovableStartY = center - safelyRemovableHalfY;
  const safelyRemovableEndY = center + safelyRemovableHalfY;

  return (
    row >= safelyRemovableStartY &&
    row <= safelyRemovableEndY &&
    col >= safelyRemovableStartX &&
    col <= safelyRemovableEndX
  );
}

/**
 * @internal
 * @param {number} logoSize
 * @param {number} logoRatio
 */
function calculateLogoSize(logoSize, logoRatio) {
  if (logoRatio >= 1) {
    return {
      width: logoSize,
      height: logoSize / logoRatio,
    };
  }
  return {
    width: logoSize * logoRatio,
    height: logoSize,
  };
}
