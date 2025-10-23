import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    console.log('Sign in data:', formData);
    router.replace('/main-menu' as any);
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
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
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>Back!</Text>
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
              <TextInput
                style={styles.input}
                placeholder="Email / Phone Number"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
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
            </View>

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleForgotPassword} >
                <Text style={styles.forgotPasswordText}>forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signinContainer}>
            <TouchableOpacity
              style={styles.signInBtn}
              activeOpacity={0.9}
              onPress={handleSignIn}
            >
              <Text style={styles.signInBtnText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign up here</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('@/assets/images/google.png')}
                style={styles.socialIcon}
                contentFit="contain"
              />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('@/assets/images/facebook.png')}
                style={styles.socialIcon}
                contentFit="contain"
              />
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 80,
    flex: 1,
    paddingRight: 20,
    justifyContent: 'center'
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120
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
    marginBottom: 12
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline'
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
  signinContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center'
  },
  signInBtn: {
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
  signInBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd'
  },
  orText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
    fontWeight: '500'
  },
  socialContainer: {
    paddingHorizontal: 20,
    gap: 6
  },
  socialButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12
  },
  socialButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16
  },
  signUpText: {
    color: '#000',
    fontSize: 16
  },
  signUpLink: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});