import { renderToFile } from "@react-pdf/renderer";
import { InvoiceDocument } from "./pdf/document.tsx";
import type { InvoiceConfig } from "./config/schema.ts";
import { generateInvoiceId } from "./utils/invoice-id.ts";
import { formatDate, addDays } from "./utils/date.ts";
import { formatUSD } from "./utils/currency.ts";
import { join } from "path";

export interface GenerateResult {
  invoiceId: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  itemCount: number;
  outputPath: string;
  fileSize: number;
}

export async function generate(
  config: InvoiceConfig,
  outputDir: string = process.cwd()
): Promise<GenerateResult> {
  const now = new Date();
  const invoiceId = generateInvoiceId(now);
  const issueDate = formatDate(now);
  const dueDate = formatDate(addDays(now, config.due_days));

  const subtotal = config.items.reduce((sum, item) => {
    return sum + Math.round(item.quantity * item.unit_price * 100) / 100;
  }, 0);

  const outputPath = join(outputDir, `${invoiceId}.pdf`);

  await renderToFile(
    <InvoiceDocument
      config={config}
      invoiceId={invoiceId}
      issueDate={issueDate}
      dueDate={dueDate}
      subtotal={subtotal}
    />,
    outputPath
  );

  const stat = await Bun.file(outputPath).stat();

  return {
    invoiceId,
    issueDate,
    dueDate,
    subtotal,
    itemCount: config.items.length,
    outputPath,
    fileSize: stat?.size ?? 0,
  };
}
