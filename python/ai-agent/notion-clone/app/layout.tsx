import type { Metadata } from 'next'
import './globals.css'
import 'tippy.js/dist/tippy.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Notion Clone - 코드 실행 가능한 노트',
  description: '블로그, 메모, 프로젝트 관리와 코드 실행이 가능한 올인원 플랫폼',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
