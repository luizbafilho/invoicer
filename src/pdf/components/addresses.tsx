import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, fontSize, spacing } from "../styles/theme.ts";
import type { Party } from "../../config/schema.ts";

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sectionGap,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: fontSize.sectionLabel,
    color: colors.secondary,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  name: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: fontSize.body,
    color: colors.primary,
    marginBottom: 3,
  },
  address: {
    fontFamily: "Inter",
    fontSize: fontSize.body,
    color: colors.secondary,
    lineHeight: 1.5,
  },
});

interface AddressesProps {
  billTo: Party;
}

export function Addresses({ billTo }: AddressesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bill To</Text>
      <Text style={styles.name}>{billTo.name}</Text>
      <Text style={styles.address}>{billTo.address.trim()}</Text>
    </View>
  );
}
