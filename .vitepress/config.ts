import process from "node:process"; // 引入 Node.js 的 process 模块，访问进程相关信息
import { defineConfig } from "vitepress"; // 引入 VitePress 的配置函数
import MarkdownItFootnote from "markdown-it-footnote"; // 引入 markdown-it 插件，支持脚注功能
import MarkdownItMathjax3 from "markdown-it-mathjax3"; // 引入 markdown-it 插件，支持 MathJax 3 数学公式
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links"; // 引入双向链接插件
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it"; // 引入内联链接预览插件
import { buildEndGenerateOpenGraphImages } from "@nolebase/vitepress-plugin-og-image/vitepress"; // 引入 Open Graph 图像生成插件
import { UnlazyImages } from "@nolebase/markdown-it-unlazy-img"; // 引入解除懒加载插件

// 引入站点元数据，包括社交链接、站点描述、站点名称等
import {
  discordLink,
  githubRepoLink,
  siteDescription,
  siteName,
  targetDomain,
} from "../metadata";
// 引入创作者的名字和用户名信息
// import { creatorNames, creatorUsernames } from './creators'
// 引入侧边栏配置
import { sidebar } from "./docsMetadata.json";

// 定义 Open Graph 和 Twitter 的 meta 信息，便于后续管理和扩展
const openGraphMeta = [
  ["meta", { property: "og:title", content: siteName }], // 设置 Open Graph 网页标题
  ["meta", { property: "og:image", content: `${targetDomain}/og.png` }], // 设置 Open Graph 网页图片（预览图）
  ["meta", { property: "og:description", content: siteDescription }], // 设置 Open Graph 网页描述
  ["meta", { property: "og:site_name", content: siteName }], // 设置 Open Graph 网页站点名称
  // ['meta', { name: 'twitter:card', content: 'summary_large_image' }],  // 设置 Twitter 卡片类型，使用大图
  // ['meta', { name: 'twitter:creator', content: creatorUsernames.join(', ') }],  // 设置 Twitter 创作者的用户名
  // ['meta', { name: 'twitter:image', content: `${targetDomain}/og.png` }],  // 设置 Twitter 网页图像
];

// 配置社交媒体链接，支持 GitHub 和 Discord 链接
const socialLinks = [
  { icon: "github", link: githubRepoLink }, // GitHub 链接
  // { icon: 'discord', link: discordLink },  // Discord 链接
];

// 定义其他 meta 标签，包括主题色、作者、关键词等
const metaTags = [
  ["meta", { name: "theme-color", content: "#ffffff" }], // 设置网页主题色
  [
    "link",
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ], // 设置 iOS 图标
  ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }], // 设置 SVG 图标
  [
    "link",
    {
      rel: "alternate icon",
      href: "/favicon.ico",
      type: "image/png",
      sizes: "16x16",
    },
  ], // 设置备用 PNG 图标
  // ['meta', { name: 'author', content: creatorNames.join(', ') }],  // 设置网站的作者
  // ['meta', { name: 'keywords', content: ['markdown', 'knowledge-base', '知识库', 'vitepress', 'obsidian', 'notebook', 'notes', ...creatorUsernames].join(', ') }],  // 设置网站的关键词
  [
    "link",
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#927baf" },
  ], // 设置 Safari pinned tab 图标
  ["link", { rel: "manifest", href: "/site.webmanifest" }], // 引入网站的 Web Manifest 文件
  ["meta", { name: "msapplication-TileColor", content: "#603cba" }], // 设置 Windows 8 磁贴的颜色
  // 插入 Plausible Analytics 分析脚本
  [
    "script",
    {
      defer: "true",
      "data-domain": "nolebase.ayaka.io",
      "data-api": "/api/v1/page-external-data/submit",
      src: "/assets/page-external-data/js/script.js",
    },
  ],
];

// VitePress 配置
export default defineConfig({
  vue: {
    template: {
      transformAssetUrls: {
        video: ["src", "poster"], // 处理视频标签的 src 和 poster 属性
        source: ["src"], // 处理 source 标签的 src 属性
        img: ["src"], // 处理 img 标签的 src 属性
        image: ["xlink:href", "href"], // 处理 image 标签的 xlink:href 和 href 属性
        use: ["xlink:href", "href"], // 处理 use 标签的 xlink:href 和 href 属性
        NolebaseUnlazyImg: ["src"], // 处理 NolebaseUnlazyImg 组件的 src 属性
      },
    },
  },
  lang: "zh-CN", // 设置网站语言为简体中文
  title: siteName, // 设置网站标题
  description: siteDescription, // 设置网站描述
  ignoreDeadLinks: true, // 忽略死链接检测
  head: [
    ...metaTags, // 插入基本的 meta 标签
    ...openGraphMeta, // 插入 Open Graph 和 Twitter meta 标签
  ],
  themeConfig: {
    outline: { label: "页面大纲", level: "deep" }, // 启用深层页面大纲
    darkModeSwitchLabel: "切换主题", // 主题切换按钮的标签
    editLink: {
      // 配置编辑页面链接
      pattern: `${githubRepoLink}/tree/main/:path`, // 编辑时跳转到 GitHub 仓库的对应路径
      text: "编辑本页面", // 编辑页面时显示的文字
    },
    socialLinks, // 插入社交媒体链接
    footer: {
      // 配置页脚
      copyright: `<a class="footer-cc-link" target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> © 2022-PRESENT`, // 页脚版权信息
      message:
        '基于<a class="footer-cc-link" target="_blank" href="https://github.com/nolebase/nolebase">Nolebase</a>分叉而来', // 页脚信息
    },
    search: {
      // 配置搜索功能
      provider: "local", // 使用本地搜索引擎
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" }, // 配置搜索按钮的文字
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
              }, // 配置搜索结果为空时的提示
            },
          },
        },
        // 自定义搜索结果渲染函数
        _render(src, env, md) {
          let html = md.render(src, env);
          const { frontmatter, content = src } = env;
          if (frontmatter?.search === false) return ""; // 如果搜索被禁用则返回空

          // 获取文章标题
          const headingMatch = content.match(/^#{1} .*/m);
          let [headingPart, contentPart] = headingMatch
            ? [
                content.slice(0, headingMatch.index! + headingMatch[0].length),
                content.slice(headingMatch.index! + headingMatch[0].length),
              ]
            : [`# ${frontmatter?.title || ""}`, content];

          // 获取标签部分
          const tagsPart =
            frontmatter?.tags &&
            Array.isArray(frontmatter.tags) &&
            frontmatter.tags.length
              ? `Tags: #${frontmatter.tags.join(", #")}`
              : "";

          const fullContent = [headingPart, tagsPart, contentPart]
            .filter(Boolean)
            .join("\n\n"); // 拼接最终搜索内容

          html = md.render(fullContent, env); // 渲染最终的 HTML 内容

          return html;
        },
      },
    },
    nav: [
      // 配置导航栏
      { text: "主页", link: "/" }, // 主页链接
      { text: "笔记", link: "/笔记/" }, // 笔记页面链接
      { text: "最近更新", link: "/toc" }, // 最近更新页面链接
    ],
    sidebar, // 引用外部配置的侧边栏
  },
  markdown: {
    // 配置 Markdown 渲染
    theme: { light: "github-light", dark: "one-dark-pro" }, // 配置浅色和深色主题
    math: true, // 启用数学公式支持
    config: (md) => {
      // 配置 markdown-it 插件
      md.use(MarkdownItFootnote) // 启用脚注插件
        .use(MarkdownItMathjax3) // 启用 MathJax3 插件
        .use(BiDirectionalLinks({ dir: process.cwd() })) // 启用双向链接插件
        .use(UnlazyImages(), { imgElementTag: "NolebaseUnlazyImg" }) // 启用解除懒加载插件
        .use(InlineLinkPreviewElementTransform, {
          tag: "VPNolebaseInlineLinkPreview",
        }); // 启用内联链接预览插件
    },
  },
  async buildEnd(siteConfig) {
    // 在构建结束时生成 Open Graph 图像
    await buildEndGenerateOpenGraphImages({
      baseUrl: targetDomain,
      category: { byLevel: 2 }, // 根据页面层级生成不同类型的图像
    })(siteConfig);
  },
});
