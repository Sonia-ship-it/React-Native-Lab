/**
 * Below are the colors and typography used in the app.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#FFFFFF',
    backgroundElement: '#F1F5F9',
    backgroundSelected: '#E2E8F0',
    textSecondary: '#64748B',
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
  },
  dark: {
    text: '#F8FAFC',
    background: '#090D16',
    backgroundElement: '#1E293B',
    backgroundSelected: '#334155',
    textSecondary: '#94A3B8',
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    border: '#334155',
    success: '#10B981',
    error: '#EF4444',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Urbanist-Regular',
    medium: 'Urbanist-Medium',
    semiBold: 'Urbanist-SemiBold',
    bold: 'Urbanist-Bold',
    extraBold: 'Urbanist-ExtraBold',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'Urbanist-Regular',
    medium: 'Urbanist-Medium',
    semiBold: 'Urbanist-SemiBold',
    bold: 'Urbanist-Bold',
    extraBold: 'Urbanist-ExtraBold',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  default: {
    sans: 'Urbanist-Regular',
    medium: 'Urbanist-Medium',
    semiBold: 'Urbanist-SemiBold',
    bold: 'Urbanist-Bold',
    extraBold: 'Urbanist-ExtraBold',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'Urbanist, var(--font-display)',
    medium: 'Urbanist, var(--font-display)',
    semiBold: 'Urbanist, var(--font-display)',
    bold: 'Urbanist, var(--font-display)',
    extraBold: 'Urbanist, var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 20, android: 24 }) ?? 0;
export const MaxContentWidth = 800;
