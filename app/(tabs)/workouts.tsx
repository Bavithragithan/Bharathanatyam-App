import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../../components/ui/Header';
import { searchWorkouts } from '../../data';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

type Category = 'All' | 'Warmup' | 'Mobility' | 'Cardio' | 'Stretching';

export default function WorkoutsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Warmup', 'Mobility', 'Cardio', 'Stretching'];

  const filteredWorkouts = searchWorkouts(searchQuery, activeCategory);

  const handleWorkoutPress = (item: any) => {
    router.push('/video-player');
  };

  const renderWorkoutCard = ({ item }: { item: any }) => (
    <View style={styles.workoutCard}>
      <View style={styles.glassCardContent}>
        <TouchableOpacity 
          style={styles.cardTouchable} 
          activeOpacity={0.8}
          onPress={() => handleWorkoutPress(item)}
        >
          <View style={styles.thumbnailContainer}>
            <Image source={item.thumbnail} style={styles.thumbnail} contentFit="cover" />
            <View style={styles.playButton}>
              <Ionicons name="play" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Workouts" backgroundColor="#FDF2F8" />

      <ImageBackground
        source={require('@/assets/images/main-menu.jpeg')}
        style={[styles.content, { flex: 1 }]}
        imageStyle={{ resizeMode: 'cover', opacity: 0.9 }}
      >
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Workouts"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  activeCategory === category && styles.activeCategoryButton
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.cardsContainer}>
            <FlatList
              data={filteredWorkouts}
              renderItem={renderWorkoutCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryButton: {
    backgroundColor: 'rgba(183, 95, 55, 0.8)',
    borderColor: 'rgba(183, 95, 55, 0.3)',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7A4D3A',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  cardsContainer: {
    flex: 1,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  workoutCard: {
    width: cardWidth,
    borderRadius: 16,
    marginBottom: 20,
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  cardTouchable: {
    flex: 1,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});