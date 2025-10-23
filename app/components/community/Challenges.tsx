import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { dailyChallenges } from '../../../data.js';

export default function Challenges() {
  const router = useRouter();
  const renderChallengeCard = (challenge: any) => (
    <View key={challenge.id} style={styles.challengeCard}>
      <View style={styles.glassCardContent}>
        <View style={styles.challengeContent}>
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.pointsText}>{challenge.points}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.joinButton}
          activeOpacity={0.8}
          onPress={() =>
            router.push({ pathname: '/challenge-details', params: { id: String(challenge.id) } } as any)
          }
        >
          <Text style={styles.joinButtonText}>Join Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.challengesList}>
        {dailyChallenges.map((challenge) => renderChallengeCard(challenge))}
      </View>
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  challengesList: {
    paddingTop: 10,
  },
  challengeCard: {
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  glassCardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  challengeContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 248, 225, 0.8)',
    backdropFilter: 'blur(5px)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 248, 225, 0.5)',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F57C00',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#B8732F',
    paddingVertical: 15,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});
