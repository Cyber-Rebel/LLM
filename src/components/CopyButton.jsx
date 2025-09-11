import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (e) {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <button
      className="p-1 hover:bg-gray-700 rounded transition flex items-center"
      onClick={handleCopy}
      title="Copy to clipboard"
      type="button"
      aria-label="Copy"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300">
        <rect x="9" y="9" width="13" height="13" rx="2" fill={copied ? '#4ade80' : 'none'} stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  )
}

export default CopyButton
