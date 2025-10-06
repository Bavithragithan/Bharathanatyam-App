import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dailyChallenges } from '../data.js';

export default function ChallengeDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Number(params.id);
  
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [challengeDuration] = useState(15 * 60); // 15 minutes in seconds

  const challenge = useMemo(() => dailyChallenges.find((c: any) => c.id === id), [id]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, timeLeft]);

  const startChallenge = () => {
    setIsTimerActive(true);
    setTimeLeft(challengeDuration);
  };

  const stopChallenge = () => {
    setIsTimerActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Challenge</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={require('@/assets/images/daily-practice.png')} style={styles.banner} resizeMode="cover" />
            <Text style={styles.title}>{challenge?.title || 'Challenge'}</Text>
            <Text style={styles.description}>{challenge?.description || 'Complete this challenge to earn points.'}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaPill}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.metaText}>{challenge?.points ?? 0} pts</Text>
              </View>
              <View style={[styles.metaPill, { backgroundColor: '#FFF4EC' }] }>
                <Ionicons name="time-outline" size={16} color="#B8732F" />
                <Text style={[styles.metaText, { color: '#B8732F' }]}>Daily</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How it works</Text>
              <Text style={styles.sectionText}>Start the challenge and complete the required activity. Your progress will be tracked automatically. Come back tomorrow for a new daily challenge.</Text>
            </View>
          </View>

          {isTimerActive ? (
            <View style={styles.timerContainer}>
              <View style={styles.timerDisplay}>
                <Ionicons name="time" size={24} color="#B8732F" />
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              </View>
              <TouchableOpacity style={styles.stopButton} onPress={stopChallenge} activeOpacity={0.85}>
                <Text style={styles.stopButtonText}>Stop Challenge</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.primaryButton} onPress={startChallenge} activeOpacity={0.85}>
              <Text style={styles.primaryButtonText}>Start Challenge</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EDEF',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7A4D3A',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#7A4D3A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  metaText: {
    color: '#7A4D3A',
    fontWeight: '700',
  },
  section: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#7A4D3A',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  thumb: {
    width: '32%',
    height: 80,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  primaryButton: {
    backgroundColor: '#B8732F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  timerText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#B8732F',
  },
  stopButton: {
    backgroundColor: '#E53E3E',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});


