'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Youtube } from '@tiptap/extension-youtube'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { common, createLowlight } from 'lowlight'
import { useEffect, useState } from 'react'
import { usePageStore } from '@/lib/store'
import { SlashCommand } from '@/lib/slash-command'
import { ExecutableCodeBlockExtension } from '@/lib/executable-code-block'

const lowlight = createLowlight(common)

interface EditorProps {
  pageId: string
}

export default function Editor({ pageId }: EditorProps) {
  const { getPage, updatePageTitle, updatePageContent } = usePageStore()
  const currentPage = getPage(pageId)
  const [mounted, setMounted] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      ExecutableCodeBlockExtension.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      SlashCommand,
    ],
    content: currentPage?.content || `
      <h2>환영합니다! 👋</h2>
      <p>이 페이지에서 노트를 작성하고, 코드를 실행할 수 있습니다.</p>
      <h3>기능:</h3>
      <ul>
        <li>마크다운 스타일 편집</li>
        <li>코드 블록 작성</li>
        <li>실시간 코드 실행</li>
      </ul>
      <p>아래에 코드 실행기를 사용해보세요!</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      updatePageContent(pageId, html)
    },
  }, [pageId])

  const handleTitleChange = (newTitle: string) => {
    updatePageTitle(pageId, newTitle)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (editor && currentPage) {
      editor.commands.setContent(currentPage.content || '')
    }
  }, [pageId, editor, currentPage])

  if (!editor || !currentPage) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <input
        type="text"
        value={currentPage.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="text-4xl font-bold border-none outline-none w-full mb-2 placeholder-gray-300"
        placeholder="제목 없음"
      />

      {mounted && (
        <div className="text-sm text-gray-400 mb-6">
          작성일: {currentPage.createdAt.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      )}

      <div className="mb-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
