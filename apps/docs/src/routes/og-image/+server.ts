import { Resvg } from '@resvg/resvg-js';
import type { RequestHandler } from '@sveltejs/kit';
import satori from 'satori';
import { html as toReactNode } from 'satori-html';

import FiraCode from '../../../static/fonts/FiraCode/woff/FiraCode-Regular.woff';

import OgImage from './OgImage.svelte';

const height = 630;
const width = 1200;

export const GET: RequestHandler = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = OgImage.render();
  const element = toReactNode(`${result.html}<style>${result.css.code}</style>`);

  // FIXME: satori currently does not support
  // 3D transform
  // perhaps research something that can render html to png directly
  // and skip svg step?

  const svg = await satori(element, {
    fonts: [
      {
        name: 'Fira Code',
        data: Buffer.from(FiraCode),
        style: 'normal',
      },
    ],
    height,
    width,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      'content-type': 'image/png',
    },
  });
};
