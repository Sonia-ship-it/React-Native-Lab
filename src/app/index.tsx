import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { CompleteForm } from '@/components/forms/CompleteForm';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <CompleteForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
});
