import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, fontSize } from "../styles/theme.ts";
import { formatUSD } from "../../utils/currency.ts";
import type { Item } from "../../config/schema.ts";

const styles = StyleSheet.create({
  table: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: colors.tableBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderBottomStyle: "dashed",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  colDescription: {
    flex: 5,
  },
  colQty: {
    flex: 1.5,
    textAlign: "right",
  },
  colPrice: {
    flex: 2,
    textAlign: "right",
  },
  colAmount: {
    flex: 2,
    textAlign: "right",
  },
  headerText: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: fontSize.tableHeader,
    color: colors.secondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  cellText: {
    fontFamily: "Inter",
    fontSize: fontSize.body,
    color: colors.primary,
  },
  amountText: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: fontSize.body,
    color: colors.primary,
  },
});

interface LineItemsTableProps {
  items: Item[];
}

export function LineItemsTable({ items }: LineItemsTableProps) {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.colDescription]}>
          Description
        </Text>
        <Text style={[styles.headerText, styles.colQty]}>Qty</Text>
        <Text style={[styles.headerText, styles.colPrice]}>Unit Price</Text>
        <Text style={[styles.headerText, styles.colAmount]}>Amount</Text>
      </View>
      {items.map((item, i) => {
        const amount = Math.round(item.quantity * item.unit_price * 100) / 100;
        return (
          <View key={i} style={styles.row}>
            <Text style={[styles.cellText, styles.colDescription]}>
              {item.description}
            </Text>
            <Text style={[styles.cellText, styles.colQty]}>
              {item.quantity}
            </Text>
            <Text style={[styles.cellText, styles.colPrice]}>
              {formatUSD(item.unit_price)}
            </Text>
            <Text style={[styles.amountText, styles.colAmount]}>
              {formatUSD(amount)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
