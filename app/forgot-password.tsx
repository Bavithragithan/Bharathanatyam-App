import { Image } from 'expo-image';
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
        // Navigate to OTP Verification screen after sending code
        router.push('/otp-verification');
    };

    const handleSignIn = () => {
        router.push('/sign-in');
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
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
                            <Text style={styles.title}>Forgot</Text>
                            <Text style={styles.subtitle}>Your Password?</Text>
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

                        </View>
                    </View>

                    <View style={styles.signupContainer}>
                        <TouchableOpacity
                            style={styles.signUpBtn}
                            activeOpacity={0.9}
                            onPress={handleSignUp}
                        >
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
        paddingTop: 135,
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
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: 40,
        marginBottom: 2
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: 36,
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
        fontSize: 20,
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
