export default function Settings() {
  return (
    <>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">Prototype preferences. No persistence beyond this session UI.</p>
      <div className="grid-2">
        <div className="panel">
          <h3>Experience</h3>
          <ul className="list">
            <li>Theme · Navora Navy / Gold</li>
            <li>Language · English (Arabic UI planned)</li>
            <li>Edge cache · Static ship assets bundled locally</li>
            <li>Dynamic sync · Queue until satellite bandwidth allows</li>
          </ul>
        </div>
        <div className="panel">
          <h3>AI configuration</h3>
          <ul className="list">
            <li>Copilot · Prebuilt enterprise responses + optional LLM</li>
            <li>Customer summary · Mock GPT-style narrative</li>
            <li>Forecast · Hardcoded analytics projections</li>
          </ul>
        </div>
      </div>
    </>
  )
}
