import './App.css'

function App() {
  return (
    <main className="p-8 bg-white min-h-screen">
      {/* Colors Section */}
      <section className="mb-12">
        <h2 className="text-headline-2 text-brown-600 mb-6">Colors</h2>
        
        {/* Base Colors */}
        <article className="mb-8">
          <h3 className="text-headline-3 text-brown-600 mb-4">Base</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brown-600 rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Brown 600</p>
              <p className="text-body-2 text-brown-400">#26231E</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brown-500 rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Brown 500</p>
              <p className="text-body-2 text-brown-400">#43403B</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brown-400 rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Brown 400</p>
              <p className="text-body-2 text-brown-400">#75716B</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brown-300 rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Brown 300</p>
              <p className="text-body-2 text-brown-400">#DAD6D1</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brown-200 rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Brown 200</p>
              <p className="text-body-2 text-brown-400">#EFEEEB</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brown-100 rounded mb-2 border border-brown-300"></div>
              <p className="text-body-1 text-brown-600">Brown 100</p>
              <p className="text-body-2 text-brown-400">#F9F8F6</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-white rounded mb-2 border border-brown-300"></div>
              <p className="text-body-1 text-brown-600">White</p>
              <p className="text-body-2 text-brown-400">#FFFFFF</p>
            </div>
          </div>
        </article>

        {/* Brand Colors */}
        <article>
          <h3 className="text-headline-3 text-brown-600 mb-4">Brand</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brand-orange rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Orange</p>
              <p className="text-body-2 text-brown-400">#F2B68C</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brand-green rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Green</p>
              <p className="text-body-2 text-brown-400">#12B279</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brand-green-soft rounded mb-2 border border-brown-300"></div>
              <p className="text-body-1 text-brown-600">Green</p>
              <p className="text-body-2 text-brown-400">#D7F2E9</p>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-24 bg-brand-red rounded mb-2"></div>
              <p className="text-body-1 text-brown-600">Red</p>
              <p className="text-body-2 text-brown-400">#EB5164</p>
            </div>
          </div>
        </article>
      </section>

      {/* Typography Section */}
      <section>
        <h2 className="text-headline-2 text-brown-600 mb-6">Fonts</h2>
        <div className="space-y-4">
          <div className="p-4 border border-brand-green rounded">
            <p className="text-headline-1">Headline 1</p>
          </div>
          <div className="p-4 border border-brown-300 rounded">
            <p className="text-headline-2 text-brown-600">Headline 2</p>
          </div>
          <div className="p-4 border border-brown-300 rounded">
            <p className="text-headline-3 text-brown-600">Headline 3</p>
          </div>
          <div className="p-4 border border-brown-300 rounded">
            <p className="text-headline-4 text-brown-600">Headline 4</p>
          </div>
          <div className="p-4 border border-brown-300 rounded">
            <p className="text-body-1 text-brown-600">Body 1</p>
          </div>
          <div className="p-4 border border-brown-300 rounded">
            <p className="text-body-2 text-brown-600">Body 2</p>
          </div>
          <div className="p-4 border border-brown-300 rounded">
            <p className="text-body-3 text-brown-600">Body 3</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
