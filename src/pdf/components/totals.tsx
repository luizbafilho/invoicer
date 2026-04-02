import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, fontSize, spacing } from "../styles/theme.ts";
import { formatUSD } from "../../utils/currency.ts";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginBottom: spacing.sectionGap,
  },
  box: {
    width: 220,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.totalBg,
    borderRadius: 4,
    marginTop: 4,
  },
  label: {
    fontFamily: "Inter",
    fontSize: fontSize.body,
    color: colors.secondary,
  },
  value: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: fontSize.body,
    color: colors.primary,
  },
  totalLabel: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: fontSize.total,
    color: colors.primary,
  },
  totalValue: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: fontSize.total,
    color: colors.primary,
  },
});

interface TotalsProps {
  subtotal: number;
}

export function Totals({ subtotal }: TotalsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>{formatUSD(subtotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total (USD)</Text>
          <Text style={styles.totalValue}>{formatUSD(subtotal)}</Text>
        </View>
      </View>
    </View>
  );
}
