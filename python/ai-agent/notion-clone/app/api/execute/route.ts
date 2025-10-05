import { NextRequest, NextResponse } from 'next/server'

// Piston API를 사용한 코드 실행
// https://github.com/engineer-man/piston
const PISTON_API = 'https://emkc.org/api/v2/piston'

const languageMap: Record<string, string> = {
  javascript: 'javascript',
  python: 'python',
  java: 'java',
  cpp: 'c++',
  c: 'c',
  go: 'go',
  rust: 'rust',
  typescript: 'typescript',
  ruby: 'ruby',
  php: 'php',
  swift: 'swift',
  kotlin: 'kotlin',
}

export async function POST(request: NextRequest) {
  try {
    const { language, code } = await request.json()

    if (!language || !code) {
      return NextResponse.json(
        { error: '언어와 코드를 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    const pistonLanguage = languageMap[language.toLowerCase()]
    if (!pistonLanguage) {
      return NextResponse.json(
        { error: `지원하지 않는 언어입니다: ${language}` },
        { status: 400 }
      )
    }

    // Piston API로 코드 실행 요청
    const response = await fetch(`${PISTON_API}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: pistonLanguage,
        version: '*', // 최신 버전 사용
        files: [
          {
            name: 'main',
            content: code,
          },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: '코드 실행 중 오류가 발생했습니다.', details: data },
        { status: 500 }
      )
    }

    // 실행 결과 처리
    let output = ''

    if (data.run?.stdout) {
      output += data.run.stdout
    }

    if (data.run?.stderr) {
      output += '\n[오류]\n' + data.run.stderr
    }

    if (data.compile?.stderr) {
      output += '\n[컴파일 오류]\n' + data.compile.stderr
    }

    if (!output.trim()) {
      output = '프로그램이 실행되었지만 출력이 없습니다.'
    }

    return NextResponse.json({
      success: true,
      output: output.trim(),
      language: pistonLanguage,
    })
  } catch (error) {
    console.error('코드 실행 오류:', error)
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
