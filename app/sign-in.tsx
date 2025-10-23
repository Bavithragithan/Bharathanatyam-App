import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      <Image
        source={require('@/assets/images/welcome.jpeg')}
        contentFit="cover"
        style={styles.bgImage}
        cachePolicy="memory-disk"
      />
      <View style={styles.overlay}>
        <View style={styles.bannerContainer}>
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

            
          </View>

            <View style={styles.formContainer}>
              <BlurView intensity={25} tint="light" style={styles.formBlur} />
              <LinearGradient
                colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.formSheen}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email / Phone Number"
                  placeholderTextColor="rgba(0, 0, 0, 0.7)"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
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
                      color="rgba(0, 0, 0, 0.7)"
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
                <BlurView intensity={20} tint="light" style={styles.signinBtnBlur} />
                <LinearGradient
                  colors={["rgba(255, 215, 0, 0.3)", "rgba(218, 165, 32, 0.2)", "rgba(184, 134, 11, 0.15)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signinBtnSheen}
                />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B1D12',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  bannerContainer: {
    height: 80,
    position: 'relative'
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 30,
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
    paddingVertical: 0,
    alignItems: 'flex-start',
    minHeight: 40,
    marginTop: 30,
  },
  textContainer: {
    paddingTop: 0,
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
    color: '#ffffffff',
    lineHeight: 36,
    marginBottom: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffffff',
    lineHeight: 36,
    marginTop: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  formContainer: {
    backgroundColor: 'rgba(188, 97, 53, 0.15)',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    marginTop: 30,
  },
  formBlur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
  formSheen: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
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
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  passwordContainer: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
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
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  signinBtnBlur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
  signinBtnSheen: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  orText: {
    marginHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  socialContainer: {
    paddingHorizontal: 20,
    gap: 6
  },
  socialButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    color: '#FFFFFF',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  signUpLink: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
});