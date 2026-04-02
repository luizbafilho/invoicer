import { parse } from "yaml";
import { InvoiceConfigSchema, type InvoiceConfig } from "./schema.ts";

export async function loadConfig(path: string): Promise<InvoiceConfig> {
  const file = Bun.file(path);
  if (!(await file.exists())) {
    throw new Error(`File not found: ${path}`);
  }

  const raw = await file.text();
  let parsed: unknown;
  try {
    parsed = parse(raw);
  } catch {
    throw new Error(`Invalid YAML in ${path}`);
  }

  const result = InvoiceConfigSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => {
      const path = issue.path.join(".");
      return `  ${path} — ${issue.message}`;
    });
    throw new Error(`Validation failed for ${path}\n\n${issues.join("\n")}`);
  }

  return result.data;
}
