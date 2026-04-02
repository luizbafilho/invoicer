import { Document } from "@react-pdf/renderer";
import "./styles/fonts.ts";
import { InvoicePage } from "./invoice-page.tsx";
import type { InvoiceConfig } from "../config/schema.ts";

interface InvoiceDocumentProps {
  config: InvoiceConfig;
  invoiceId: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
}

export function InvoiceDocument(props: InvoiceDocumentProps) {
  return (
    <Document
      title={`Invoice ${props.invoiceId}`}
      author={props.config.from.name}
    >
      <InvoicePage {...props} />
    </Document>
  );
}
