'use client'

import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import {
  FiFile, FiHash, FiList, FiCheckSquare, FiCode,
  FiImage, FiVideo, FiTable, FiChevronDown
} from 'react-icons/fi'

export interface SlashCommandItem {
  title: string
  description: string
  icon: React.ElementType
  command: (props: any) => void
  category: string
}

interface SlashCommandMenuProps {
  items: SlashCommandItem[]
  command: (item: SlashCommandItem) => void
}

export const SlashCommandMenu = forwardRef((props: SlashCommandMenuProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const commandListRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const newIndex = (selectedIndex + props.items.length - 1) % props.items.length
        setSelectedIndex(newIndex)
        scrollToItem(newIndex)
        return true
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const newIndex = (selectedIndex + 1) % props.items.length
        setSelectedIndex(newIndex)
        scrollToItem(newIndex)
        return true
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        selectItem(selectedIndex)
        return true
      }

      return false
    },
  }))

  useEffect(() => {
    setSelectedIndex(0)
    itemRefs.current = itemRefs.current.slice(0, props.items.length)
  }, [props.items])

  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index]
    if (item && commandListRef.current) {
      const container = commandListRef.current
      const itemTop = item.offsetTop
      const itemBottom = itemTop + item.offsetHeight
      const containerTop = container.scrollTop
      const containerBottom = containerTop + container.clientHeight

      if (itemTop < containerTop) {
        container.scrollTop = itemTop - 8
      } else if (itemBottom > containerBottom) {
        container.scrollTop = itemBottom - container.clientHeight + 8
      }
    }
  }

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  if (props.items.length === 0) {
    return null
  }

  return (
    <div
      ref={commandListRef}
      className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 max-h-80 overflow-y-auto w-80"
    >
      <div className="text-xs font-semibold text-gray-400 px-3 py-2">블록 추가</div>
      {props.items.map((item, index) => {
        const Icon = item.icon
        return (
          <button
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={() => selectItem(index)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              index === selectedIndex
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon size={18} className="flex-shrink-0" />
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-gray-400">{item.description}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
})

SlashCommandMenu.displayName = 'SlashCommandMenu'
