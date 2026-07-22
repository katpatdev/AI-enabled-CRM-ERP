export default function Admin() {
  return (
    <>
      <h1 className="page-title">Admin panel</h1>
      <p className="page-sub">Enterprise administration surface for the Navora pitch.</p>
      <div className="grid-3">
        {[
          ['Users', '42 active accounts'],
          ['Roles', 'Guest · Employee · Admin'],
          ['Permissions', 'RBAC matrix configured'],
          ['Ships', '3 active · 1 drydock'],
          ['Departments', 'Bridge, F&B, Hotel, Eng, Sales'],
          ['Settings', 'Theme, locale, edge sync'],
          ['AI configuration', 'Copilot prompts + guardrails'],
          ['Email templates', '12 templates'],
          ['System health', 'All green'],
        ].map(([title, body]) => (
          <div className="panel" key={title}>
            <h3>{title}</h3>
            <p className="muted">{body}</p>
          </div>
        ))}
      </div>
    </>
  )
}
