import { tBuild } from 'static-tree';
export const { node: APP_ROUTE_TREE } = tBuild('APP_ROUTE_TREE', {
  pathResolver: () => '',
  build: (builder) =>
    builder
      .addChild('docs', {
        build: (builder) =>
          builder
            .addChild('avatar')
            .addChild('clickoutside')
            .addChild('copy')
            .addChild('dragscroll')
            .addChild('intersect')
            .addChild('modal')
            .addChild('movable')
            .addChild('preprocessAutoSlug', {
              pathResolver: () => 'preprocess-auto-slug',
            })
            .addChild('select')
            .addChild('shortcut')
            .addChild('toc'),
      })
      .addChild('humans', {
        pathResolver: () => 'humans.txt',
      })
      .addChild('sitemap', {
        pathResolver: () => 'sitemap.xml',
      }),
});
