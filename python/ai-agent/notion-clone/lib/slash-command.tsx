import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { SlashCommandMenu, SlashCommandItem } from '@/components/SlashCommandMenu'
import {
  FiFile, FiHash, FiList, FiCheckSquare, FiCode,
  FiImage, FiVideo, FiTable, FiChevronDown, FiAlignLeft
} from 'react-icons/fi'

export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        items: getSuggestionItems,
        render: renderItems,
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

export const getSuggestionItems = ({ query }: { query: string }): SlashCommandItem[] => {
  const items: SlashCommandItem[] = [
    {
      title: '텍스트',
      description: '일반 텍스트 단락을 작성합니다',
      icon: FiAlignLeft,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setParagraph()
          .run()
      },
    },
    {
      title: '제목 1',
      description: '큰 제목',
      icon: FiHash,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setHeading({ level: 1 })
          .run()
      },
    },
    {
      title: '제목 2',
      description: '중간 제목',
      icon: FiHash,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setHeading({ level: 2 })
          .run()
      },
    },
    {
      title: '제목 3',
      description: '작은 제목',
      icon: FiHash,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setHeading({ level: 3 })
          .run()
      },
    },
    {
      title: '글머리 기호 목록',
      description: '간단한 글머리 기호 목록',
      icon: FiList,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleBulletList()
          .run()
      },
    },
    {
      title: '번호 매기기 목록',
      description: '1, 2, 3으로 번호가 매겨진 목록',
      icon: FiList,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleOrderedList()
          .run()
      },
    },
    {
      title: '할 일 목록',
      description: '체크박스가 있는 할 일 목록',
      icon: FiCheckSquare,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleTaskList()
          .run()
      },
    },
    {
      title: '코드 블록',
      description: '구문 강조가 적용된 코드',
      icon: FiCode,
      category: 'media',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleCodeBlock()
          .run()
      },
    },
    {
      title: '표',
      description: '간단한 표 삽입',
      icon: FiTable,
      category: 'media',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      },
    },
    {
      title: '이미지',
      description: 'URL로 이미지 추가',
      icon: FiImage,
      category: 'media',
      command: ({ editor, range }: any) => {
        const url = window.prompt('이미지 URL을 입력하세요:')
        if (url) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setImage({ src: url })
            .run()
        }
      },
    },
    {
      title: '유튜브 동영상',
      description: 'YouTube 동영상 삽입',
      icon: FiVideo,
      category: 'media',
      command: ({ editor, range }: any) => {
        const url = window.prompt('YouTube URL을 입력하세요:')
        if (url) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setYoutubeVideo({ src: url })
            .run()
        }
      },
    },
    {
      title: '구분선',
      description: '수평선으로 내용 구분',
      icon: FiChevronDown,
      category: 'basic',
      command: ({ editor, range }: any) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setHorizontalRule()
          .run()
      },
    },
  ]

  return items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  )
}

export const renderItems = () => {
  let component: ReactRenderer | null = null
  let popup: any

  return {
    onStart: (props: any) => {
      component = new ReactRenderer(SlashCommandMenu, {
        props,
        editor: props.editor,
      })

      if (!props.clientRect) {
        return
      }

      popup = tippy('body', {
        getReferenceClientRect: () => {
          const rect = props.clientRect?.()
          if (!rect) {
            return {
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: 0,
              height: 0,
            }
          }
          return rect
        },
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },

    onUpdate(props: any) {
      component?.updateProps(props)

      if (!props.clientRect) {
        return
      }

      popup?.[0]?.setProps({
        getReferenceClientRect: () => {
          const rect = props.clientRect?.()
          if (!rect) {
            return {
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: 0,
              height: 0,
            }
          }
          return rect
        },
      })
    },

    onKeyDown(props: any) {
      if (props.event.key === 'Escape') {
        popup?.[0]?.hide()
        return true
      }

      return component?.ref?.onKeyDown(props) || false
    },

    onExit() {
      popup?.[0]?.destroy()
      component?.destroy()
    },
  }
}
