import { getCommands } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import React from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function Editor(
  props: React.ComponentProps<typeof MDEditor> & {
    colorMode?: "light" | "dark";
  }
) {
  const disabledCommands = [
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
    <MDEditor
      {...props}
      data-color-mode={props.colorMode || "light"}
      commandsFilter={(command) => {
        if (disabledCommands.includes(command.name!)) {
          return false;
        }
        return command;
      }}
    />
  );
}

export default Editor;
