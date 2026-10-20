import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export function TextInputShowcase() {
  const [defaultVal, setDefaultVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneVal, setPhoneVal] = useState('');
  const [numberVal, setNumberVal] = useState('');
  const [decimalVal, setDecimalVal] = useState('');
  const [urlVal, setUrlVal] = useState('');
  const [multilineVal, setMultilineVal] = useState('');
  const [limitedVal, setLimitedVal] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Slide 21: Types of Text Inputs</Text>
      <Text style={styles.description}>
        Below are the standard React Native TextInput types and props from Slide 21.
      </Text>

      {/* 1. Standard Default */}
      <Text style={styles.label}>1. Default Text Input:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter standard text"
        value={defaultVal}
        onChangeText={setDefaultVal}
      />

      {/* 2. Email Address */}
      <Text style={styles.label}>2. Email (keyboardType="email-address"):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={emailVal}
        onChangeText={setEmailVal}
      />

      {/* 3. Password / Secure Text */}
      <Text style={styles.label}>3. Password (secureTextEntry):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry={!showPassword}
        value={passwordVal}
        onChangeText={setPasswordVal}
      />
      <View style={styles.smallBtn}>
        <Button
          title={showPassword ? 'Hide Password' : 'Show Password'}
          onPress={() => setShowPassword((p) => !p)}
        />
      </View>

      {/* 4. Phone Pad */}
      <Text style={styles.label}>4. Phone Number (keyboardType="phone-pad"):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneVal}
        onChangeText={setPhoneVal}
      />

      {/* 5. Numeric */}
      <Text style={styles.label}>5. Number (keyboardType="numeric"):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter numbers only"
        keyboardType="numeric"
        value={numberVal}
        onChangeText={setNumberVal}
      />

      {/* 6. Decimal Pad */}
      <Text style={styles.label}>6. Decimal (keyboardType="decimal-pad"):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter decimal amount (e.g. 19.99)"
        keyboardType="decimal-pad"
        value={decimalVal}
        onChangeText={setDecimalVal}
      />

      {/* 7. URL */}
      <Text style={styles.label}>7. URL (keyboardType="url"):</Text>
      <TextInput
        style={styles.input}
        placeholder="https://example.com"
        keyboardType="url"
        autoCapitalize="none"
        value={urlVal}
        onChangeText={setUrlVal}
      />

      {/* 8. Multiline */}
      <Text style={styles.label}>8. Multiline (multiline numberOfLines={3}):</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Multi-line comments or message"
        multiline
        numberOfLines={3}
        value={multilineVal}
        onChangeText={setMultilineVal}
      />

      {/* 9. Max Length */}
      <Text style={styles.label}>9. Limited Length (maxLength={20}):</Text>
      <TextInput
        style={styles.input}
        placeholder="Maximum 20 characters"
        maxLength={20}
        value={limitedVal}
        onChangeText={setLimitedVal}
      />
      <Text style={styles.counter}>{limitedVal.length} / 20</Text>

      {/* 10. Read-Only / Disabled */}
      <Text style={styles.label}>10. Read-Only (editable=false):</Text>
      <TextInput
        style={[styles.input, styles.disabled]}
        value="READ-ONLY-SYSTEM-VALUE"
        editable={false}
      />
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
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
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
    height: 70,
    textAlignVertical: 'top',
  },
  counter: {
    fontFamily: 'Urbanist',
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 2,
  },
  disabled: {
    backgroundColor: '#eee',
    color: '#777',
  },
  smallBtn: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});
