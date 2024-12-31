"use client";
import React from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({
  error,
}: ErrorPageProps): React.JSX.Element {
  return (
    <div>
      <h1 className="text-xl bold">
        Sorry! We couldn&apos;t create the snippet you were looking for.{" "}
      </h1>
      <p>{error?.message} </p>
    </div>
  );
}
