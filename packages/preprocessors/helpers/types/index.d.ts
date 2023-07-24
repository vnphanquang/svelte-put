declare module '@svelte-put/preprocess-helpers' {
  export function getAttribute(
    source: string,
    node: Node,
    attributeName: string,
  ): string | undefined;

  export function getAttributes(source: string, node: Node): Record<string, string>;
  export type BaseNode = import('estree').BaseNode;
  export type Node = BaseNode & {
    name: string;
    start: number;
    end: number;
    attributes: Array<{
      name: string;
      type: string;
      value?: any[];
      start: number;
      end: number;
    }>;
    children?: Array<Node>;
    data?: any;
  };
}

//# sourceMappingURL=index.d.ts.map
