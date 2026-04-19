/**
 * HealthTestPanel – Presentational Component
 * รับผิดชอบเฉพาะการแสดงผล (UI) ไม่มี business logic
 * Separation of Concerns: แยกจาก useHealthTest (logic)
 */

function HealthTestPanel({ loading, result, error, onTest, onReset }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 text-center shadow-lg mb-6 w-full max-w-2xl">
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onTest}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Test /posts'}
      </button>

      {!loading && (result || error) && onReset && (
        <button
          type="button"
          className="ml-3 text-slate-400 hover:text-white text-sm"
          onClick={onReset}
        >
          Clear
        </button>
      )}

      {loading && (
        <div className="mt-4">
          <div
            className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"
            aria-hidden
          />
        </div>
      )}

      {result && !loading && (
        <div className="mt-6 text-left">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <pre className="bg-slate-700 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 text-left">
          <h3 className="text-xl font-semibold mb-2 text-red-400">Error</h3>
          <pre className="bg-slate-700 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default HealthTestPanel
