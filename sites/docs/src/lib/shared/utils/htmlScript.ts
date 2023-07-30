import { partytownSnippet } from '@builder.io/partytown/integration';

export function createPartytownSnippetScriptTag() {
  return `<script>${partytownSnippet()}</script>`;
}

export function createGtagScriptTag(id: string) {
  return `<script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`;
}
