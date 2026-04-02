import { Page, View, StyleSheet } from "@react-pdf/renderer";
import { spacing } from "./styles/theme.ts";
import { Header } from "./components/header.tsx";
import { Addresses } from "./components/addresses.tsx";
import { LineItemsTable } from "./components/line-items-table.tsx";
import { Totals } from "./components/totals.tsx";
import { Notes } from "./components/notes.tsx";
import type { InvoiceConfig } from "../config/schema.ts";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    paddingTop: spacing.page.top,
    paddingRight: spacing.page.right,
    paddingBottom: spacing.page.bottom,
    paddingLeft: spacing.page.left,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginBottom: spacing.sectionGap,
  },
});

interface InvoicePageProps {
  config: InvoiceConfig;
  invoiceId: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
}

export function InvoicePage({
  config,
  invoiceId,
  issueDate,
  dueDate,
  subtotal,
}: InvoicePageProps) {
  return (
    <Page size="LETTER" style={styles.page}>
      <Header
        from={config.from}
        invoiceId={invoiceId}
        issueDate={issueDate}
        dueDate={dueDate}
      />
      <View style={styles.separator} />
      <Addresses billTo={config.bill_to} />
      <LineItemsTable items={config.items} />
      <Totals subtotal={subtotal} />
      {config.notes && <Notes notes={config.notes} />}
    </Page>
  );
}
