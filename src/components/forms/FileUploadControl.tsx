import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { UploadedFile } from './types';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface FileUploadControlProps {
  value?: UploadedFile | null;
  onChange: (file: UploadedFile | null) => void;
  label?: string;
  helperText?: string;
}

export function FileUploadControl({
  value,
  onChange,
  label = 'Attachment / File Upload',
  helperText = 'Upload a photo, avatar, resume, or document (PNG, JPG, PDF up to 10MB)',
}: FileUploadControlProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handlePickImage = async () => {
    try {
      setLoading(true);
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted && Platform.OS !== 'web') {
        Alert.alert(
          'Permission Required',
          'Media library access is needed to pick an image or photo.'
        );
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newFile: UploadedFile = {
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          size: asset.fileSize,
          uri: asset.uri,
          mimeType: asset.mimeType || 'image/jpeg',
          type: 'image',
        };
        onChange(newFile);
      }
    } catch (err: any) {
      console.warn('Error picking image:', err);
      Alert.alert('Upload Error', err?.message || 'Failed to select image.');
    } finally {
      setLoading(false);
    }
  };

  const handlePickDocument = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'text/*', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const isImg = file.mimeType?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
        const newFile: UploadedFile = {
          name: file.name,
          size: file.size,
          uri: file.uri,
          mimeType: file.mimeType || 'application/octet-stream',
          type: isImg ? 'image' : 'document',
        };
        onChange(newFile);
      }
    } catch (err: any) {
      console.warn('Error picking document:', err);
      Alert.alert('Upload Error', err?.message || 'Failed to select document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        {value && (
          <View style={styles.attachedBadge}>
            <Text style={styles.attachedBadgeText}>✓ ATTACHED</Text>
          </View>
        )}
      </View>
      <Text style={[styles.helper, { color: theme.textSecondary }]}>{helperText}</Text>

      {value ? (
        /* Preview Card */
        <View
          style={[
            styles.previewCard,
            { backgroundColor: theme.backgroundElement, borderColor: 'rgba(99, 102, 241, 0.4)' },
          ]}>
          <View style={styles.previewLeft}>
            {value.type === 'image' ? (
              <Image source={{ uri: value.uri }} style={styles.thumbnail} />
            ) : (
              <View style={styles.docIconBox}>
                <Text style={styles.docIconText}>📄</Text>
              </View>
            )}
            <View style={styles.fileMeta}>
              <Text style={[styles.fileName, { color: theme.text }]} numberOfLines={1}>
                {value.name}
              </Text>
              <Text style={[styles.fileInfo, { color: theme.textSecondary }]}>
                {formatFileSize(value.size)} • {value.mimeType || value.type}
              </Text>
            </View>
          </View>

          <View style={styles.previewActions}>
            <Pressable
              onPress={handlePickImage}
              style={[styles.smallActionBtn, { backgroundColor: 'rgba(99, 102, 241, 0.15)' }]}>
              <Text style={[styles.smallActionText, { color: '#6366F1' }]}>Change</Text>
            </Pressable>
            <Pressable
              onPress={() => onChange(null)}
              style={[styles.smallActionBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
              <Text style={[styles.smallActionText, { color: '#EF4444' }]}>Remove</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        /* Empty Upload Dropzone / Action Buttons */
        <View
          style={[
            styles.dropzone,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: 'rgba(128, 128, 128, 0.25)',
            },
          ]}>
          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator color="#6366F1" size="small" />
              <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
                Opening file chooser...
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.iconCircle}>
                <Text style={styles.uploadGlyph}>☁️</Text>
              </View>
              <Text style={[styles.dropzoneTitle, { color: theme.text }]}>
                Select a file to attach with form submission
              </Text>
              <View style={styles.buttonsRow}>
                <Pressable
                  onPress={handlePickImage}
                  style={[styles.pickBtn, { backgroundColor: '#6366F1' }]}>
                  <Text style={styles.pickBtnText}>📷 Upload Image / Photo</Text>
                </Pressable>
                <Pressable
                  onPress={handlePickDocument}
                  style={[styles.pickBtnSecondary, { borderColor: '#6366F1' }]}>
                  <Text style={[styles.pickBtnSecondaryText, { color: '#6366F1' }]}>
                    📄 Upload Document / PDF
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts?.bold,
    fontSize: 14,
    fontWeight: '700',
  },
  attachedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  attachedBadgeText: {
    color: '#10B981',
    fontFamily: Fonts?.bold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  helper: {
    fontFamily: Fonts?.sans,
    fontSize: 12,
    lineHeight: 16,
  },
  dropzone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: Spacing.four,
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadGlyph: {
    fontSize: 22,
  },
  dropzoneTitle: {
    fontFamily: Fonts?.semiBold,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 2,
  },
  pickBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickBtnText: {
    color: '#FFFFFF',
    fontFamily: Fonts?.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  pickBtnSecondary: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickBtnSecondaryText: {
    fontFamily: Fonts?.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  loadingText: {
    fontFamily: Fonts?.medium,
    fontSize: 13,
  },
  previewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 12,
    marginTop: 4,
  },
  previewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  docIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docIconText: {
    fontSize: 24,
  },
  fileMeta: {
    flex: 1,
  },
  fileName: {
    fontFamily: Fonts?.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  fileInfo: {
    fontFamily: Fonts?.sans,
    fontSize: 11,
    marginTop: 2,
  },
  previewActions: {
    flexDirection: 'row',
    gap: 6,
  },
  smallActionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  smallActionText: {
    fontFamily: Fonts?.bold,
    fontSize: 11,
    fontWeight: '700',
  },
});
