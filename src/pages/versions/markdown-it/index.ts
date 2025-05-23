import MarkdownIt, { Options } from "markdown-it"
import Token from "markdown-it/lib/token.mjs"
import Renderer from "markdown-it/lib/renderer.mjs"

// Edit Markdown rules https://github.com/markdown-it/markdown-it/blob/master/docs/examples/renderer_rules.md

/** The markdown parser */
const md = MarkdownIt("commonmark")

/** Default token generator */
export const proxy = (tokens: Token[], idx: number, options: Options, env: any, self: Renderer) => self.renderToken(tokens, idx, options)

export default md