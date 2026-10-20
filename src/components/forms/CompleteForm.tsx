import React, { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { FormData, UploadedFile } from './types';

export function CompleteForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('Male');
  const [notifications, setNotifications] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [showModal, setShowModal] = useState(false);


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setFile({
        name: asset.fileName || 'photo.jpg',
        size: asset.fileSize,
        uri: asset.uri,
        mimeType: asset.mimeType || 'image/jpeg',
        type: 'image',
      });
    }
  };
  

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const doc = result.assets[0];
      setFile({
        name: doc.name,
        size: doc.size,
        uri: doc.uri,
        mimeType: doc.mimeType || 'application/octet-stream',
        type: 'document',
      });
    }
  };

  const handleSubmit = () => {
    const formData: FormData = {
      fullName,
      email,
      password,
      phoneNumber,
      age,
      website: '',
      bio,
      role: gender,
      experienceLevel: 'Intermediate',
      receiveNotifications: notifications,
      marketingConsent: false,
      interests: [],
      satisfactionRating: 5,
      uploadedFile: file,
      agreeToTerms,
    };

    // Output collected form data as JSON to console
    console.log('=== FORM DATA (JSON) ===');
    console.log(JSON.stringify(formData, null, 2));
    console.log('Raw Object:', formData);

    if (Platform.OS === 'web') {
      alert('Form submitted! Check console for JSON output.');
    } else {
      Alert.alert('Form Submitted', 'Check your console for the JSON output.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registration Form</Text>
      <Text style={styles.subtext}>
        Fill in the details below. Submitting will send the data as a JSON object to the console.
      </Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Email */}
      <Text style={styles.label}>Email Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      {/* Age */}
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      {/* Bio */}
      <Text style={styles.label}>Bio / Notes:</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Tell us about yourself"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
      />

      {/* Gender Selection */}
      <Text style={styles.label}>Gender:</Text>
      <View style={styles.row}>
        {['Male', 'Female', 'Other'].map((item) => (
          <Text
            key={item}
            onPress={() => setGender(item)}
            style={[styles.genderOption, gender === item && styles.genderOptionSelected]}>
            {gender === item ? '● ' : '○ '}
            {item}
          </Text>
        ))}
      </View>

      {/* File Upload Option */}
      <Text style={styles.label}>Upload File / Photo:</Text>
      <View style={styles.buttonRow}>
        <View style={styles.btnWrapper}>
          <Button title="Pick Photo" onPress={pickImage} />
        </View>
        <View style={styles.btnWrapper}>
          <Button title="Pick Document" onPress={pickDocument} />
        </View>
      </View>
      {file && (
        <View style={styles.fileInfoBox}>
          {file.type === 'image' && file.uri ? (
            <Image source={{ uri: file.uri }} style={styles.filePreview} />
          ) : null}
          <Text style={styles.fileName}>Selected: {file.name}</Text>
          <Button title="Remove" color="red" onPress={() => setFile(null)} />
        </View>
      )}

      {/* Button to open Modal with Image */}
      <Text style={styles.label}>Modal with Image:</Text>
      <View style={{ marginVertical: 6 }}>
        <Button
          title="Show Modal Containing Image"
          color="#6366f1"
          onPress={() => setShowModal(true)}
        />
      </View>

      {/* Modal containing Image */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontFamily: 'Urbanist', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Image in Modal
            </Text>
            <Image
              source={
                file?.uri && file.type === 'image'
                  ? { uri: file.uri }
                  : require('@/assets/images/react-logo.png')
              }
              style={styles.modalImage}
              resizeMode="contain"
            />
            <Text style={{ fontFamily: 'Urbanist', fontSize: 13, color: '#555', marginVertical: 8 }}>
              {file?.name ? `Showing: ${file.name}` : 'Showing: React Native Logo'}
            </Text>
            <Button title="Close Modal" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Switch Notification */}
      <View style={styles.switchRow}>
        <Text style={styles.label}>Receive Notifications:</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      {/* Agree to Terms */}
      <View style={styles.switchRow}>
        <Text style={styles.label}>Agree to Terms & Conditions:</Text>
        <Switch value={agreeToTerms} onValueChange={setAgreeToTerms} />
      </View>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <Button title="Submit Form (Log to Console)" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontFamily: 'Urbanist',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtext: {
    fontFamily: 'Urbanist',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Urbanist',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    fontFamily: 'Urbanist',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 6,
  },
  genderOption: {
    fontFamily: 'Urbanist',
    fontSize: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  genderOptionSelected: {
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
  fileInfoBox: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginTop: 6,
    gap: 6,
    backgroundColor: '#f9f9f9',
  },
  filePreview: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  fileName: {
    fontFamily: 'Urbanist',
    fontSize: 13,
    color: '#333',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  submitContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    maxWidth: 320,
    width: '100%',
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 6,
  },
});
