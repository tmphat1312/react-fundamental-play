interface MarkdownEditorProps {
  linkText: (value: string) => void
  text: string
}

function MarkdownEditor({ linkText, text }: MarkdownEditorProps) {
  return (
    <textarea
      onChange={(e) => linkText(e.target.value)}
      value={text}
      className="drop-shadow-md rounded-lg w-full h-full ring-2 ring-slate-500 p-4 text-slate-700 font-mono"
    ></textarea>
  )
}

export default MarkdownEditor
