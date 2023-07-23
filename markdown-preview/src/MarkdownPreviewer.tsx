import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownPreviewerProps {
  markdown: string
}

function MarkdownPreviewer({ markdown }: MarkdownPreviewerProps) {
  return (
    <Markdown
      className="prose"
      children={markdown}
      remarkPlugins={[remarkGfm]}
    />
  )
}

export default MarkdownPreviewer
