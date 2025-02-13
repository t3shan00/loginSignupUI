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

const SignupView = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      console.log('Signup successful:', fullName, email, password);
    }
  };

  const handleGoBack = () => {
    console.log('Back arrow clicked.');
  };

  const handleGoToSignIn = () => {
    console.log('Already have an account? Sign in clicked.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.arrowContainer}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="account-outline" size={22} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Your full name"
          placeholderTextColor="#AAA"
          value={fullName}
          onChangeText={setFullName}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()} 
        />
      </View>

      <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
        <MaterialCommunityIcons name="email-outline" size={22} color={emailError ? "red" : "#555"} style={styles.icon} />
        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder="Your email"
          placeholderTextColor="#AAA"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
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
          placeholder="Create a password"
          placeholderTextColor="#AAA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()} 
        />
      </View>

      <View style={[styles.inputContainer, passwordError ? styles.inputError : null]}>
        <MaterialCommunityIcons name="lock-check-outline" size={22} color={passwordError ? "red" : "#555"} style={styles.icon} />
        <TextInput
          ref={confirmPasswordRef}
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#AAA"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setPasswordError('');
          }}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleSignup} 
        />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <LinearGradient
        colors={['#FF8C00', '#FF5E00']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }} 
        style={styles.signupButtonGradient}
      >
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity style={styles.signinLink} onPress={handleGoToSignIn}>
        <Text style={styles.signinLinkText}>
          Already have an account? <Text style={styles.signinBold}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 24,
    justifyContent: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF8E7',
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
  signupButtonGradient: {
    alignSelf: 'flex-end', 
    borderRadius: 8,
    padding: 2, 
    marginTop: 16,
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signinLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signinLinkText: {
    color: '#666',
  },
  signinBold: {
    color: '#F57C00',
    fontWeight: 'bold',
  },
});
