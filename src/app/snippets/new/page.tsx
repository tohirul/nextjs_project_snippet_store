"use client";
import { create_snippet } from "@/server_actions";
// import { redirect } from "next/navigation";
import React, { useActionState } from "react";

// Component for the snippet creation form
export default function SnippetCreatePage(): React.JSX.Element {
  const [create_snippet_form_state, create_snippet_action] = useActionState(
    create_snippet,
    {
      message: "",
    }
  );

  return (
    <form action={create_snippet_action}>
      <h3 className="font-bold m-3">Create A Snippet</h3>
      <div className="flex flex-col gap-4">
        {/* Title Field */}
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            id="code"
            className="w-full p-2 border rounded"
          />
        </div>
        {
          // Display the error message if there is one
          create_snippet_form_state?.message && (
            <div className="text-red-500">
              {create_snippet_form_state.message}
            </div>
          )
        }
        <button className="rounded p-2 bg-blue-200" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
