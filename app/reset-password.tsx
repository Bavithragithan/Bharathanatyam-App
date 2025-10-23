import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const scrollRef = useRef<ScrollView | null>(null);

    const strengthScore = useMemo(() => {
        let score = 0;
        if (password.length >= 8) score += 1;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        if (password.length >= 12) score += 1;
        return score;
    }, [password]);

    const strengthLabel = useMemo(() => {
        switch (true) {
            case strengthScore >= 4:
                return 'Very strong';
            case strengthScore === 3:
                return 'Strong';
            case strengthScore === 2:
                return 'Fair';
            case strengthScore === 1:
                return 'Weak';
            default:
                return 'Too short';
        }
    }, [strengthScore]);

    const strengthColor = useMemo(() => {
        if (strengthScore >= 4) return '#1DB954';
        if (strengthScore === 3) return '#46B17B';
        if (strengthScore === 2) return '#E0A800';
        if (strengthScore === 1) return '#E07B00';
        return '#D0D0D0';
    }, [strengthScore]);

    const canSubmit = password.length >= 8 && /\d/.test(password) && /[^A-Za-z0-9]/.test(password) && password === confirmPassword;

    const handleSubmit = () => {
        if (!canSubmit) return;
        router.replace('/sign-in' as any);
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <Image
                source={require('@/assets/images/welcome.jpeg')}
                contentFit="cover"
                style={styles.bgImage}
                cachePolicy="memory-disk"
            />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
                <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
                                <Text style={styles.title}>Reset Password</Text>
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
                            <Text style={styles.tipTitle}>*Your new password should be at least 8
                                characters, including a number and a
                                special character</Text>

                            <Text style={styles.inputLabel}>*New password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="New password"
                                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => scrollRef.current?.scrollTo({ y: 400, animated: true })}
                                />
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((v) => !v)}>
                                    <Text>👁️</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.strengthRow}>
                                <View style={styles.strengthBarBg}>
                                    <View style={[styles.strengthBarFill, { width: `${(strengthScore / 5) * 100}%`, backgroundColor: strengthColor }]} />
                                </View>
                                <Text style={[styles.strengthLabel, { color: strengthColor }]}>{strengthLabel}</Text>
                            </View>

                            <Text style={[styles.inputLabel, { marginTop: 16 }]}>*Confirm password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Confirm password"
                                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    onFocus={() => scrollRef.current?.scrollToEnd({ animated: true })}
                                />
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword((v) => !v)}>
                                    <Text>👁️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.submitContainer}>
                            <TouchableOpacity
                                style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
                                activeOpacity={0.9}
                                disabled={!canSubmit}
                                onPress={handleSubmit}
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
    tipTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    inputLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
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
    strengthRow: {
        marginTop: 8,
        marginBottom: 4
    },
    strengthBarBg: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
        overflow: 'hidden'
    },
    strengthBarFill: {
        height: 8,
        borderRadius: 8
    },
    strengthLabel: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
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



