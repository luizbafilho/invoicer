import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, fontSize, spacing } from "../styles/theme.ts";
import type { Party } from "../../config/schema.ts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sectionGap,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
  },
  fromName: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: fontSize.body,
    color: colors.primary,
    marginBottom: 4,
  },
  fromAddress: {
    fontFamily: "Inter",
    fontSize: fontSize.small,
    color: colors.secondary,
    lineHeight: 1.5,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: fontSize.title,
    color: colors.accent,
    marginBottom: 8,
  },
  metaLabel: {
    fontFamily: "Inter",
    fontSize: fontSize.small,
    color: colors.secondary,
  },
  metaValue: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: fontSize.small,
    color: colors.primary,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 6,
    marginBottom: 3,
  },
  invoiceId: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: fontSize.body,
    color: colors.accent,
    marginBottom: 6,
  },
});

interface HeaderProps {
  from: Party;
  invoiceId: string;
  issueDate: string;
  dueDate: string;
}

export function Header({ from, invoiceId, issueDate, dueDate }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.fromName}>{from.name}</Text>
        <Text style={styles.fromAddress}>{from.address.trim()}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.invoiceId}>{invoiceId}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Issued</Text>
          <Text style={styles.metaValue}>{issueDate}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Due</Text>
          <Text style={styles.metaValue}>{dueDate}</Text>
        </View>
      </View>
    </View>
  );
}
