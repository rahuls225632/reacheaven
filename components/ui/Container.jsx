import { cn } from "@/lib/cn";

export default function Container({ as: Tag = "div", className, children }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
