import { useEffect } from "react"

export function useSeoMeta({ title, description, keywords }) {
  useEffect(() => {
    if (title) document.title = title
    setMeta("description", description)
    setMeta("keywords", keywords)
    return () => {
      document.title = "Upward Digital | Web Development & SEO Agency USA"
    }
  }, [title, description, keywords])
}

function setMeta(name, content) {
  if (!content) return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}
