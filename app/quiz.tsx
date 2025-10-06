import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCompletedTopics } from '../data';

export default function QuizScreen() {
  const router = useRouter();
  const { category, topics } = useLocalSearchParams();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const completedTopicTitles = topics ? JSON.parse(topics as string) : [];
  const availableTopics = getCompletedTopics(category as string, completedTopicTitles);

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic);
    router.push({
      pathname: '/quiz-interface',
      params: {
        category: category,
        topicTitle: topic.title,
        topicId: topic.id.toString()
      }
    });
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/main-menu.jpeg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {category === 'theory' ? 'Theory Quiz' : 'Techniques Quiz'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.introSection}>
            <Text style={styles.introTitle}>Available Quiz Topics</Text>
            <Text style={styles.introText}>
              Select a topic you have completed to start the quiz. Each quiz contains 15 questions.
            </Text>
          </View>

          {availableTopics.length > 0 ? (
            <View style={styles.topicsContainer}>
              {availableTopics.map((topic, index) => (
                <TouchableOpacity
                  key={topic.id}
                  style={styles.topicCard}
                  onPress={() => handleTopicSelect(topic)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#A0522D', '#CD853F', '#D2B48C']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.topicGradient}
                  >
                    <View style={styles.topicHeader}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      <Ionicons name="play-circle" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.topicDescription}>{topic.description}</Text>
                    <View style={styles.topicFooter}>
                      <Text style={styles.questionCount}>
                        {topic.questions.length} Questions
                      </Text>
                      <Text style={styles.startText}>Start Quiz →</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="book-outline" size={64} color="#ffffffff" />
              <Text style={styles.emptyTitle}>No Topics Available</Text>
              <Text style={styles.emptyText}>
                Complete some {category} topics first to unlock quizzes.
              </Text>
              <TouchableOpacity 
                style={styles.studyButton}
                onPress={() => router.push('/theory')}
              >
                <Text style={styles.studyButtonText}>Study Topics</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 24,
  },
  introSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#7A4D3A',
    lineHeight: 20,
  },
  topicsContainer: {
    gap: 16,
  },
  topicCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  topicGradient: {
    padding: 20,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
  },
  topicDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  startText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#ffffffff',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  studyButton: {
    backgroundColor: '#7A4D3A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  studyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
