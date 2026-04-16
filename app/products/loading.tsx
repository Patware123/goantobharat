export default function LoadingProducts() {
  return (
    <div className="bg-surface min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-[family-name:var(--font-display)] font-semibold mb-12 text-tertiary">Our Harvest</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-surface-container rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(28,28,25,0.02)] animate-pulse">
              <div className="w-full h-56 bg-surface-container-highest"></div>
              <div className="p-8">
                <div className="h-4 bg-surface-container-highest rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-surface-container-highest rounded w-2/3 mb-6"></div>
                
                <div className="flex gap-2">
                  <div className="h-10 bg-surface-container-highest rounded-xl w-1/4"></div>
                  <div className="h-10 bg-surface-container-highest rounded-xl w-1/4"></div>
                </div>
                
                <div className="h-12 bg-surface-container-highest rounded-xl mt-6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
