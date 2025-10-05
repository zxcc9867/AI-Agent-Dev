import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { exitCode } from '@tiptap/pm/commands'
import ExecutableCodeBlock from '@/components/ExecutableCodeBlock'

export const ExecutableCodeBlockExtension = CodeBlockLowlight.extend({
  name: 'executableCodeBlock',

  addOptions() {
    return {
      ...this.parent?.(),
      exitOnTripleEnter: false,
      exitOnArrowDown: false,
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        default: 'javascript',
        parseHTML: element => element.getAttribute('data-language'),
        renderHTML: attributes => {
          return {
            'data-language': attributes.language,
          }
        },
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      // Override all exit behaviors
      'ArrowDown': () => false,
      'ArrowUp': () => false,
      'Enter': () => false,
    }
  },

  addProseMirrorPlugins() {
    const parentPlugins = this.parent?.() || []

    return [
      ...parentPlugins,
      new Plugin({
        key: new PluginKey('preventCodeBlockExit'),
        props: {
          handleKeyDown: (view, event) => {
            const { state } = view
            const { selection } = state
            const { $from } = selection

            // Check if we're in a code block
            if ($from.parent.type.name === 'executableCodeBlock') {
              // Prevent any automatic exit behavior
              return false
            }

            return false
          },
        },
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ExecutableCodeBlock)
  },
})
