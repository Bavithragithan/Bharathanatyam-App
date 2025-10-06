import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { ImageBackground, Modal, PanResponder, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MainMenuScreen() {
  const router = useRouter();
  const [showProgressModal, setShowProgressModal] = useState(false);
  
  const tiles = [
    { title: 'Theory' },
    { title: 'Techniques' },
    { title: 'Workouts' },
    { title: 'Community' },
    { title: 'Choreography' },
  ];

  const completedTopics = {
    theory: [
      { id: 1, title: 'Basic Hand Gestures', completed: true },
      { id: 2, title: 'Foot Positions', completed: true },
      { id: 3, title: 'Eye Movements', completed: false },
      { id: 4, title: 'Body Postures', completed: true },
    ],
    techniques: [
      { id: 1, title: 'Adavus - Basic Steps', completed: true },
      { id: 2, title: 'Jatis - Rhythmic Patterns', completed: false },
      { id: 3, title: 'Abhinaya - Expressions', completed: true },
    ]
  };

  const totalTopics = Object.values(completedTopics).flat().length;
  const completedCount = Object.values(completedTopics).flat().filter(topic => topic.completed).length;
  const progressPercentage = (completedCount / totalTopics) * 100;

  return (
    <ImageBackground 
      source={require('@/assets/images/main-menu.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.headerRow}>
            <View style={styles.headerSpacer} />
            <View style={styles.headerIcons}>
              <TouchableOpacity accessibilityLabel="Notifications" style={styles.bellButton}>
                <Ionicons name="notifications-outline" size={28} color="#7A4D3A" />
              </TouchableOpacity>
              <Image source={require('@/assets/images/user.png')} style={styles.avatar} contentFit="cover" />
            </View>
          </View>

          <View style={styles.calendarRow}>
            <WeekStrip />
          </View>

          <View style={styles.grid}>
            {tiles.slice(0, 4).map((t, i) => (
              <TouchableOpacity key={i} activeOpacity={0.9} style={styles.tile} onPress={() => {
                const routes = [
                  '/(tabs)/theory',
                  '/(tabs)/techniques', 
                  '/(tabs)/workouts',
                  '/(tabs)/community'
                ];
                router.push(routes[i]);
              }}>
                <LinearGradient
                  colors={['#A0522D', '#CD853F', '#D2B48C']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBackground}
                />
                <Text style={styles.tileText}>{t.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.singleTileWrapper}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.tile, styles.singleTile]} onPress={() => {
              router.push('/(tabs)/choreography');
            }}>
              <LinearGradient
                colors={['#A0522D', '#CD853F', '#D2B48C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              />
              <Text style={styles.tileText}>{tiles[4].title}</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar Section */}
          <View style={styles.progressSection}>
            <TouchableOpacity 
              style={styles.progressContainer} 
              onPress={() => setShowProgressModal(true)}
              activeOpacity={0.8}
            >
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Quiz Progress</Text>
                <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
              </View>
              <Text style={styles.progressText}>{completedCount} of {totalTopics} topics completed</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Progress Modal */}
        <Modal
          visible={showProgressModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowProgressModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Quiz Topics</Text>
                <TouchableOpacity 
                  onPress={() => setShowProgressModal(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#7A4D3A" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => {
                    setShowProgressModal(false);
                    // Navigate to theory quiz with completed topics
                    router.push({
                      pathname: '/quiz',
                      params: { 
                        category: 'theory',
                        topics: JSON.stringify(completedTopics.theory.filter(t => t.completed).map(t => t.title))
                      }
                    });
                  }}
                >
                  <LinearGradient
                    colors={['#A0522D', '#CD853F', '#D2B48C']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modalButtonGradient}
                  >
                    <Text style={styles.modalButtonText}>Theory</Text>
                    <Text style={styles.modalButtonSubtext}>
                      {completedTopics.theory.filter(t => t.completed).length} completed
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => {
                    setShowProgressModal(false);
                    // Navigate to techniques quiz with completed topics
                    router.push({
                      pathname: '/quiz',
                      params: { 
                        category: 'techniques',
                        topics: JSON.stringify(completedTopics.techniques.filter(t => t.completed).map(t => t.title))
                      }
                    });
                  }}
                >
                  <LinearGradient
                    colors={['#A0522D', '#CD853F', '#D2B48C']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modalButtonGradient}
                  >
                    <Text style={styles.modalButtonText}>Techniques</Text>
                    <Text style={styles.modalButtonSubtext}>
                      {completedTopics.techniques.filter(t => t.completed).length} completed
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

function startOfWeekSunday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  const start = new Date(d.setDate(diff));
  start.setHours(0, 0, 0, 0);
  return start;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function WeekStrip() {
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeekSunday(new Date()));

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  const goPrevWeek = () => setWeekStart(prev => addDays(prev, -7));
  const goNextWeek = () => setWeekStart(prev => addDays(prev, 7));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const swipeThreshold = 40;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 10 && Math.abs(gesture.dy) < 10;
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > swipeThreshold) {
          goPrevWeek();
        } else if (gesture.dx < -swipeThreshold) {
          goNextWeek();
        }
      }
    })
  ).current;

  return (
    <View style={styles.calendarBar} {...panResponder.panHandlers} accessibilityRole="adjustable" accessibilityLabel="Week calendar" accessibilityHint="Swipe left or right to change week">
      <TouchableOpacity onPress={goPrevWeek} accessibilityLabel="Previous week" style={styles.navButton}>
        <Text style={styles.navText}>‹</Text>
      </TouchableOpacity>
      <View style={styles.daysRow}>
        {days.map((d, idx) => {
          const selected = isSameDay(d, today);
          return (
            <View key={idx} style={styles.dayWrapper}>
              <View style={[styles.dayCell, selected && styles.dayCellSelected]}>
                <Text style={[styles.dayLabel, selected && styles.dayLabelSelected]}>{dayNames[d.getDay()]}</Text>
                <Text style={[styles.dateLabel, selected && styles.dateLabelSelected]}>{d.getDate()}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <TouchableOpacity onPress={goNextWeek} accessibilityLabel="Next week" style={styles.navButton}>
        <Text style={styles.navText}>›</Text>
      </TouchableOpacity>
    </View>
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
    paddingTop: 30
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6
  },
  headerSpacer: { width: 34, height: 34 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellButton: { padding: 6 },
  avatar: { width: 34, height: 34, borderRadius: 17 },
  calendarRow: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5D6D8'
  },
  calendarBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  navButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navText: {
    fontSize: 20,
    color: '#7A4D3A',
    fontWeight: '600',
  },
  daysRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 6
  },
  dayWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  dayCell: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  dayCellSelected: {
    backgroundColor: '#B75F37',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  dayLabel: {
    fontSize: 11,
    color: '#7A4D3A',
    fontWeight: '600',
    lineHeight: 12,
  },
  dayLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dateLabel: {
    fontSize: 13,
    color: '#7A4D3A',
    fontWeight: '700',
    lineHeight: 16,
  },
  dateLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  tile: {
    width: '47%',
    height: 100,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(205, 133, 63, 0.4)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  tileText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    zIndex: 2,
    letterSpacing: 0.5,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    zIndex: 1,
  },
  singleTileWrapper: {
    alignItems: 'center',
    paddingHorizontal: 16
  },
  singleTile: {
    width: '95%'
  },
  // Progress Bar Styles
  progressSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  progressContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    color: '#7A4D3A',
    fontSize: 18,
    fontWeight: '700',
  },
  progressPercentage: {
    color: '#7A4D3A',
    fontSize: 16,
    fontWeight: '800',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#DAA520',
    borderRadius: 4,
    shadowColor: '#DAA520',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  progressText: {
    color: '#7A4D3A',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#7A4D3A',
    fontSize: 22,
    fontWeight: '800',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  modalButtons: {
    gap: 16,
  },
  modalButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  modalButtonGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
});


