import { loadConfig } from "./config/loader.ts";
import { generate } from "./generator.tsx";
import { formatUSD } from "./utils/currency.ts";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";

const VERSION = "1.0.0";

function printHelp() {
  console.log(`
  ${BOLD}invoicer${RESET} ${DIM}v${VERSION}${RESET}

  Generate professional PDF invoices from YAML config files.

  ${BOLD}Usage:${RESET}
    invoicer <config.yaml>
    invoicer generate <config.yaml>

  ${BOLD}Options:${RESET}
    -o, --output <dir>   Output directory (default: current directory)
    -h, --help           Show this help
    -v, --version        Show version
`);
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export async function run(argv: string[]): Promise<void> {
  const args = argv.slice(2);

  if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    printHelp();
    return;
  }

  if (args.includes("-v") || args.includes("--version")) {
    console.log(VERSION);
    return;
  }

  let configPath: string | undefined;
  let outputDir: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === "-o" || arg === "--output") {
      outputDir = args[++i];
    } else if (arg === "generate") {
      continue;
    } else if (!arg.startsWith("-")) {
      configPath = arg;
    }
  }

  if (!configPath) {
    console.error(`\n  ${RED}Error${RESET}  No config file specified.\n`);
    printHelp();
    process.exit(1);
  }

  let config;
  try {
    config = await loadConfig(configPath);
  } catch (err) {
    console.error(
      `\n  ${RED}Error${RESET}  ${err instanceof Error ? err.message : err}\n`
    );
    process.exit(1);
  }

  console.log("");

  const result = await generate(config, outputDir);

  console.log(
    `  ${CYAN}Config${RESET}     ${DIM}${configPath}${RESET}`
  );
  console.log(
    `  ${CYAN}Invoice${RESET}    ${BOLD}${result.invoiceId}${RESET}`
  );
  console.log(
    `  ${CYAN}Issued${RESET}     ${result.issueDate}`
  );
  console.log(
    `  ${CYAN}Due${RESET}        ${result.dueDate}`
  );
  console.log(
    `  ${CYAN}Items${RESET}      ${result.itemCount}`
  );
  console.log(
    `  ${CYAN}Total${RESET}      ${BOLD}${formatUSD(result.subtotal)}${RESET}`
  );
  console.log("");
  console.log(
    `  ${GREEN}✓${RESET} ${BOLD}${result.outputPath}${RESET} ${DIM}(${formatSize(result.fileSize)})${RESET}`
  );
  console.log("");
}
