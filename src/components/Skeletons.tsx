export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex gap-3">
        <div className="skeleton h-14 w-14 rounded-lg" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="skeleton h-5 w-2/3" />
          <div className="skeleton h-4 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex justify-between border-t border-dashed border-line pt-3">
        <div className="skeleton h-8 w-1/3" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="লোড হচ্ছে…"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
