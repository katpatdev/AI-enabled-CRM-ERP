import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [busy, setBusy] = useState(false)
  const [selected, setSelected] = useState(null)

  async function load() {
    setInvoices(await api.invoices())
  }

  useEffect(() => {
    load()
  }, [])

  async function issue(type) {
    setBusy(true)
    try {
      const body =
        type === 'B2C'
          ? {
              invoice_type: 'B2C',
              buyer_name: 'Walk-in guest POS',
              description: 'Onboard spa treatment (Pearl Spa)',
              subtotal_sar: 280,
            }
          : {
              invoice_type: 'B2B',
              buyer_name: 'Jeddah Port Provisions Co.',
              buyer_vat: '300012345600003',
              description: 'Fresh Halal provisions (Cold Store A restock)',
              subtotal_sar: 12500,
            }
      const inv = await api.createInvoice(body)
      setSelected(inv)
      await load()
    } catch (e) {
      alert(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid-2">
      <div className="panel">
        <h3>Issue mock ZATCA invoice</h3>
        <p className="muted">
          Simulated Phase 2: B2C reporting model and B2B clearance. Not connected to live Fatoora.
        </p>
        <div className="cta-row" style={{ marginTop: '1rem' }}>
          <button className="btn btn-primary" disabled={busy} onClick={() => issue('B2C')}>
            Issue B2C simplified
          </button>
          <button className="btn btn-secondary" disabled={busy} onClick={() => issue('B2B')}>
            Issue B2B standard
          </button>
        </div>
        {selected && (
          <div style={{ marginTop: '1.25rem' }}>
            <h3>
              {selected.invoice_number}{' '}
              <span className="tag ok">{selected.status}</span>
            </h3>
            <p>
              {selected.buyer_name} · {selected.total_sar} SAR (VAT {selected.vat_sar})
            </p>
            <p className="muted">TLV QR (Base64)</p>
            <p className="mono">{selected.qr_tlv_base64}</p>
            <details style={{ marginTop: '0.75rem' }}>
              <summary className="muted">UBL-like XML</summary>
              <pre className="mono" style={{ whiteSpace: 'pre-wrap' }}>
                {selected.xml_payload}
              </pre>
            </details>
          </div>
        )}
      </div>
      <div className="panel">
        <h3>Invoice ledger</h3>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Type</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(inv)}>
                <td>{inv.invoice_number}</td>
                <td>{inv.invoice_type}</td>
                <td>{inv.total_sar} SAR</td>
                <td>
                  <span className={`tag ${inv.status === 'queued_offline' ? 'alert' : 'ok'}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
