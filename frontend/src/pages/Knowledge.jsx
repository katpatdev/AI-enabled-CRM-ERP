import { useMemo, useState } from 'react'
import { knowledgeArticles } from '../mockData'

export default function Knowledge() {
  const [q, setQ] = useState('')
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return knowledgeArticles
    return knowledgeArticles.filter((a) =>
      a.title.toLowerCase().includes(s) || a.tags.includes(s) || a.body.toLowerCase().includes(s),
    )
  }, [q])

  return (
    <>
      <h1 className="page-title">Knowledge base</h1>
      <p className="page-sub">Policies and FAQs. Prototype search over curated articles (RAG-ready later).</p>
      <input className="search-input" style={{ width: '100%', marginBottom: '1rem' }} placeholder="Search refund, visa, safety, Halal..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid-2">
        {results.map((a) => (
          <div className="panel" key={a.id}>
            <h3>{a.title}</h3>
            <div className="tag">{a.tags}</div>
            <p style={{ marginTop: '0.75rem' }}>{a.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}
