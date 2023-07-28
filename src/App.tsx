import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto h-screen">
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-8">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="block h-[150px]" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="block h-[150px]" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold">Vite + React</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            className="rounded-md bg-slate-700 px-4 py-2 text-white"
            onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit{' '}
            <code className="inline-flex items-center space-x-4 rounded-lg bg-slate-700 px-2 py-1 text-left text-sm text-white sm:text-base">
              src/App.tsx
            </code>{' '}
            and save to test HMR
          </p>
        </div>
        <p>Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  )
}

export default App
