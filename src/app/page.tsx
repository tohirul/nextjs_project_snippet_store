import { database } from "@/database";
import Link from "next/link";

export default async function Home() {
  const snippets = await database.snippet.findMany();

  return (
    <div>
      <h3 className="text-xl font-bold m-3">Home</h3>
      <div className="flex flex-col gap-4">
        <Link href="/snippets/new" className="rounded p-2 bg-blue-200">
          Create Snippet
        </Link>
        {snippets.map((snippet) => (
          <Link
            key={snippet.id}
            href={`/snippets/${snippet.id}`}
            className="flex justify-between items-center p-2 border rounded"
          >
            <h4>{snippet.title}</h4>
            <pre>{snippet.code}</pre>
            <p>view</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
