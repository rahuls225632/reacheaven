import { getIcon } from "@/lib/icons";

/**
 * Renders a lucide-react icon looked up by name (as stored in data/*.js).
 * getIcon always returns a stable reference from lucide-react's export map,
 * so this dynamic lookup is safe despite looking like a per-render component.
 */
export default function Icon({ name, ...props }) {
  const Component = getIcon(name);
  // eslint-disable-next-line react-hooks/static-components
  return <Component {...props} />;
}
