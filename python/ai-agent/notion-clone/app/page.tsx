'use client'

import Editor from '@/components/Editor'
import Sidebar from '@/components/Sidebar'
import { usePageStore } from '@/lib/store'

export default function Home() {
  const currentPageId = usePageStore((state) => state.currentPageId)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-8 px-4">
          {currentPageId && <Editor pageId={currentPageId} />}
        </div>
      </main>
    </div>
  )
}
