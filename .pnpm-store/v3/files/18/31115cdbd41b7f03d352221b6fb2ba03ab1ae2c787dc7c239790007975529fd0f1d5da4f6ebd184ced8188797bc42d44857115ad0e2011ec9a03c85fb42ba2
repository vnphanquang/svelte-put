<g>
{@html raw}
</g>

<script>
  /* eslint-disable no-unused-vars */
  let cursor = 0xd4937;
  function getId() {
    cursor += 1;
    return `fa-${cursor.toString(16)}`;
  }

  let raw;

  export let data;

  function getRaw(data) {
    if (!data || !data.raw) {
      return null;
    }
    let rawData = data.raw;
    const ids = {};
    rawData = rawData.replace(/\s(?:xml:)?id=["']?([^"')\s]+)/g, (match, id) => {
      const uniqueId = getId();
      ids[id] = uniqueId;
      return ` id="${uniqueId}"`;
    });

    rawData = rawData.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (match, rawId, _, pointerId) => {
      const id = rawId || pointerId;
      if (!id || !ids[id]) {
        return match;
      }
      return `#${ids[id]}`;
    });
    return rawData;
  }

  $: raw = getRaw(data);
</script>
