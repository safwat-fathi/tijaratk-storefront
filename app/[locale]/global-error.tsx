"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: Readonly<GlobalErrorProps>) {
  return (
    <html>
      <body>
        <h1>Something went wrong. {error.message}</h1>
        <button className="btn btn-outline" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  );
}
