import MainMenuHeader from '@/components/ui/MainMenuHeader';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainMenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <MainMenuHeader />
      <ImageBackground 
        source={require('@/assets/images/main-menu.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>

          <View style={styles.grid}>
            {tiles.slice(0, 4).map((t, i) => (
              <TouchableOpacity key={i} activeOpacity={0.9} style={styles.tile} onPress={() => {
                const routes = [
                  '/(tabs)/theory' as const,
                  '/(tabs)/techniques' as const, 
                  '/(tabs)/workouts' as const,
                  '/(tabs)/community' as const
                ];
                router.push(routes[i]);
              }}>
                <Text style={styles.tileText}>{t.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.singleTileWrapper}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.tile, styles.singleTile]} onPress={() => {
              router.push('/(tabs)/choreography');
            }}>
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
      </ImageBackground>

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
  );
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: 'rgba(139, 69, 19, 0.85)', // Much more opaque brown background
    borderWidth: 2,
    borderColor: 'rgba(218, 165, 32, 0.9)', // Strong gold border
    shadowColor: '#000000',
    shadowOpacity: 0.4, // Dark shadow for better separation
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 25,
    overflow: 'hidden',
    position: 'relative',
    // Solid appearance with subtle highlights
    borderTopColor: 'rgba(255, 255, 255, 0.3)', // Subtle top highlight
    borderLeftColor: 'rgba(255, 255, 255, 0.2)', // Subtle left highlight
    borderRightColor: 'rgba(0, 0, 0, 0.3)', // Dark right shadow
    borderBottomColor: 'rgba(0, 0, 0, 0.4)', // Dark bottom shadow
  },
  tileText: {
    color: '#FFFFFF', // White text for better visibility
    fontWeight: '900',
    fontSize: 20, // Larger font for better readability
    textShadowColor: 'rgba(0, 0, 0, 0.9)', // Stronger dark shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    zIndex: 2,
    letterSpacing: 1, // Increased letter spacing
    // Remove glow effect for cleaner look
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


