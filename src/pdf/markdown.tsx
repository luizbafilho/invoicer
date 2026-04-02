import { View, Text, Link, StyleSheet } from "@react-pdf/renderer";
import { Lexer, type Token, type Tokens } from "marked";
import { colors, fontSize } from "./styles/theme.ts";

const styles = StyleSheet.create({
  paragraph: {
    fontFamily: "Inter",
    fontSize: fontSize.body,
    color: colors.primary,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  bold: {
    fontWeight: 700,
  },
  italic: {
    fontStyle: "italic",
  },
  link: {
    color: colors.accent,
    textDecoration: "underline",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    fontFamily: "Inter",
    fontSize: fontSize.body,
    color: colors.secondary,
    width: 14,
  },
  listItemText: {
    fontFamily: "Inter",
    fontSize: fontSize.body,
    color: colors.primary,
    flex: 1,
    lineHeight: 1.6,
  },
  heading: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 11,
    color: colors.primary,
    marginBottom: 6,
    marginTop: 4,
  },
});

function renderInlineTokens(tokens: Token[]): React.ReactNode[] {
  return tokens.map((token, i) => {
    if (token.type === "strong") {
      return (
        <Text key={i} style={styles.bold}>
          {token.text}
        </Text>
      );
    }
    if (token.type === "em") {
      return (
        <Text key={i} style={styles.italic}>
          {token.text}
        </Text>
      );
    }
    if (token.type === "text" || token.type === "escape") {
      return <Text key={i}>{token.raw}</Text>;
    }
    if (token.type === "link") {
      const link = token as Tokens.Link;
      return (
        <Link key={i} src={link.href} style={styles.link}>
          {link.text}
        </Link>
      );
    }
    return <Text key={i}>{token.raw}</Text>;
  });
}

export function renderMarkdown(markdown: string): React.ReactNode[] {
  const tokens = new Lexer().lex(markdown);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;

    if (token.type === "paragraph") {
      const para = token as Tokens.Paragraph;
      elements.push(
        <Text key={i} style={styles.paragraph}>
          {para.tokens ? renderInlineTokens(para.tokens) : para.text}
        </Text>
      );
    } else if (token.type === "heading") {
      const heading = token as Tokens.Heading;
      elements.push(
        <Text key={i} style={styles.heading}>
          {heading.text}
        </Text>
      );
    } else if (token.type === "list") {
      const list = token as Tokens.List;
      elements.push(
        <View key={i}>
          {list.items.map((item, j) => (
            <View key={j} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>
                {item.tokens
                  ? item.tokens.flatMap((t) => {
                      if (t.type === "text") {
                        const textToken = t as Tokens.Text;
                        return textToken.tokens
                          ? renderInlineTokens(textToken.tokens)
                          : [textToken.text];
                      }
                      return [t.raw];
                    })
                  : item.text}
              </Text>
            </View>
          ))}
        </View>
      );
    } else if (token.type === "space") {
      // skip whitespace tokens
    } else {
      elements.push(
        <Text key={i} style={styles.paragraph}>
          {token.raw}
        </Text>
      );
    }
  }

  return elements;
}
