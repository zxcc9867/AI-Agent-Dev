'use client'

import { useState } from 'react'
import { FiPlay, FiLoader } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function CodeExecutor() {
  const [code, setCode] = useState('console.log("Hello, World!");')
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)

  const executeCode = async () => {
    setIsExecuting(true)
    setOutput('')

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setOutput(data.output || '실행 완료 (출력 없음)')
        toast.success('코드가 성공적으로 실행되었습니다!')
      } else {
        setOutput(data.error || '실행 중 오류가 발생했습니다.')
        toast.error('코드 실행 실패')
      }
    } catch (error) {
      setOutput('서버 연결 오류가 발생했습니다.')
      toast.error('서버 연결 실패')
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
        </select>

        <button
          onClick={executeCode}
          disabled={isExecuting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {isExecuting ? (
            <>
              <FiLoader className="animate-spin" size={16} />
              <span>실행 중...</span>
            </>
          ) : (
            <>
              <FiPlay size={16} />
              <span>실행</span>
            </>
          )}
        </button>
      </div>

      <div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="여기에 코드를 작성하세요..."
        />
      </div>

      {output && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-gray-700">실행 결과:</h4>
          <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
            <code className="text-sm">{output}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
