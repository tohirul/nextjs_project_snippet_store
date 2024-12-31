"use client";
import React, { useState } from "react";
import { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import Link from "next/link";
import { updateSnippet } from "@/server_actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({
  snippet,
}: SnippetEditFormProps): React.JSX.Element {
  const [updated_snippet, setUpdated_snippet] = useState(snippet?.code || "");

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    setUpdated_snippet(value);
  };

  // const update_code = (value: string | undefined) => {
  //   if (!value) return;

  //   startTransition(async () => {
  //     await updateSnippet(value, snippet.id);
  //   });
  //   redirect(`/snippets/${snippet.id}`);
  // };

  const update_code = updateSnippet.bind(null, updated_snippet, snippet.id);
  return (
    <div className="">
      <h3 className="text-xl font-bold m-3">Edit Snippet {snippet?.title} </h3>

      <Editor
        height={"70vh"}
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet?.code}
        options={{
          wordWrap: "on",
          fontSize: 16,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: "on",
          wrappingIndent: "same",
          tabSize: 2,
          insertSpaces: true,
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          renderLineHighlight: "all",
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: true,
          cursorStyle: "line",
          cursorWidth: 2,
          cursorSurroundingLines: 0,
          autocapitalize: "none",
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "advanced",
          autoIndentOnPaste: "advanced",
          autoIndentOnPasteDetectIndentation: "advanced",
          autoSurround: "languageDefined",
        }}
        onChange={handleEditorChange}
      />
      <form action={update_code} className="">
        <div className="my-4 flex gap-4">
          <button className="rounded p-2 bg-blue-200" type="submit">
            Update
          </button>
          <button className="rounded p-2 bg-red-200" type="reset">
            Reset
          </button>
          <Link
            href={`/snippets/${snippet?.id}`}
            className="rounded p-2 bg-green-200 text-center"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
