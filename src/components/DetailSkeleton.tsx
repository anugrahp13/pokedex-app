export default function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
      </div>
      <main className="max-w-3xl mx-auto px-6 py-6 flex flex-col gap-8">
        {/* Hero skeleton */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-2xl bg-white/5 animate-pulse" />
          <div className="flex flex-col gap-3 w-full">
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-white/10 rounded-full animate-pulse" />
              <div className="h-5 w-16 bg-white/10 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        {/* Stats skeleton */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-16 h-3 bg-white/10 rounded animate-pulse" />
              <div className="w-8  h-3 bg-white/10 rounded animate-pulse" />
              <div className="flex-1 h-2 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}