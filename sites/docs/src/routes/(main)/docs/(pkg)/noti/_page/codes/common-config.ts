type store = (
  config?: NotificationCommonConfig,
) => import('@svelte-put/noti').NotificationStoreBuilder;

type NotificationCommonConfig = {
  /**
   * milliseconds to wait and automatically pop the notification.
   * Defaults to `3000`. Set to `false` to disable
   */
  timeout?: number | false;
  /**
   * id generator for notifications. Defaults to 'uuid'.
   *
   * @remarks
   *   - counter: use an auto-incremented counter that is scoped to the store
   *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
   *   - callback: a custom function that accepts {@link NotificationInstanceConfig} and returns a string as the id
   */
  id?:
    | 'counter'
    | 'uuid'
    | ((config: {
        /* NotificationInstanceConfig, omitted for conciseness */
      }) => string);
};
