export default function Collections() {
    return (
      <section className="min-h-screen bg-neutral-900 text-white py-32 px-10">
  
        <div className="text-center mb-20">
          <h2 className="text-5xl tracking-widest">FEATURED COLLECTIONS</h2>
        </div>
  
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
  
          <div className="bg-neutral-800 p-16 text-center">
            Royal Linen
          </div>
  
          <div className="bg-neutral-800 p-16 text-center">
            Desert Cotton
          </div>
  
          <div className="bg-neutral-800 p-16 text-center">
            Silk Haven
          </div>
  
        </div>
  
      </section>
    );
  }