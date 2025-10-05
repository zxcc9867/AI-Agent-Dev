'use client'

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { useState } from 'react'
import { FiPlay, FiLoader } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ExecutableCodeBlock({ node, updateAttributes, editor }: any) {
  const [output, setOutput] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const language = node.attrs.language || 'javascript'
  const isEditable = editor.isEditable

  const executeCode = async () => {
    setIsExecuting(true)
    setOutput('')

    const code = node.textContent

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
    <NodeViewWrapper className="executable-code-block">
      <div className="relative group">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg" contentEditable={false}>
          <select
            value={language}
            onChange={(e) => updateAttributes({ language: e.target.value })}
            className="bg-gray-700 text-white text-sm px-3 py-1 rounded border-none outline-none cursor-pointer"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="typescript">TypeScript</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <button
            onClick={executeCode}
            disabled={isExecuting}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {isExecuting ? (
              <>
                <FiLoader className="animate-spin" size={14} />
                <span>실행 중...</span>
              </>
            ) : (
              <>
                <FiPlay size={14} />
                <span>실행</span>
              </>
            )}
          </button>
        </div>

        <NodeViewContent as="pre" className="code-block-content" />

        {output && (
          <div className="bg-gray-900 text-gray-100 px-4 py-3 rounded-b-lg border-t border-gray-700">
            <div className="text-xs text-gray-400 mb-1">실행 결과:</div>
            <pre className="text-sm whitespace-pre-wrap overflow-x-auto">{output}</pre>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
