import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'], fontFamily: Fonts?.sans },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts?.medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  smallBold: {
    fontFamily: Fonts?.bold,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  default: {
    fontFamily: Fonts?.medium,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  title: {
    fontFamily: Fonts?.extraBold,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: Fonts?.bold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  link: {
    fontFamily: Fonts?.semiBold,
    lineHeight: 24,
    fontSize: 14,
  },
  linkPrimary: {
    fontFamily: Fonts?.bold,
    lineHeight: 24,
    fontSize: 14,
    color: '#6366F1',
  },
  code: {
    fontFamily: Fonts?.mono,
    fontWeight: Platform.select({ android: '700' }) ?? '600',
    fontSize: 12,
  },
});
