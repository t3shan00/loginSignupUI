import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import LoginView from './loginView';
import SignupView from './signupView';

export default function Index() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <LoginView /> */}
        <SignupView />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5'
  },
});
