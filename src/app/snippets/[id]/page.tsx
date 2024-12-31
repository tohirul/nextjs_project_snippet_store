import React from "react";
import { database } from "@/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Snippet } from "@prisma/client";
import { deleteSnippet } from "@/server_actions";
interface Page_props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetPage({
  params,
}: Page_props): Promise<React.JSX.Element> {
  const { id } = await params;

  if (!id) notFound();
  const snippet: Snippet | null = await database.snippet.findUnique({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }
  const remove_snippet = deleteSnippet.bind(null, parseInt(id));
  return (
    <div>
      <h3 className="text-xl font-bold m-3">Content</h3>
      <div className="flex m-4 justify-between items-center">
        <h3>{snippet.title}</h3>
        <div className="flex gap-4">
          <Link className="p-2 border rounded" href={`/snippets/${id}/edit`}>
            Edit
          </Link>
          <form action={remove_snippet}>
            <button className="p-2 border rounded">Delete</button>
          </form>

          <Link href={"/"} className="p-2 border rounded">
            Back
          </Link>
        </div>
      </div>
      <pre className="p-4 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await database.snippet.findMany();
  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}
