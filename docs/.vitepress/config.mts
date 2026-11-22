import { defineConfig } from 'vitepress'

const cjkChar = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u

function tokenizeCJK(input: string): string[] {
  const text = input.normalize('NFKC').toLowerCase()

  const Segmenter = (
    Intl as unknown as {
      Segmenter?: new (
        locale: string,
        options: { granularity: 'word' }
      ) => { segment(value: string): Iterable<{ segment: string }> }
    }
  ).Segmenter

  if (Segmenter) {
    const segmenter = new Segmenter('zh', { granularity: 'word' })
    return Array.from(segmenter.segment(text))
      .map((item) => item.segment)
      .filter((term) => term.trim() && /[\p{L}\p{N}]/u.test(term))
  }

  const base =
    text.match(
      /[a-z0-9]+|\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|\p{Script=Hangul}/gu
    ) ?? []
  const tokens = [...base]
  for (let i = 0; i < base.length - 1; i += 1) {
    if (cjkChar.test(base[i]) && cjkChar.test(base[i + 1])) {
      tokens.push(base[i] + base[i + 1])
    }
  }
  return tokens
}

const repo = 'https://github.com/PreSeqDataLab/python-knowledge-base'

export default defineConfig({
  title: 'Python 知识库',
  description: 'Python 基础、Web 开发、AI Agent 与 RAG、计算机必要基础四条主线',
  lang: 'zh-CN',
  base: process.env.BASE_PATH || '/python-knowledge-base/',
  cleanUrls: false,
  lastUpdated: true,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#3451b2' }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '路线图', link: '/roadmap' },
      { text: '面试题库', link: '/interview' },
      { text: '速查手册', link: '/cheatsheet' },
      { text: '检索入口', link: '/search' },
      { text: '工作流', link: '/workflow' }
    ],
    sidebar: [
      {
        text: '开始',
        collapsed: false,
        items: [
          { text: '首页', link: '/' },
          { text: '学习路线图', link: '/roadmap' },
          { text: '电脑写 / 手机读', link: '/workflow' }
        ]
      },
      {
        text: 'Python 基础',
        collapsed: false,
        items: [
          { text: '主线总览', link: '/python-basics/index' },
          { text: '入门', link: '/python-basics/beginner' },
          { text: '进阶', link: '/python-basics/intermediate' },
          { text: '实战', link: '/python-basics/practical' },
          { text: '面试', link: '/python-basics/interview' }
        ]
      },
      {
        text: 'Web 开发',
        collapsed: false,
        items: [
          { text: '主线总览', link: '/web-development/index' },
          { text: '入门', link: '/web-development/beginner' },
          { text: '进阶', link: '/web-development/intermediate' },
          { text: '实战', link: '/web-development/practical' },
          { text: '面试', link: '/web-development/interview' }
        ]
      },
      {
        text: 'AI Agent 与 RAG',
        collapsed: false,
        items: [
          { text: '主线总览', link: '/ai-agent-rag/index' },
          { text: '入门', link: '/ai-agent-rag/beginner' },
          { text: '进阶', link: '/ai-agent-rag/intermediate' },
          { text: '实战', link: '/ai-agent-rag/practical' },
          { text: '面试', link: '/ai-agent-rag/interview' }
        ]
      },
      {
        text: '计算机与必要基础',
        collapsed: false,
        items: [
          { text: '主线总览', link: '/computer-fundamentals/index' },
          { text: '入门', link: '/computer-fundamentals/beginner' },
          { text: '进阶', link: '/computer-fundamentals/intermediate' },
          { text: '实战', link: '/computer-fundamentals/practical' },
          { text: '面试', link: '/computer-fundamentals/interview' }
        ]
      },
      {
        text: '综合与工具',
        collapsed: false,
        items: [
          { text: '面试题库', link: '/interview' },
          { text: '速查手册', link: '/cheatsheet' },
          { text: '检索入口', link: '/search' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        },
        miniSearch: {
          options: {
            tokenize: tokenizeCJK,
            processTerm: (term) => term.normalize('NFKC').toLowerCase()
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              titles: 1
            }
          }
        }
      }
    },
    editLink: {
      pattern: `${repo}/edit/main/docs/:path`,
      text: '在 GitHub 上编辑'
    },
    socialLinks: [
      { icon: 'github', link: repo }
    ],
    footer: {
      message: '电脑端整理 · 手机端回顾 · 持续扩展',
      copyright: 'Copyright © 2026'
    }
  }
})
