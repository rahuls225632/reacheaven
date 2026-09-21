import * as icons from "lucide-react";

/** Resolves a lucide-react icon by name (as stored in data/*.js). Falls back to a generic mark. */
export function getIcon(name) {
  return icons[name] || icons.Sparkle;
}
