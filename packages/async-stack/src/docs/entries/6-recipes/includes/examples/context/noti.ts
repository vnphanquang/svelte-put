import { stack } from '@svelte-put/async-stack';

export const notiStack = stack({/* common config */}).addVariant('name' /* specific config */);
