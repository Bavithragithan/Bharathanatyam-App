import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';
import { getTechniquesData } from '../../data';

type HotspotKey = 'face' | 'hand' | 'knee' | 'leg' | 'stomach';

export default function TechniquesScreen() {
  const insets = useSafeAreaInsets();
  const [openHotspot, setOpenHotspot] = useState<HotspotKey | null>(null);
  const [mudraIndex, setMudraIndex] = useState(0);
  const [mudraSetIndex, setMudraSetIndex] = useState(0);
  const [activeLevel, setActiveLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const flatListRef = useRef<FlatList<any>>(null);
  const screenWidth = Dimensions.get('window').width;

  const getCurrentTechniqueData = () => {
    if (!openHotspot) return null;
    return getTechniquesData(activeLevel, openHotspot);
  };

  const currentData = getCurrentTechniqueData();
  const currentSets = currentData?.sets || [];

  const nextMudra = () => {
    setMudraSetIndex((s) => (s + 1) % currentSets.length);
    setMudraIndex(0);
  };
  const prevMudra = () => {
    setMudraSetIndex((s) => (s - 1 + currentSets.length) % currentSets.length);
    setMudraIndex(0);
  };

  const closeModal = () => {
    setOpenHotspot(null);
    setMudraIndex(0);
    setMudraSetIndex(0);
  };

  const renderHotspot = (key: HotspotKey, style: any) => (
    <TouchableOpacity key={key} style={[styles.hotspot, style]} activeOpacity={0.8} onPress={() => setOpenHotspot(key)} />
  );

  const handleLevelChange = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setActiveLevel(level);
    const index = level === 'Beginner' ? 0 : level === 'Intermediate' ? 1 : 2;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveLevel(index === 0 ? 'Beginner' : index === 1 ? 'Intermediate' : 'Advanced');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 0 }]}>
      <Header title="Techniques" />

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, activeLevel === 'Beginner' ? styles.activeTab : null]} onPress={() => handleLevelChange('Beginner')}>
            <Text style={activeLevel === 'Beginner' ? styles.activeTabText : styles.tabText}>Beginner</Text>
            {activeLevel === 'Beginner' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeLevel === 'Intermediate' ? styles.activeTab : null]} onPress={() => handleLevelChange('Intermediate')}>
            <Text style={activeLevel === 'Intermediate' ? styles.activeTabText : styles.tabText}>Intermediate</Text>
            {activeLevel === 'Intermediate' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeLevel === 'Advanced' ? styles.activeTab : null]} onPress={() => handleLevelChange('Advanced')}>
            <Text style={activeLevel === 'Advanced' ? styles.activeTabText : styles.tabText}>Advanced</Text>
            {activeLevel === 'Advanced' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={[{ key: 'Beginner' }, { key: 'Intermediate' }, { key: 'Advanced' }]}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, flex: 1 }}>
              <ImageBackground
                source={require('@/assets/images/shivan.jpeg')}
                resizeMode="cover"
                style={[styles.hero, { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
              >
                {renderHotspot('face', { top: '15%', left: '43%' })}
                {renderHotspot('hand', { top: '40%', left: '18%' })}
                {renderHotspot('knee', { top: '65%', left: '30%' })}
                {renderHotspot('leg', { top: '82%', left: '48%' })}
                {renderHotspot('stomach', { top: '42%', left: '45%' })}
              </ImageBackground>
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.key}
          style={{ flex: 1 }}
        />
      </View>

      <Modal visible={openHotspot !== null} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {currentData?.title || 'Techniques'}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                <Text style={styles.closeIcon}>×</Text>
              </TouchableOpacity>
            </View>

            {currentData && currentSets.length > 0 ? (
              <View style={styles.modalBody}>
                <View style={styles.thumbCol}>
                  {currentSets[mudraSetIndex]?.images.map((src: any, i: number) => (
                    <TouchableOpacity key={i} onPress={() => setMudraIndex(i)} style={[styles.thumbWrap, mudraIndex === i && styles.thumbWrapActive]}>
                      <Image source={src} style={styles.thumb} resizeMode="cover" />
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.previewCol}>
                  <Text style={styles.topicTitle}>{mudraSetIndex + 1}. {currentSets[mudraSetIndex]?.title}</Text>
                  <Image source={currentSets[mudraSetIndex]?.images[mudraIndex]} style={styles.preview} resizeMode="cover" />
                  
                  <Text style={styles.description}>{currentSets[mudraSetIndex]?.description}</Text>
                  
                  <ScrollView style={styles.detailsScroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.detailsText}>{currentSets[mudraSetIndex]?.details}</Text>
                  </ScrollView>
                  
                  <View style={styles.carouselBar}>
                    <TouchableOpacity onPress={prevMudra} style={styles.navBtn}><Text style={styles.navBtnText}>Prev</Text></TouchableOpacity>
                    <Text style={styles.counter}>{mudraSetIndex + 1} of {currentSets.length}</Text>
                    <TouchableOpacity onPress={nextMudra} style={styles.navBtn}><Text style={styles.navBtnText}>Next</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.placeholderBody}>
                <Text style={styles.placeholderText}>No content available for this level</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5D6D8',
  },
  tab: {
    width: '33.33%',
    alignItems: 'center',
  },
  activeTab: {
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A47E74',
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A4D3A',
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: -8,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: '#B75F37',
    borderRadius: 2,
  },
  hero: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  hotspot: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7A4D3A',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 22,
    color: '#7A4D3A',
    lineHeight: 22,
    marginTop: -2,
  },
  modalBody: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
  },
  thumbCol: {
    width: 56,
    gap: 8,
  },
  thumbWrap: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  thumbWrapActive: {
    borderColor: '#B75F37',
    borderWidth: 2,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  previewCol: {
    flex: 1,
    alignItems: 'center',
  },
  topicTitle: {
    color: '#7A4D3A',
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 8,
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  carouselBar: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#B75F37',
    borderRadius: 10,
  },
  navBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  counter: {
    color: '#7A4D3A',
    fontWeight: '700',
  },
  placeholderBody: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#7A4D3A',
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    color: '#7A4D3A',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  detailsScroll: {
    maxHeight: 80,
    marginVertical: 8,
  },
  detailsText: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
    textAlign: 'justify',
  },
});
