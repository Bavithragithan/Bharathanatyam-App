import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomePage() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/images/welcome.png')}
        contentFit="cover"
        style={styles.bgImage}
        cachePolicy="memory-disk"
      />

      <LinearGradient
        style={styles.bottomOverlay}
        colors={["rgba(0,0,0,0)", "rgba(34,16,9,0.55)", "rgba(58,26,16,0.75)"]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.glassCard}>
          <BlurView intensity={35} tint="dark" style={styles.glassBlur} />
          <LinearGradient
            colors={["rgba(255,255,255,0.22)", "rgba(255,255,255,0.04)"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.glassSheen}
          />

          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.subtitle}>Bharatanatyam Mastery</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
          onPress={() => router.push('/get-started')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.secondaryButton} 
          activeOpacity={0.85} 
          onPress={() => router.push('/sign-in')}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
  bottomOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  glassCard: {
    width: '100%',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'rgba(195, 107, 19, 0.28)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  glassBlur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
  },
  glassSheen: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
  },
  title: {
    fontSize: 32,
    color: '#ffffffff',
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 0,
    fontSize: 24,
    color: '#ffffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryButton: {
    marginTop: 40,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  primaryButtonText: {
    color: '#BC6135',
    fontSize: 24,
    fontWeight: 'normal',
  },
  secondaryButton: {
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffffff',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#FFEDE6',
    fontSize: 22,
    fontWeight: '700',
  },
});

