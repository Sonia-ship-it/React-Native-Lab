import React, { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { UploadedFile } from './types';

export function OtherElementsShowcase() {
  const [toggleVal, setToggleVal] = useState(true);
  const [radioVal, setRadioVal] = useState('Option A');
  const [checkedItems, setCheckedItems] = useState<string[]>(['Item 1']);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setUploadedFile({
        name: asset.fileName || 'selected_photo.jpg',
        size: asset.fileSize,
        uri: asset.uri,
        mimeType: asset.mimeType || 'image/jpeg',
        type: 'image',
      });
    }
  };

  const pickDoc = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const doc = result.assets[0];
      setUploadedFile({
        name: doc.name,
        size: doc.size,
        uri: doc.uri,
        mimeType: doc.mimeType || 'application/octet-stream',
        type: 'document',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Form Elements</Text>
      <Text style={styles.description}>
        Standard React Native input controls and file upload.
      </Text>

      {/* 1. Switch */}
      <Text style={styles.label}>1. Switch (Boolean Toggle):</Text>
      <View style={styles.switchRow}>
        <Text style={styles.text}>Toggle Value: {toggleVal ? 'ON' : 'OFF'}</Text>
        <Switch value={toggleVal} onValueChange={setToggleVal} />
      </View>

      {/* 2. Radio Group */}
      <Text style={styles.label}>2. Radio Buttons (Single-Select):</Text>
      {['Option A', 'Option B', 'Option C'].map((opt) => (
        <Text
          key={opt}
          onPress={() => setRadioVal(opt)}
          style={[styles.radioItem, radioVal === opt && styles.selected]}>
          {radioVal === opt ? '● ' : '○ '}
          {opt}
        </Text>
      ))}

      {/* 3. Checkboxes */}
      <Text style={styles.label}>3. Checkboxes (Multi-Select):</Text>
      {['Item 1', 'Item 2', 'Item 3'].map((item) => {
        const isChecked = checkedItems.includes(item);
        return (
          <Text
            key={item}
            onPress={() => toggleCheck(item)}
            style={[styles.checkItem, isChecked && styles.selected]}>
            {isChecked ? '[✓] ' : '[ ] '}
            {item}
          </Text>
        );
      })}

      {/* 4. Upload Option */}
      <Text style={styles.label}>4. Upload Option (Images & Documents):</Text>
      <View style={styles.buttonRow}>
        <View style={styles.btnWrapper}>
          <Button title="Pick Image" onPress={pickImage} />
        </View>
        <View style={styles.btnWrapper}>
          <Button title="Pick Document" onPress={pickDoc} />
        </View>
      </View>
      {uploadedFile && (
        <View style={styles.previewBox}>
          {uploadedFile.type === 'image' && uploadedFile.uri && (
            <Image source={{ uri: uploadedFile.uri }} style={styles.previewImage} />
          )}
          <Text style={styles.text}>File: {uploadedFile.name}</Text>
          <Button title="Clear File" color="red" onPress={() => setUploadedFile(null)} />
        </View>
      )}

      {/* 5. Standard Buttons */}
      <Text style={styles.label}>5. Standard Button:</Text>
      <Button title="Standard Action Button" onPress={() => alert('Button pressed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Urbanist',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Urbanist',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 6,
  },
  text: {
    fontFamily: 'Urbanist',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  radioItem: {
    fontFamily: 'Urbanist',
    fontSize: 15,
    paddingVertical: 4,
  },
  checkItem: {
    fontFamily: 'Urbanist',
    fontSize: 15,
    paddingVertical: 4,
  },
  selected: {
    fontWeight: 'bold',
    color: '#0066cc',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 6,
  },
  btnWrapper: {
    flex: 1,
  },
  previewBox: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 6,
    gap: 6,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
});
