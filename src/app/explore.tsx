import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { Collapsible } from '@/components/ui/collapsible';
import { BottomTabInset, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function NotesScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.titleContainer}>
          <View style={styles.guideBadge}>
            <Text style={styles.guideBadgeText}>STUDY NOTES & REFERENCE</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Slide 21 & Form Architecture</Text>
          <Text style={[styles.centerText, { color: theme.textSecondary }]}>
            Comprehensive reference manual for React Native TextInput variants, form controls, state
            binding, file attachments, and JSON data serialization.
          </Text>
        </View>

        {/* Collapsible Explanations */}
        <View style={styles.sectionsWrapper}>
          <Collapsible title="Slide 21: Types of Text Inputs & Keyboard Props">
            <Text style={[styles.noteText, { color: theme.text }]}>
              React Native provides the <Text style={{ fontFamily: Fonts?.mono }}>TextInput</Text> component as the fundamental building block for text entry.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.mono }}>keyboardType="default"</Text>: Standard keyboard for general text.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.mono }}>keyboardType="email-address"</Text>: Optimized for email with '@' and domain extensions. Always combine with <Text style={{ fontFamily: Fonts?.mono }}>autoCapitalize="none"</Text> and <Text style={{ fontFamily: Fonts?.mono }}>autoCorrect={'{false}'}</Text>.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.mono }}>secureTextEntry={'{true}'}</Text>: Obscures password characters for safety.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.mono }}>keyboardType="phone-pad"</Text>: Keypad with digits and dialing symbols.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.mono }}>keyboardType="numeric"</Text> / <Text style={{ fontFamily: Fonts?.mono }}>decimal-pad</Text>: For numbers and monetary amounts.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.mono }}>multiline={'{true}'}</Text>: Multi-line textarea for essays, bios, and feedback.
            </Text>
            <ExternalLink href="https://reactnative.dev/docs/textinput">
              <Text style={{ fontFamily: Fonts?.bold, color: '#6366F1' }}>Official React Native TextInput Docs →</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Other Form Elements in React Native & File Uploading">
            <Text style={[styles.noteText, { color: theme.text }]}>
              Beyond text inputs, forms rely on diverse selection, confirmation, and file controls:
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.bold }}>File & Image Uploading</Text>: Using <Text style={{ fontFamily: Fonts?.mono }}>expo-image-picker</Text> and <Text style={{ fontFamily: Fonts?.mono }}>expo-document-picker</Text> to capture photos or attach documents.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.bold }}>Switch</Text>: Native boolean toggle switch for instant on/off states like notifications or permissions.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.bold }}>Checkboxes</Text>: Multi-select controls for preferences and legal compliance ("Agree to Terms").
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.bold }}>Radio Buttons</Text>: Enforce mutually exclusive selection across subscription plans or payment methods.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.bold }}>Modal Pickers</Text>: Clean dropdown selection sheets for selecting from structured catalogs without taking up screen real estate.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.bold }}>Segmented Controls</Text>: Compact horizontal pill switches for mode selection.
            </Text>
            <Text style={[styles.noteText, { color: theme.text }]}>
              • <Text style={{ fontFamily: Fonts?.bold }}>Sliders / Rating</Text>: Continuous numerical or 5-star rating inputs.
            </Text>
          </Collapsible>

          <Collapsible title="Collecting & Serializing Form Data to JSON">
            <Text style={[styles.noteText, { color: theme.text }]}>
              To send collected data as a JSON object to the console:
            </Text>
            <View style={styles.codeSnippet}>
              <Text style={styles.codeSnippetText}>
{`const handleSubmit = () => {
  const payload = JSON.stringify(formData, null, 2);
  console.log("Collected Form Data JSON:", payload);
};`}
              </Text>
            </View>
            <Text style={[styles.noteText, { color: theme.text }]}>
              Using controlled components in React with <Text style={{ fontFamily: Fonts?.mono }}>useState</Text> guarantees that the current form state is always synchronized in memory and immediately serializable into clean JSON.
            </Text>
          </Collapsible>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    gap: Spacing.four,
  },
  titleContainer: {
    gap: Spacing.two,
    alignItems: 'center',
    paddingVertical: Spacing.four,
  },
  guideBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  guideBadgeText: {
    color: '#FFFFFF',
    fontFamily: Fonts?.bold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: Fonts?.bold,
    fontSize: 22,
    fontWeight: '700',
  },
  centerText: {
    fontFamily: Fonts?.sans,
    textAlign: 'center',
    maxWidth: 500,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionsWrapper: {
    gap: Spacing.four,
  },
  noteText: {
    fontFamily: Fonts?.sans,
    fontSize: 13,
    lineHeight: 19,
  },
  codeSnippet: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  codeSnippetText: {
    color: '#38BDF8',
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    fontSize: 12,
    lineHeight: 18,
  },
});
