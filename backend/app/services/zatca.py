"""ZATCA Phase 2 simulation  -  TLV QR + UBL-like XML (not live Fatoora)."""

from __future__ import annotations

import base64
import hashlib
from datetime import datetime, timezone

from app.config import settings


VAT_RATE = 0.15


def _tlv(tag: int, value: str) -> bytes:
    data = value.encode("utf-8")
    return bytes([tag, len(data)]) + data


def build_tlv_qr(
    seller_name: str,
    seller_vat: str,
    timestamp_iso: str,
    total_with_vat: float,
    vat_total: float,
) -> str:
    """Phase-1 style 5-tag TLV (demo-safe). Phase-2 crypto tags mocked as hash suffixes."""
    payload = b"".join(
        [
            _tlv(1, seller_name),
            _tlv(2, seller_vat),
            _tlv(3, timestamp_iso),
            _tlv(4, f"{total_with_vat:.2f}"),
            _tlv(5, f"{vat_total:.2f}"),
        ]
    )
    # Mock Phase-2 tags 6-9 with deterministic hashes (not real ECDSA / CSID)
    inv_hash = hashlib.sha256(payload).hexdigest()[:32]
    payload += _tlv(6, inv_hash)
    payload += _tlv(7, "MOCK-ECDSA-SIG")
    payload += _tlv(8, "MOCK-PUBLIC-KEY")
    payload += _tlv(9, "MOCK-ZATCA-STAMP")
    return base64.b64encode(payload).decode("ascii")


def build_xml_invoice(
    invoice_number: str,
    invoice_type: str,
    buyer_name: str,
    buyer_vat: str | None,
    description: str,
    subtotal: float,
    vat: float,
    total: float,
    status: str,
) -> str:
    profile = "reporting:1.0" if invoice_type == "B2C" else "standard:1.0"
    buyer_vat_xml = buyer_vat or "N/A"
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <ProfileID>{profile}</ProfileID>
  <ID>{invoice_number}</ID>
  <IssueDate>{datetime.now(timezone.utc).date().isoformat()}</IssueDate>
  <InvoiceTypeCode>{'388' if invoice_type == 'B2B' else '386'}</InvoiceTypeCode>
  <DocumentCurrencyCode>SAR</DocumentCurrencyCode>
  <AccountingSupplierParty>
    <Party>
      <PartyLegalEntity><RegistrationName>{settings.seller_name}</RegistrationName></PartyLegalEntity>
      <PartyTaxScheme><CompanyID>{settings.seller_vat}</CompanyID></PartyTaxScheme>
    </Party>
  </AccountingSupplierParty>
  <AccountingCustomerParty>
    <Party>
      <PartyLegalEntity><RegistrationName>{buyer_name}</RegistrationName></PartyLegalEntity>
      <PartyTaxScheme><CompanyID>{buyer_vat_xml}</CompanyID></PartyTaxScheme>
    </Party>
  </AccountingCustomerParty>
  <InvoiceLine>
    <Item><Description>{description}</Description></Item>
    <Price><PriceAmount currencyID="SAR">{subtotal:.2f}</PriceAmount></Price>
  </InvoiceLine>
  <TaxTotal><TaxAmount currencyID="SAR">{vat:.2f}</TaxAmount></TaxTotal>
  <LegalMonetaryTotal>
    <TaxExclusiveAmount currencyID="SAR">{subtotal:.2f}</TaxExclusiveAmount>
    <TaxInclusiveAmount currencyID="SAR">{total:.2f}</TaxInclusiveAmount>
  </LegalMonetaryTotal>
  <Note>Mock ZATCA status: {status}</Note>
</Invoice>
"""


def compute_amounts(subtotal_sar: float) -> tuple[float, float, float]:
    vat = round(subtotal_sar * VAT_RATE, 2)
    total = round(subtotal_sar + vat, 2)
    return subtotal_sar, vat, total


def next_invoice_number(invoice_type: str, sequence: int) -> str:
    prefix = "SIM" if invoice_type == "B2C" else "STD"
    return f"MA-{prefix}-{sequence:05d}"
