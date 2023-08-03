type SvelteComponentClass = import('svelte').ComponentType<import('svelte').SvelteComponent>;

type variant = (
  variant: string,
  config: NotificationVariantConfig | SvelteComponentClass,
) => import('@svelte-put/noti').NotificationStoreBuilder;

type NotificationVariantConfig = {
  /** extends NotificationCommonConfig, omitted for conciseness */
  variant: string;
  component: SvelteComponentClass;
  props?: {
    /** inferred props for component */
  };
};
