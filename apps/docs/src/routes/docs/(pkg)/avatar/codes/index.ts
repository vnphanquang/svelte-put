import customMarkup from './custom.markup.svelte?raw';
import customStyling from './custom.styling.svelte?raw';
import direct from './direct.svelte?raw';
import gravatarHelper from './gravatar.helper.svelte?raw';
import gravatarMinimal from './gravatar.minimal.svelte?raw';
import gravatarVerbose from './gravatar.verbose.svelte?raw';
import priorityJs from './js.generated/priority.code.js.svelte?raw';
import multiple from './multiple.svelte?raw';
import priorityTs from './priority.code.svelte?raw';
import uiAvatarHelper from './uiAvatar.helper.svelte?raw';
import uiAvatarMinimal from './uiAvatar.minimal.svelte?raw';
import uiAvatarVerbose from './uiAvatar.verbose.svelte?raw';

export const codes = {
  priority: {
    Typescript: priorityTs,
    Javascript: priorityJs,
  },
  usage: {
    gravatar: {
      Minimal: gravatarMinimal,
      Verbose: gravatarVerbose,
      Helper: gravatarHelper,
    },
    uiAvatar: {
      Minimal: uiAvatarMinimal,
      Verbose: uiAvatarVerbose,
      Helper: uiAvatarHelper,
    },
    direct,
    multiple,
    custom: {
      markup: customMarkup,
      styling: customStyling,
    },
  },
} as const;
