import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [nameError, setNameError] = useState('');
  const [emailPhoneError, setEmailPhoneError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^(\+\d{1,3}\s?)?\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 1: return '#ff4444';
      case 2: return '#ffbb33';
      case 3: return '#ffeb3b';
      case 4: return '#00C851';
      case 5: return '#007E33';
      default: return '#ddd';
    }
  };

  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Strong';
      case 5: return 'Very Strong';
      default: return 'Too Weak';
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    return strength;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'name') {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
      
      if (value !== lettersOnly) {
        setNameError('Only letters are allowed');
      } else {
        setNameError('');
      }
      
      setFormData(prev => ({ ...prev, name: lettersOnly }));
    } else if (field === 'email') {
      setFormData(prev => ({ ...prev, email: value }));
      
      if (value.length > 0) {
        if (!isValidEmail(value) && !isValidPhoneNumber(value)) {
          setEmailPhoneError('Please enter a valid email address or phone number');
        } else {
          setEmailPhoneError('');
        }
      } else {
        setEmailPhoneError('');
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (field === 'password') {
        setPasswordStrength(calculatePasswordStrength(value));
      }
    }
  };

  const handleSignUp = () => {
    console.log('Sign up data:', formData);
    router.replace('/');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          <View style={styles.bannerContainer}>
            <Image
              source={require('@/assets/images/wave.png')}
              style={styles.waveImage}
              contentFit="cover"
            />
            <View style={styles.bannerOverlay}>
              <TouchableOpacity
                style={styles.backBtn}
                activeOpacity={0.8}
                onPress={() => router.back()}
              >
                <Text style={styles.backIcon}>‹</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentArea}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Create!</Text>
              <Text style={styles.subtitle}>your account</Text>
            </View>

            <View style={styles.illustrationContainer}>
              <Image
                source={require('@/assets/images/logo-2.png')}
                style={styles.logo}
                contentFit="contain"
              />
            </View>
          </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View>
                  <TextInput
                    style={[styles.input, nameError ? styles.inputError : null]}
                    placeholder="Name"
                    placeholderTextColor="#999"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                  />
                  {nameError ? (
                    <Text style={styles.errorText}>{nameError}</Text>
                  ) : null}
                </View>
                <View>
                  <TextInput
                    style={[styles.input, emailPhoneError ? styles.inputError : null]}
                    placeholder="Email / Phone Number"
                    placeholderTextColor="#999"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {emailPhoneError ? (
                    <Text style={styles.errorText}>{emailPhoneError}</Text>
                  ) : null}
                </View>
                <View>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Password"
                      placeholderTextColor="#999"
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                  {formData.password !== '' && (
                    <View style={styles.strengthContainer}>
                      <View style={styles.strengthBars}>
                        {[1, 2, 3, 4, 5].map((level) => (
                          <View
                            key={level}
                            style={[
                              styles.strengthBar,
                              {
                                backgroundColor: level <= passwordStrength ? getStrengthColor(passwordStrength) : '#ddd'
                              }
                            ]}
                          />
                        ))}
                      </View>
                      <Text style={styles.strengthText}>
                        {getStrengthLabel(passwordStrength)}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.signupContainer}>
              <TouchableOpacity
                style={styles.signUpBtn}
                activeOpacity={0.9}
                onPress={handleSignUp}
              >
                <Text style={styles.signUpBtnText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign in here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4444'
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  strengthContainer: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  strengthBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  strengthText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  overlay: {
    flex: 1
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 5
  },
  bannerContainer: {
    height: 120,
    position: 'relative'
  },
  waveImage: {
    width: '100%',
    height: 300,
    position: 'absolute',
    top: 0,
    left: 0
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  backIcon: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -2
  },
  contentArea: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'flex-start',
    minHeight: 120
  },
  textContainer: {
    paddingTop: 110,
    flex: 1,
    paddingRight: 20,
    justifyContent: 'center'
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  logo: {
    width: 120,
    height: 180
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 36,
    marginBottom: 2
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 36,
    marginTop: 0
  },
  formContainer: {
    backgroundColor: '#BC6135',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000'
  },
  passwordContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000'
  },
  eyeIcon: {
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  signupContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center'
  },
  signUpBtn: {
    backgroundColor: '#BC6135',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  signUpBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  signInText: {
    color: '#000',
    fontSize: 16
  },
  signInLink: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});
