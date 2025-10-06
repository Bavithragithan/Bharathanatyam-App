import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OtpVerificationScreen() {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [seconds, setSeconds] = useState<number>(30);
    const inputsRef = useRef<Array<TextInput | null>>([null, null, null, null]);

    // Reset OTP and timer whenever this screen is focused
    useFocusEffect(
        useCallback(() => {
            setOtp(['', '', '', '']);
            setSeconds(30);
        }, [])
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(0, 1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);

        if (digit && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (index: number, key: string) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const canSubmit = otp.every((d) => d.length === 1);

    const handleResend = () => {
        if (seconds > 0) return;
        setSeconds(30);
    };

    const handleSubmit = () => {
        if (!canSubmit) return;
        router.push('/reset-password' as any);
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
                            <Text style={styles.title}>OTP Verification</Text>
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
                        <Text style={styles.formLabel}>Enter Your OTP Code</Text>

                        <View style={styles.otpRow}>
                            {otp.map((val, idx) => (
                                <TextInput
                                    key={idx}
                                    ref={(el) => { inputsRef.current[idx] = el; }}
                                    style={styles.otpInput}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={val}
                                    onChangeText={(t) => handleChange(idx, t)}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(idx, nativeEvent.key)}
                                    autoFocus={idx === 0}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.resendRow}>
                        {seconds > 0 ? (
                            <Text style={styles.resendText}>
                                <Text style={styles.resendMuted}>Didn't get the code? </Text>
                                <Text style={styles.resendStrong}>Resend in {seconds}s</Text>
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={[styles.resendText, styles.resendLink, styles.resendStrong]}>Resend code</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
                            activeOpacity={0.9}
                            onPress={handleSubmit}
                            disabled={!canSubmit}
                        >
                            <Text style={styles.submitBtnText}>Reset Password</Text>
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
        paddingTop: 120,
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: 40,
        marginBottom: 2
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
    formLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    otpInput: {
        width: 64,
        height: 64,
        backgroundColor: '#fff',
        borderRadius: 14,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    resendRow: {
        alignItems: 'center',
        marginTop: 8,
        paddingHorizontal: 20
    },
    resendText: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center'
    },
    resendMuted: {
        fontWeight: 'normal'
    },
    resendStrong: {
        fontWeight: 'bold'
    },
    resendLink: {
        textDecorationLine: 'underline'
    },
    submitContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center'
    },
    submitBtn: {
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
    submitBtnDisabled: {
        opacity: 0.6
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});


