/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

function prepare() {
  return new NotiStoreBuilder();
}

type NotiStoreValue = {
  portal: HTMLElement;
  notis: SvelteComponent[];
};

type PushedNoti = {
  id: string;
  variant: string;
  component: SvelteComponent;
  // resolve for await, like modal
};

type PushedConfig = {
  id?: string;
  component: ComponentType<SvelteComponent>;
  props: ComponentProps<SvelteComponent>;
};

type NotiPushInput<Variant extends string, Component extends SvelteComponent> = {
  variant: Variant;
  id?:
    | 'auto'
    | ((variant: string, config: Omit<NotiPushInput<Variant, Component>, 'id'>) => string);
  ms?: number;
  component: ComponentType<Component>;
  props?: ComponentProps<Component>;
};

class NotiStoreBuilder<VariantMap extends Record<string, SvelteComponent> = {}> {
  variantConfigMap: Record<
    keyof VariantMap,
    {
      component: ComponentType<SvelteComponent>;
      props?: Record<string, any>;
    }
  > = {} as any;

  variant<Variant extends string, Component extends SvelteComponent>(
    variant: Variant,
    config: {
      component: ComponentType<Component>;
      props?: Partial<ComponentProps<Component>>;
    },
  ): NotiStoreBuilder<VariantMap & Record<Variant, Component>> {
    (this.variantConfigMap as any)[variant] = config;
    return this;
  }

  build<VariantKey extends keyof VariantMap = keyof VariantMap>() {
    const variantConfigMap = this.variantConfigMap;

    const { subscribe, set, update } = writable<PushedConfig[]>();

    function push(
      variant: VariantKey,
      config: {
        props: ComponentProps<VariantMap[VariantKey]>;
      },
    ): void;
    function push<Component extends SvelteComponent>(
      variant: 'custom',
      config: {
        component: ComponentType<Component>;
        props: ComponentProps<Component>;
      },
    ): void;
    function push(
      variant: 'custom' | VariantKey,
      config: {
        component?: ComponentType<SvelteComponent>;
        props: Record<string, any>;
      },
    ): void {
      update((notis) => {
        let Component: ComponentType<SvelteComponent>;
        let props: Record<string, any> = {};
        if (variant === 'custom') {
          if (!config.component)
            throw new Error('A Svelte component must be provided with custom push');
          Component = config.component;
          props = config.props ?? {};
        } else {
          const config = variantConfigMap[variant];
          Component = config.component;
          props = {
            ...variantConfigMap[variant],
            ...config.props,
          };
        }

        return [...notis];
      });
    }

    return {
      subscribe,
      push,
    };
  }
}

class Noti extends SvelteComponent<{ kind: 'error' | 'info' }> {}

const notiStore = prepare()
  .variant('info', {
    component: Noti,
    props: {
      kind: 'info',
    },
  })
  .variant('error', {
    component: Noti,
    props: {
      kind: 'error',
    },
  })
  .build();

// notiStore.push('');
