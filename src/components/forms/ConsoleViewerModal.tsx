import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { FormData } from './types';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ConsoleViewerModalProps {
  visible: boolean;
  data: FormData | null;
  onClose: () => void;
}

export function ConsoleViewerModal({ visible, data, onClose }: ConsoleViewerModalProps) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.background === '#FFFFFF' ? '#FFFFFF' : '#18181B',
              borderColor: 'rgba(99, 102, 241, 0.4)',
            },
          ]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.statusDot} />
              <Text style={[styles.title, { color: theme.text }]}>
                Form JSON Sent to Console
              </Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            The JavaScript object below was converted with{' '}
            <Text style={{ fontFamily: Fonts?.mono, color: '#6366F1' }}>
              JSON.stringify(formData, null, 2)
            </Text>{' '}
            and logged via <Text style={{ fontFamily: Fonts?.mono }}>console.log()</Text>.
          </Text>

          {/* JSON Terminal Screen */}
          <View style={styles.terminalContainer}>
            <View style={styles.terminalHeader}>
              <View style={styles.macButtons}>
                <View style={[styles.macDot, { backgroundColor: '#EF4444' }]} />
                <View style={[styles.macDot, { backgroundColor: '#F59E0B' }]} />
                <View style={[styles.macDot, { backgroundColor: '#10B981' }]} />
              </View>
              <Text style={styles.terminalTitle}>stdout • console.log</Text>
              <Pressable onPress={handleCopy} style={styles.copyBtn}>
                <Text style={styles.copyBtnText}>{copied ? '✓ COPIED' : '📋 COPY JSON'}</Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.codeScrollView}
              contentContainerStyle={styles.codeScrollContent}
              horizontal={false}>
              <Text style={styles.codeText}>{jsonString}</Text>
            </ScrollView>
          </View>

          {/* Bottom Actions */}
          <View style={styles.bottomBar}>
            <Pressable
              onPress={onClose}
              style={[styles.dismissBtn, { backgroundColor: '#6366F1' }]}>
              <Text style={styles.dismissBtnText}>Done / Return to Form</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalContent: {
    width: '100%',
    maxWidth: 620,
    maxHeight: '85%',
    borderRadius: 20,
    padding: Spacing.four,
    borderWidth: 1.5,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  title: {
    fontFamily: Fonts?.bold,
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(128,128,128,0.15)',
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#9CA3AF',
  },
  subtitle: {
    fontFamily: Fonts?.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  terminalContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
    flexShrink: 1,
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  macButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  macDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  terminalTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
    fontWeight: '600',
  },
  copyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  copyBtnText: {
    fontFamily: Fonts?.bold,
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
  },
  codeScrollView: {
    maxHeight: 280,
  },
  codeScrollContent: {
    padding: 14,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    fontSize: 12,
    color: '#38BDF8',
    lineHeight: 18,
  },
  bottomBar: {
    marginTop: 4,
  },
  dismissBtn: {
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissBtnText: {
    fontFamily: Fonts?.bold,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
