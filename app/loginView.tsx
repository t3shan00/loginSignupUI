import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const passwordRef = useRef<TextInput | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    setEmailError('');
    console.log('Login clicked. Email:', email, 'Password:', password);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked.');
  };

  const handleSignup = () => {
    console.log('Sign up clicked.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please sign in to continue.</Text>

      <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
        <MaterialCommunityIcons name="email-outline" size={22} color={emailError ? "red" : "#555"} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#AAA"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={22} color="#555" style={styles.icon} />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#AAA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />
      </View>

      <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotButtonText}>Forgot password?</Text>
      </TouchableOpacity>

      <LinearGradient
        colors={['#FF8C00', '#FF5E00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.loginButtonGradient}
      >
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity style={styles.signupLink} onPress={handleSignup}>
        <Text style={styles.signupLinkText}>
          Don't have an account? <Text style={styles.signupBold}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFEFD5',
    marginTop: 12,
  },
  inputError: {
    borderColor: 'red',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  forgotButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotButtonText: {
    color: '#F57C00',
  },
  loginButtonGradient: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    padding: 2,
    marginTop: 16,
  },
  loginButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  signupLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupLinkText: {
    color: '#666',
  },
  signupBold: {
    color: '#F57C00',
    fontWeight: 'bold',
  },
});
