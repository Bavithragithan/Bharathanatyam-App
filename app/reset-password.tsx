import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ResetPasswordScreen() {
    const router = useRouter();
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
        if (strengthScore >= 4) return '#1DB954'; // green
        if (strengthScore === 3) return '#46B17B';
        if (strengthScore === 2) return '#E0A800';
        if (strengthScore === 1) return '#E07B00';
        return '#D0D0D0';
    }, [strengthScore]);

    // no timers to clean up

    const canSubmit = password.length >= 8 && /\d/.test(password) && /[^A-Za-z0-9]/.test(password) && password === confirmPassword;

    const handleSubmit = () => {
        if (!canSubmit) return;
        router.replace('/sign-in' as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
                <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
                                    <Text style={styles.title}>Reset Password</Text>
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
                                <Text style={styles.tipTitle}>*Your new password should be at least 8
                                    characters, including a number and a
                                    special character</Text>

                                <Text style={styles.inputLabel}>*New password</Text>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="New password"
                                        placeholderTextColor="#999"
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
                                        placeholderTextColor="#999"
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
        paddingTop: 75,
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
        color: '#000'
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
    tipTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12
    },
    inputLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
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
    strengthRow: {
        marginTop: 8,
        marginBottom: 4
    },
    strengthBarBg: {
        height: 8,
        backgroundColor: '#E9E9E9',
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
        fontWeight: 'bold'
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



