import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [emailPhoneError, setEmailPhoneError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phone: string) => {
        const phoneRegex = /^(\+\d{1,3}\s?)?\d{10}$|^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        if (field === 'email') {
            if (value.length > 0) {
                if (!isValidEmail(value) && !isValidPhoneNumber(value)) {
                    setEmailPhoneError('Please enter a valid email address or phone number');
                } else {
                    setEmailPhoneError('');
                }
            } else {
                setEmailPhoneError('');
            }
        }
    };

    const handleSignUp = () => {
        router.push('/otp-verification');
    };

    const handleSignIn = () => {
        router.push('/sign-in');
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <Image
                source={require('@/assets/images/welcome.jpeg')}
                contentFit="cover"
                style={styles.bgImage}
                cachePolicy="memory-disk"
            />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
                        <Text style={styles.title}>Forgot</Text>
                        <Text style={styles.subtitle}>Your Password?</Text>
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
                        <View>
                            <TextInput
                                style={[styles.input, emailPhoneError ? styles.inputError : null]}
                                placeholder="Email / Phone Number"
                                placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {emailPhoneError ? (
                                <Text style={styles.errorText}>{emailPhoneError}</Text>
                            ) : null}
                        </View>
                    </View>
                </View>

                <View style={styles.signupContainer}>
                    <TouchableOpacity
                        style={styles.signUpBtn}
                        activeOpacity={0.9}
                        onPress={handleSignUp}
                    >
                        <BlurView intensity={20} tint="light" style={styles.signupBtnBlur} />
                        <LinearGradient
                            colors={["rgba(255, 215, 0, 0.3)", "rgba(218, 165, 32, 0.2)", "rgba(184, 134, 11, 0.15)"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.signupBtnSheen}
                        />
                        <Text style={styles.signUpBtnText}>Send Code</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Remember your password? </Text>
                    <TouchableOpacity onPress={handleSignIn}>
                        <Text style={styles.signInLink}>Sign in</Text>
                    </TouchableOpacity>
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
        height: 120,
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
        marginTop: 50,
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
    signupContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center'
    },
    signUpBtn: {
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
    signUpBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        zIndex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    signupBtnBlur: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15,
    },
    signupBtnSheen: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    signInText: {
        color: '#FFFFFF',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    signInLink: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    }
});
