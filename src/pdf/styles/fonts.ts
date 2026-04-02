import { Font } from "@react-pdf/renderer";
import { writeFileSync, mkdtempSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  INTER_REGULAR,
  INTER_MEDIUM,
  INTER_SEMIBOLD,
  INTER_BOLD,
} from "./font-data.ts";

const fontDir = mkdtempSync(join(tmpdir(), "invoicer-fonts-"));

function decodeFontToFile(base64: string, filename: string): string {
  const path = join(fontDir, filename);
  writeFileSync(path, Buffer.from(base64, "base64"));
  return path;
}

Font.register({
  family: "Inter",
  fonts: [
    {
      src: decodeFontToFile(INTER_REGULAR, "Inter-Regular.ttf"),
      fontWeight: "normal",
    },
    {
      src: decodeFontToFile(INTER_MEDIUM, "Inter-Medium.ttf"),
      fontWeight: 500,
    },
    {
      src: decodeFontToFile(INTER_SEMIBOLD, "Inter-SemiBold.ttf"),
      fontWeight: 600,
    },
    {
      src: decodeFontToFile(INTER_BOLD, "Inter-Bold.ttf"),
      fontWeight: "bold",
    },
  ],
});
