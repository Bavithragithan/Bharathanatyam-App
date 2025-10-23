import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OtpVerificationScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [seconds, setSeconds] = useState<number>(30);
    const inputsRef = useRef<Array<TextInput | null>>([null, null, null, null]);

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
                        <Text style={styles.title}>OTP Verification</Text>
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
                        <BlurView intensity={20} tint="light" style={styles.submitBtnBlur} />
                        <LinearGradient
                            colors={["rgba(255, 215, 0, 0.3)", "rgba(218, 165, 32, 0.2)", "rgba(184, 134, 11, 0.15)"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.submitBtnSheen}
                        />
                        <Text style={styles.submitBtnText}>Reset Password</Text>
                    </TouchableOpacity>
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
    formContainer: {
        backgroundColor: 'rgba(188, 97, 53, 0.50)',
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
    formLabel: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    otpInput: {
        width: 64,
        height: 64,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 14,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    },
    resendRow: {
        alignItems: 'center',
        marginTop: 8,
        paddingHorizontal: 20
    },
    resendText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
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
    submitBtnDisabled: {
        opacity: 0.6
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        zIndex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    submitBtnBlur: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15,
    },
    submitBtnSheen: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15,
    }
});


