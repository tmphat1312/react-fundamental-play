import { useState } from "react"
import MarkdownEditor from "./MarkdownEditor"
import MarkdownPreviewer from "./MarkdownPreviewer"

function App() {
  const [markdown, setMarkdown] = useState("# hello markdown")

  function handleMarkdownChange(value: string) {
    setMarkdown(value)
  }

  return (
    <main className="grid md:grid-cols-2 gap-8 min-h-[50dvh] md:min-h-screen p-4">
      <div className="">
        <MarkdownEditor linkText={handleMarkdownChange} text={markdown} />
      </div>
      <div className="">
        <MarkdownPreviewer markdown={markdown} />
      </div>
    </main>
  )
}

export default App
