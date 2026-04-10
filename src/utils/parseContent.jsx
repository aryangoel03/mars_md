// Converts plain text with **bold**, *closing*, and newlines into React elements.

function parseInline(text) {
  // Match **bold** first (two asterisks), then *closing* (one asterisk)
  const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  const tokens = []
  let last = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) tokens.push({ type: 'text', content: text.slice(last, match.index) })
    if (match[1] !== undefined) tokens.push({ type: 'bold', content: match[1] })
    else tokens.push({ type: 'closing', content: match[2] })
    last = regex.lastIndex
  }
  if (last < text.length) tokens.push({ type: 'text', content: text.slice(last) })

  // Expand text tokens: split on \n and interleave <br>
  const result = []
  tokens.forEach((token, ti) => {
    if (token.type === 'bold') {
      result.push(<strong key={`b${ti}`}>{token.content}</strong>)
    } else if (token.type === 'closing') {
      result.push(<em key={`c${ti}`} className="text-closing">{token.content}</em>)
    } else {
      token.content.split('\n').forEach((line, li, arr) => {
        result.push(line)
        if (li < arr.length - 1) result.push(<br key={`br${ti}-${li}`} />)
      })
    }
  })

  return result
}

export function parseContent(text) {
  if (!text) return null
  return text.split('\n\n').map((para, pi) => {
    if (!para.trim()) return null
    return <p key={pi}>{parseInline(para)}</p>
  })
}
