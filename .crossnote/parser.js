({
  onWillParseMarkdown: async function (markdown) {
    return markdown.replace(
      /\\begin\{algorithm\}/g,
      (whole) => `
<pre class="algorithm">
${whole}`,
    ).replace(
      /\\end\{algorithm\}/g,
      (whole) => `${whole}
</pre>`,
    );
  },

  onDidParseMarkdown: async function (html) {
    return html;
  },

  onWillTransformMarkdown: async function (markdown) {
    return markdown;
  },

  onDidTransformMarkdown: async function (markdown) {
    return markdown.replace(
      /\<pre class\=\"algorithm\"\>/g,
      () => ``,
    ).replace(
      /\<\/pre\>/g,
      () => ``,
    );
  },
});