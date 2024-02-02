declare module '@svelte-put/cloudflare-turnstile' {
  import type { ActionReturn } from 'svelte/action';
  export function turnstile(node: HTMLElement): TurnstileActionReturn;
  type Turnstile = {
    render: (element: string | HTMLElement, config: TurnstileConfig) => string;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
    getResponse: (widgetId: string) => string | undefined;
    isExpired: (widgetId: string) => boolean;
    execute: (container: string | HTMLElement, config?: TurnstileConfig) => void;
  };

  type TurnstileConfig = TurnstileDataConfig & TurnstileEventConfig;

  type TurnstileDataConfig = {
    sitekey: string;
    action?: string;
    cData?: string;
    execution?: string;
    theme?: 'light' | 'dark' | 'auto';
    language?: string;
    tabindex?: number;
    'response-field'?: boolean;
    'response-field-name'?: string;
    size?: 'normal' | 'compact';
    retry?: 'auto' | 'never';
    'retry-interval'?: number;
    'refresh-expired'?: 'auto' | 'manual' | 'never' | 'auto';
    appearance?: 'always' | 'execute' | 'interaction-only';
  };

  type TurnstileEventConfig = {
    callback?: (token: string) => void;
    'error-callback'?: (code: string) => void;
    'expired-callback'?: () => void;
    'before-interactive-callback'?: () => void;
    'after-interactive-callback'?: () => void;
    'unsupported-callback'?: () => void;
    'timeout-callback'?: () => void;
  };

  type TurnstileDataAttributes = {
    [K in keyof TurnstileDataConfig as K extends string
      ? `turnstile-${K}`
      : never]: TurnstileDataConfig[K];
  };

  type TurnstileEventDetail<T extends Record<string, any> = Record<string, never>> = {
    widgetId: string;
    turnstile: Turnstile;
  } & T;

  type TurnstileEventAttributes = {
    'on:turnstile'?: (event: CustomEvent<TurnstileEventDetail<{ token: string }>>) => void;
    'on:turnstile:error'?: (event: CustomEvent<TurnstileEventDetail<{ code: string }>>) => void;
    'on:turnstile:expired'?: (event: CustomEvent<TurnstileEventDetail>) => void;
    'on:turnstile:before-interactive'?: (event: CustomEvent<TurnstileEventDetail>) => void;
    'on:turnstile:after-interactive'?: (event: CustomEvent<TurnstileEventDetail>) => void;
    'on:turnstile:unsupported'?: (event: CustomEvent<TurnstileEventDetail>) => void;
    'on:turnstile:timeout'?: (event: CustomEvent<TurnstileEventDetail>) => void;
  };

  /**
   * @see {@link https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations | Cloudflare Turnstile Docs}
   * */
  type TurnstileAttributes = TurnstileDataAttributes &
    TurnstileEventAttributes & {
      /**
       * default to `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`
       */
      'turnstile-script-src'?: string;
      readonly 'turnstile-widget-id'?: string;
      readonly 'turnstile-rendered'?: boolean;
    };

  /**
   * parameter received from action input
   * */
  type TurnstileParameter = undefined;

  type TurnstileActionReturn = ActionReturn<TurnstileParameter, TurnstileAttributes>;
}

//# sourceMappingURL=index.d.ts.map
