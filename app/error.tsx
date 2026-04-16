"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-error-container text-on-error-container p-4 rounded-full mb-6">
        <span className="material-symbols-outlined text-4xl">error</span>
      </div>
      <h2 className="text-3xl font-[family-name:var(--font-display)] font-bold text-tertiary mb-2">Something went wrong!</h2>
      <p className="text-on-surface-variant max-w-md mb-8">
        We encountered an unexpected harvest error. Please try refreshing the page or head back to the farm.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary text-on-primary px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition transition-all"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-surface-container-highest text-on-surface-variant px-8 py-3 rounded-2xl font-bold hover:bg-surface-container-high transition transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
