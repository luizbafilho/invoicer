import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, fontSize, spacing } from "../styles/theme.ts";
import { renderMarkdown } from "../markdown.tsx";

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sectionGap,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sectionGap,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: fontSize.sectionLabel,
    color: colors.secondary,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 10,
  },
});

interface NotesProps {
  notes: string;
}

export function Notes({ notes }: NotesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notes</Text>
      {renderMarkdown(notes)}
    </View>
  );
}
