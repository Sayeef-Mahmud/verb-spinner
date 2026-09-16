# @sayeef-mahmud/verb-spinner

A loading spinner paired with a randomly picked verb from Claude Code's own
list of 185 status words (`Marinating`, `Noodling`, `Combobulating`,
`Flibbertigibbeting`, ...), extracted directly from the `claude.exe` v2.1.273
binary. No CSS framework required — styles are injected inline at runtime.

## Usage

```tsx
import { ClaudeLoader } from "@sayeef-mahmud/verb-spinner";

function App() {
  return <ClaudeLoader />;
}
```

Picks one random verb on mount and holds it (matching how Claude Code itself
behaves — one verb per turn, not a cycling ticker).

### Props

| Prop       | Type                | Default          | Description                                               |
| ---------- | ------------------- | ---------------- | ----------------------------------------------------------- |
| `verb`       | `ClaudeSpinnerVerb`   | random           | Pin a specific verb instead of picking randomly.             |
| `cycleMs`    | `number`              | none (hold)      | Re-pick a random verb every N ms.                            |
| `size`       | `number`              | `16`             | Font size in px for spinner + text.                           |
| `color`      | `string`              | `"currentColor"` | CSS color. Overrides auto-contrast from `background`.        |
| `background` | `string` (hex)        | -                | Surface color behind the loader. When set (and `color` isn't), text auto-picks black or white for contrast. |
| `suffix`     | `string`              | `"…"`            | Appended after the verb.                                      |
| `spinner`    | `React.ReactNode`     | -                | Replace the default braille spinner with your own element (e.g. an animated SVG or icon). |
| `className`  | `string`              | -                | Extra class on the wrapping `<span>`.                        |
| `style`      | `React.CSSProperties` | -                | Extra inline styles on the wrapping `<span>`.                |

### Cycling example

```tsx
<ClaudeLoader cycleMs={2000} size={20} color="#d97757" />
```

### Auto-contrast against a changing background

```tsx
<ClaudeLoader background={bgColor} />
```

### Custom spinner

```tsx
<ClaudeLoader spinner={<MySpinnerIcon />} />
```

The `spinner` prop fully replaces the default braille animation — animate your
own element however you like (CSS keyframes, a GIF, an SVG loop, etc).

You can also use the auto-contrast helper directly:

```ts
import { contrastColor } from "@sayeef-mahmud/verb-spinner";

contrastColor("#0d7a6c"); // "#ffffff"
```

### Using just the verb list

```ts
import { CLAUDE_SPINNER_VERBS, randomClaudeVerb } from "@sayeef-mahmud/verb-spinner";
```

## Build

```
npm install
npm run build
```
