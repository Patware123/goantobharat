export default function Loading() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">GTB</span>
        </div>
      </div>
      <p className="mt-6 text-tertiary font-medium animate-pulse tracking-widest uppercase text-xs">Fetching Freshness...</p>
    </div>
  );
}
