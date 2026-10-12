// Turns Obsidian callouts (`> [!note] Title`) into <aside class="callout callout-note">.
import { visit } from 'unist-util-visit';

const RE = /^\[!(\w+)\]([+-]?)[ \t]*(.*)$/;

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const para = node.children[0];
      const first = para?.type === 'paragraph' ? para.children[0] : null;
      if (first?.type !== 'text') return;
      const [line, ...rest] = first.value.split('\n');
      const m = line.match(RE);
      if (!m) return;
      const type = m[1].toLowerCase();
      const title = m[3] || type.charAt(0).toUpperCase() + type.slice(1);

      // Drop the marker line from the body; keep anything after it.
      if (rest.length) first.value = rest.join('\n');
      else {
        para.children.shift();
        if (para.children[0]?.type === 'break') para.children.shift();
        if (!para.children.length) node.children.shift();
      }

      node.data = { hName: 'aside', hProperties: { className: ['callout', `callout-${type}`] } };
      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['callout-title'] } },
        children: [{ type: 'text', value: title }],
      });
    });
  };
}
