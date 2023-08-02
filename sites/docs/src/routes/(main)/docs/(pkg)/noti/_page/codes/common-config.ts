type store = (
  config?: NotificationCommonConfig,
) => import('@svelte-put/noti').NotificationStoreBuilder;

type NotificationCommonConfig = {
  /**
   * id generator for notifications. Defaults to 'uuid'.
   *
   * @remarks
   *   - counter - use an auto-incremented counter that is scoped to the store
   *   - uuid - use `crypto.randomUUID()`, fallback to `counter` if not available
   *   - function - custom function that accepts a NotificationInstanceConfig and returns a string as the id
   */
  id?:
    | 'uuid'
    | 'counter'
    | ((config: {
        /* NotificationInstanceConfig, omitted for conciseness */
      }) => string);
  /**
   * milliseconds to wait and automatically pop the notification.
   * Defaults to `3000`. Set to `false` to disable
   */
  timeout?: number | false;
};
