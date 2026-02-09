import { HealthTestPanel } from '../components/healthTest'
import { useHealthTest } from '../hooks/useHealthTest'

/**
 * HealthTestPage – Container / Page
 * หน้าที่เดียว: รวม hook (logic) กับ UI components
 * ไม่มี state หรือ business logic ในตัว
 */
function HealthTestPage() {
  const { result, error, loading, testHealth, reset } = useHealthTest()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-6">
      <header>
        <h1 className="text-4xl font-bold mb-6">Health Test</h1>
      </header>

      <HealthTestPanel
        loading={loading}
        result={result}
        error={error}
        onTest={testHealth}
        onReset={reset}
      />
    </div>
  )
}

HealthTestPage.displayName = 'HealthTestPage'

export default HealthTestPage
