import { create } from 'zustand'

interface Page {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface PageStore {
  pages: Page[]
  currentPageId: string | null
  addPage: (page: Page) => void
  updatePageTitle: (id: string, title: string) => void
  updatePageContent: (id: string, content: string) => void
  setCurrentPageId: (id: string) => void
  getPage: (id: string) => Page | undefined
}

export const usePageStore = create<PageStore>((set, get) => ({
  pages: [
    {
      id: 'default',
      title: '새 페이지',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  currentPageId: 'default',

  addPage: (page) =>
    set((state) => ({
      pages: [...state.pages, page],
    })),

  updatePageTitle: (id, title) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id ? { ...page, title, updatedAt: new Date() } : page
      ),
    })),

  updatePageContent: (id, content) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id ? { ...page, content, updatedAt: new Date() } : page
      ),
    })),

  setCurrentPageId: (id) =>
    set({ currentPageId: id }),

  getPage: (id) => get().pages.find((page) => page.id === id),
}))
