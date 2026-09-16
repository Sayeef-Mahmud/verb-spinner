import React, { useEffect, useState } from "react";
import { CLAUDE_SPINNER_VERBS, randomClaudeVerb, type ClaudeSpinnerVerb } from "./verbs";

export interface VerbSpinnerProps {
  /** Pin a specific verb instead of picking one randomly. */
  verb?: ClaudeSpinnerVerb;
  /** Milliseconds between picking a new random verb. Omit to pick once and hold. */
  cycleMs?: number;
  /** Spinner + text size in pixels. Default 16. */
  size?: number;
  /** CSS color for the spinner and text. Overrides auto-contrast from `background`. Default "currentColor". */
  color?: string;
  /** Hex color of the surface behind the loader. When set (and `color` isn't), text auto-picks black or white for contrast. */
  background?: string;
  /** Append this after the verb, e.g. "…". Default "…". */
  suffix?: string;
  /** Replace the default braille spinner with your own element. Receives no props — animate it yourself. */
  spinner?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const FRAME_INTERVAL_MS = 80;

/**
 * Picks black or white for the best contrast against a hex background color
 * (relative luminance, ITU-R BT.601). Falls back to black for unparseable input.
 */
export function contrastColor(hex: string): "#000000" | "#ffffff" {
  const match = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex.trim());
  if (!match) return "#000000";
  let normalized = match[1];
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-verb-spinner", "");
  style.textContent = `
    .verb-spinner {
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }
    .verb-spinner__spinner {
      display: inline-block;
      width: 1em;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
}

/**
 * A loading indicator styled after Claude Code's CLI spinner: a braille
 * spinner paired with a randomly chosen whimsical verb (e.g. "Marinating…").
 */
export function VerbSpinner({
  verb,
  cycleMs,
  size = 16,
  color,
  background,
  suffix = "…",
  spinner,
  className,
  style,
}: VerbSpinnerProps) {
  useEffect(() => {
    injectStyles();
  }, []);

  const [pickedVerb, setPickedVerb] = useState<ClaudeSpinnerVerb>(() => verb ?? randomClaudeVerb());
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (verb) return;
    if (!cycleMs) return;
    const id = setInterval(() => setPickedVerb(randomClaudeVerb()), cycleMs);
    return () => clearInterval(id);
  }, [verb, cycleMs]);

  useEffect(() => {
    if (spinner) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), FRAME_INTERVAL_MS);
    return () => clearInterval(id);
  }, [spinner]);

  const displayVerb = verb ?? pickedVerb;
  const resolvedColor = color ?? (background ? contrastColor(background) : "currentColor");

  return (
    <span
      className={["verb-spinner", className].filter(Boolean).join(" ")}
      style={{ fontSize: size, color: resolvedColor, ...style }}
      role="status"
      aria-live="polite"
      aria-label={`${displayVerb}${suffix}`}
    >
      <span className="verb-spinner__spinner" aria-hidden="true">
        {spinner ?? FRAMES[frame]}
      </span>
      <span>
        {displayVerb}
        {suffix}
      </span>
    </span>
  );
}

export { CLAUDE_SPINNER_VERBS, randomClaudeVerb };
export type { ClaudeSpinnerVerb };
export default VerbSpinner;
