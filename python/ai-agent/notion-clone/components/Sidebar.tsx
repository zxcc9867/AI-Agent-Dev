'use client'

import { useState, useEffect } from 'react'
import { FiPlus, FiFile } from 'react-icons/fi'
import { usePageStore } from '@/lib/store'

export default function Sidebar() {
  const { pages, currentPageId, addPage, setCurrentPageId } = usePageStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addNewPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      title: '제목 없음',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    addPage(newPage)
    setCurrentPageId(newPage.id)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`

    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">📝 Notion Clone</h1>
      </div>

      <button
        onClick={addNewPage}
        className="w-full flex items-center gap-2 px-3 py-2 mb-4 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
      >
        <FiPlus size={16} />
        <span>새 페이지</span>
      </button>

      <div className="space-y-1">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setCurrentPageId(page.id)}
            className={`w-full flex flex-col items-start gap-1 px-3 py-2 text-sm rounded-md transition-colors ${
              currentPageId === page.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2 w-full">
              <FiFile size={14} />
              <span className="truncate flex-1 text-left">{page.title}</span>
            </div>
            {mounted && (
              <span className="text-xs text-gray-400 ml-5">
                {formatDate(page.createdAt)}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  )
}
