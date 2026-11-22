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
  // Custom domains report an empty base_path from configure-pages; keep it as root.
  base: process.env.BASE_PATH ?? '/python-knowledge-base/',
  cleanUrls: false,
  srcExclude: ['_templates/**'],
  lastUpdated: true,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#3451b2' }]
  ],
  markdown: {
    lineNumbers: true
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: [
          '**/node_modules/**',
          '**/docs/.vitepress/dist/**',
          '**/docs/.vitepress/cache/**'
        ]
      }
    }
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
          {
            text: '入门',
            collapsed: true,
            items: [
              { text: '入门总览', link: '/python-basics/beginner/index' },
              { text: '开始', link: '/python-basics/beginner/first-program' },
              { text: '环境与解释器', link: '/python-basics/beginner/environment' },
              { text: 'Anaconda / Miniconda', link: '/python-basics/beginner/conda' },
              { text: 'uv 工具链', link: '/python-basics/beginner/uv' },
              { text: 'Jupyter Notebook', link: '/python-basics/beginner/jupyter' },
              { text: '基础语法', link: '/python-basics/beginner/syntax' },
              { text: '数据类型与转换', link: '/python-basics/beginner/data-types' },
              { text: '运算符', link: '/python-basics/beginner/operators' },
              { text: '数字与字符串', link: '/python-basics/beginner/strings' },
              { text: '常用容器', link: '/python-basics/beginner/containers' },
              { text: '条件与循环', link: '/python-basics/beginner/control-flow' },
              { text: '推导式', link: '/python-basics/beginner/comprehension' },
              { text: '输入输出与文件', link: '/python-basics/beginner/io-files' }
            ]
          },
          {
            text: '进阶',
            collapsed: true,
            items: [
              { text: '进阶总览', link: '/python-basics/intermediate/index' },
              { text: '函数与 lambda', link: '/python-basics/intermediate/functions' },
              { text: '装饰器', link: '/python-basics/intermediate/decorators' },
              { text: '迭代器与生成器', link: '/python-basics/intermediate/iterators-generators' },
              { text: '上下文管理器', link: '/python-basics/intermediate/context-manager' },
              { text: '模块与 __name__', link: '/python-basics/intermediate/modules' },
              { text: '错误与异常', link: '/python-basics/intermediate/exceptions' },
              { text: '面向对象', link: '/python-basics/intermediate/oop' },
              { text: '类型注解', link: '/python-basics/intermediate/type-hints' },
              { text: '标准库', link: '/python-basics/intermediate/stdlib' },
              { text: '并发模型', link: '/python-basics/intermediate/concurrency' }
            ]
          },
          {
            text: '实战',
            collapsed: true,
            items: [
              { text: '实战总览', link: '/python-basics/practical/index' },
              { text: 'CLI 工具：目录统计器', link: '/python-basics/practical/cli-tool' }
            ]
          },
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
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'medium' }
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    notFound: {
      title: '页面不存在',
      quote: '你访问的页面不存在或已被移动。',
      linkText: '返回首页',
      linkLabel: '返回首页'
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
