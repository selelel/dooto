"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Editor(props: React.ComponentProps<typeof MDEditor>) {
  const { resolvedTheme } = useTheme();

  const disabled = [
    "image",
    "divider",
    "table",
    "code",
    "codeBlock",
    "comment",
    "strikethrough",
    "quote",
  ];

  return (
    <div data-color-mode={resolvedTheme ?? "light"}>
      <MDEditor
        {...props}
        commandsFilter={(cmd) => (disabled.includes(cmd.name!) ? false : cmd)}
      />
    </div>
  );
}
