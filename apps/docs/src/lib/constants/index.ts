import { tBuild } from 'static-tree';
export const { node: APP_ROUTE_TREE } = tBuild({
  key: 'APP_ROUTE_TREE',
  pathResolver: () => '',
  build: (builder) =>
    builder.addChild({
      key: 'docs',
      build: (builder) =>
        builder
          .addChild('avatar')
          .addChild('clickoutside')
          .addChild('copy')
          .addChild('intersect')
          .addChild('modal')
          .addChild('movable')
          .addChild('select')
          .addChild('shortcut')
          .addChild('toc'),
    }),
});
