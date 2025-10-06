import OnboardingVideo from '@/components/onboarding-video';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Step = 1 | 2 | 3 | 4;

export default function GetStartedUnifiedScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<'none' | 'forward' | 'backward'>('none');
  const [selection, setSelection] = useState<Record<string, string | null>>({
    level: null,
    experience: null,
    focus: null,
    classes: null,
  });

  const content = useMemo(() => {
    switch (step) {
      case 1:
        return {
          title: 'What is your learning\nlevel?',
          options: ['Beginner', 'Intermediate', 'Advanced'],
          key: 'level',
        } as const;
      case 2:
        return {
          title: 'How long is your dance\nexperience?',
          options: ['No Experience', '1 - 2 years', '2 - 5 years', '5+ years'],
          key: 'experience',
        } as const;
      case 3:
        return {
          title: 'Your Focus Areas?',
          options: ['Nritta', 'Abhinayam', 'Mutras', 'Footwork & Rhythm', 'Varnam'],
          key: 'focus',
        } as const;
      case 4:
      default:
        return {
          title: 'How many classes do\nyou attend weekly?',
          options: ['1', '2', '3', '4', '5', '6', '7'],
          key: 'classes',
        } as const;
    }
  }, [step]);

  const onNext = () => {
    if (step < 4) {
      setDirection('forward');
      return;
    }
    // Step 4: navigate immediately without playing more video
    router.push('/sign-up');
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingVideo
        segmentIndex={step}
        totalSegments={4}
        playDirection={direction}
        onDone={() => {
          const d = direction;
          setDirection('none');
          if (d === 'forward') {
            if (step < 4) setStep((s) => (s + 1) as Step);
            else router.push('/sign-up');
          } else if (d === 'backward') {
            if (step > 1) setStep((s) => (s - 1) as Step);
          }
        }}
      />

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.topBar} pointerEvents="box-none">
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.8} onPress={() => (step > 1 ? setDirection('backward') : router.back())}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${step * 25}%` }]} />
            </View>
            <Text style={styles.progressText}>{step}/4</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.question}>{content.title}</Text>
          {content.options.map((opt) => {
            const selected = selection[content.key] === opt;
            return (
              <TouchableOpacity key={opt} onPress={() => setSelection((s) => ({ ...s, [content.key]: opt }))} activeOpacity={0.9} style={[styles.option, step === 4 && styles.optionSmall, selected && styles.optionSelected]}>
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.nextBtn} activeOpacity={0.9} onPress={onNext}>
          <Text style={styles.nextBtnText}>{step < 4 ? 'Next' : 'Finish'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backIcon: {
    color: '#000000ff',
    fontSize: 32,
    lineHeight: 28,
    marginTop: -4,
  },
  progressWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#BC6135',
  },
  progressText: {
    color: '#fff',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  question: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 18,
  },
  option: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  optionSelected: {
    backgroundColor: '#fff',
  },
  optionSmall: {
    paddingVertical: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  optionTextSelected: {
    color: '#1b1b1b',
  },
  nextBtn: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#B05C37',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});


