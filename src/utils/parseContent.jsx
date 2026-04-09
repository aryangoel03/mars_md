// Converts a plain text string with **bold** markers and newlines into React elements.
// This is intentionally minimal — no full markdown parser needed.

export function parseContent(text) {
  if (!text) return null

  const paragraphs = text.split('\n\n')

  return paragraphs.map((para, pi) => {
    if (!para.trim()) return null

    // Split by **bold** markers
    const parts = para.split(/(\*\*[^*]+\*\*)/)
    const children = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      // Handle single newlines within a paragraph as <br>
      const lines = part.split('\n')
      return lines.map((line, li) => (
        li < lines.length - 1
          ? [line, <br key={`${i}-${li}`} />]
          : line
      ))
    })

    return <p key={pi}>{children}</p>
  })
}
