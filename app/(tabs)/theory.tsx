import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';

export default function TheoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('History');
  const flatListRef = useRef<FlatList<any>>(null);
  const screenWidth = Dimensions.get('window').width;

  const tabClick = useRef(false);
  const handleTabChange = (tab: string) => {
    tabClick.current = true;
    setActiveTab(tab);
    const index = tab === 'History' ? 0 : 1;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
    setTimeout(() => { tabClick.current = false; }, 500);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    if (tabClick.current) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveTab(index === 0 ? 'History' : 'Theory');
  };

  const HistoryContent = () => (
    <ImageBackground
      source={require('@/assets/images/history.jpeg')}
      style={[styles.scrollContainer, { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
      imageStyle={{ resizeMode: 'cover' , opacity: 0.9}}
    >
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentSection}>
        <View style={styles.circle} />
        <View style={styles.line} />
        <View style={styles.filledCircle} />

        <View style={{ position: 'absolute', left: 30, top: 60, zIndex: 10, width: 100 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>2000+ Years Ago</Text>
        </View>
        <View style={{ position: 'absolute', left: 205, top: 60, zIndex: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Origins</Text>
        </View>
        <View style={{ position: 'absolute', left: 210, top: 85, zIndex: 10, width: 150 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 8 }}>
            Temple rituals in Tamil Nadu.
          </Text>
        </View>

        <MediaCircle
          image={require('@/assets/images/lotus.png')}
          mediaType="video"
          title="Origins"
        />
        <View style={styles.horizontalLine} />
        <View style={styles.filledCircle2} />


        <View style={{ position: 'absolute', left: 210, top: 155, zIndex: 10, width: 140 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Sangam Period (500 BCE – 200 CE)</Text>
        </View>
        <View style={{ position: 'absolute', left: 28, top: 155, zIndex: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Dance in Literature</Text>
        </View>
        <View style={{ position: 'absolute', left: 7, top: 180, zIndex: 10, width: 145 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 8, textAlign: 'right' }}>
            Dance celebrated in literature.
          </Text>
        </View>

        <MediaCircle
          image={require('@/assets/images/sangam.png')}
          mediaType="audio"
          title="Sangam Period"
        />
        <View style={styles.horizontalLine} />
        <View style={styles.filledCircle2} />



        <View style={{ position: 'absolute', left: 30, top: 260, zIndex: 10, width: 100 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Medieval Period</Text>
        </View>
        <View style={{ position: 'absolute', left: 205, top: 255, zIndex: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Temple Dance Tradition</Text>
        </View>
        <View style={{ position: 'absolute', left: 210, top: 280, zIndex: 10, width: 150 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 8 }}>
            Traditional performances in historic temples.
          </Text>
        </View>

        <MediaCircle
          image={require('@/assets/images/temple.png')}
          mediaType="presentation"
          title="Temple Dance Tradition"
        />
        <View style={styles.horizontalLine} />
        <View style={styles.filledCircle2} />


        <View style={{ position: 'absolute', left: 220, top: 365, zIndex: 10, width: 110 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>18th Century</Text>
        </View>
        <View style={{ position: 'absolute', left: 38, top: 355, zIndex: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Codifying the Art</Text>
        </View>
        <View style={{ position: 'absolute', left: 7, top: 380, zIndex: 10, width: 145 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 8, textAlign: 'right' }}>
            Codification of the art.
          </Text>
        </View>

        <MediaCircle
          image={require('@/assets/images/masks.png')}
          mediaType="video"
          title="Codifying the Art"
        />
        <View style={styles.horizontalLine} />
        <View style={styles.filledCircle2} />



        <View style={{ position: 'absolute', left: 15, top: 455, zIndex: 10, width: 130 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>19th – Early 20th Century</Text>
        </View>
        <View style={{ position: 'absolute', left: 205, top: 455, zIndex: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Decline and Transition</Text>
        </View>
        <View style={{ position: 'absolute', left: 210, top: 480, zIndex: 10, width: 150 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 8 }}>
            Impact of colonial suppression.
          </Text>
        </View>

        <MediaCircle
          image={require('@/assets/images/chain.png')}
          mediaType="audio"
          title="Decline and Transition"
        />
        <View style={styles.horizontalLine} />
        <View style={styles.filledCircle2} />


        <View style={{ position: 'absolute', left: 220, top: 560, zIndex: 10, width: 110 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>20th Century</Text>
        </View>
        <View style={{ position: 'absolute', left: 40, top: 550, zIndex: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Rebirth on Stage</Text>
        </View>
        <View style={{ position: 'absolute', left: 5, top: 575, zIndex: 10, width: 145 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 8, textAlign: 'right' }}>
            Revival on stage by visionary leaders.
          </Text>
        </View>

        <MediaCircle
          image={require('@/assets/images/stage.png')}
          mediaType="video"
          title="Rebirth on Stage"
        />
        <View style={styles.horizontalLine} />
        <View style={styles.filledCircle2} />



        <View style={{ position: 'absolute', left: 5, top: 650, zIndex: 10, width: 150 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Late 20th Century – Present</Text>
        </View>
        <View style={{ position: 'absolute', left: 205, top: 645, zIndex: 10 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>Global Recognition</Text>
        </View>
        <View style={{ position: 'absolute', left: 210, top: 670, zIndex: 10, width: 150 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffffff', backgroundColor: 'transparent', paddingHorizontal: 4, paddingVertical: 4, borderRadius: 8 }}>
            Thriving worldwide with modern influences.
          </Text>
        </View>

        <MediaCircle
          image={require('@/assets/images/globe.png')}
          mediaType="presentation"
          title="Global Recognition"
        />
        <View style={styles.horizontalLine2} />
        <View style={styles.circle} />
      </ScrollView>
    </ImageBackground>
  );

  function MediaCircle({ image, mediaType, title }: { image: any; mediaType?: 'video' | 'audio' | 'presentation'; title?: string }) {
    return (
      <TouchableOpacity
        style={styles.circleBig}
        onPress={() => {
          router.push({ pathname: '/media', params: { type: mediaType ?? 'video', title: title ?? '' } } as any);
        }}
      >
        <Image source={image} style={{ width: 30, height: 30, alignSelf: 'center', marginTop: 8 }} contentFit="contain" />
        {mediaType && (
          <View style={styles.mediaBadge}>
            <Ionicons
              name={mediaType === 'video' ? 'play' : mediaType === 'audio' ? 'musical-notes' : 'document-text'}
              size={12}
              color="#fff"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  const theoryTopics = [
    { key: 'Mudras', label: 'Mudras' },
    { key: 'Abhinaya', label: 'Abhinaya' },
    { key: 'Nritta', label: 'Nritta' },
    { key: 'Natya', label: 'Natya' },
    { key: 'Sthanas', label: 'Sthanas' },
    { key: 'Adavus', label: 'Adavus' },
    { key: 'Varnam', label: 'Varnam' },
    { key: 'Alarippu', label: 'Alarippu' },
  ];

  const TheoryContent = () => (
    <ImageBackground
      source={require('@/assets/images/main-menu.jpeg')}
      style={[styles.scrollContainer, { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
      imageStyle={{ resizeMode: 'cover', opacity: 0.9 }}
    >
      <FlatList
        data={theoryTopics}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.key}
            style={styles.glassCard}
            onPress={() => {
              router.push({
                pathname: '/theory-topic',
                params: { topic: item.key },
              } as any);
            }}
          >
            <View style={styles.glassCardContent}>
              <Text style={styles.glassCardText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        numColumns={2}
        contentContainerStyle={styles.glassGridContainer}
        columnWrapperStyle={styles.glassGridRow}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );

  const tabContent = [
    { key: 'History', component: <HistoryContent /> },
    { key: 'Theory', component: <TheoryContent /> },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 0 }]}>
      <Header title="Theory" />

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'History' ? styles.activeTab : null]}
            onPress={() => handleTabChange('History')}
          >
            <Text style={activeTab === 'History' ? styles.activeTabText : styles.tabText}>History</Text>
            {activeTab === 'History' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Theory' ? styles.activeTab : null]}
            onPress={() => handleTabChange('Theory')}
          >
            <Text style={activeTab === 'Theory' ? styles.activeTabText : styles.tabText}>Theory</Text>
            {activeTab === 'Theory' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={tabContent}
          renderItem={({ item }) => <View style={{ width: screenWidth, flex: 1 }}>{item.component}</View>}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.key}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  theoryGridContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theoryGridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  theoryCard: {
    backgroundColor: '#B25B2A',
    borderRadius: 16,
    width: 150,
    height: 90,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  theoryCardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Glass effect styles
  glassGridContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassGridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  glassCard: {
    width: 150,
    height: 90,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  glassCardContent: {
    flex: 1,
    backgroundColor: 'rgba(178, 91, 42, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(178, 91, 42, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  glassCardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'transparent',
  },
  newBadgeText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 20
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
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
    alignItems: 'center',
  },

  activeTab: {
    position: 'relative',
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

  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A47E74',
  },

  scrollContainer: {
    flex: 1,
  },

  contentSection: {
    paddingTop: 20,
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 100,
  },

  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: '#ffffffff',
    backgroundColor: 'transparent',
  },

  line: {
    width: 3,
    height: 20,
    backgroundColor: '#ffffffff',
    marginTop: -1,
  },

  filledCircle: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#ffffffff',
    marginTop: -1,
  },

  horizontalLine: {
    width: 3,
    height: 40,
    backgroundColor: '#ffffffff',
  },

  horizontalLine2: {
    width: 3,
    height: 30,
    backgroundColor: '#ffffffff',
  },

  filledCircle2: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#ffffffff',
    marginTop: -1,
  },

  circleBig: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffffffff',
    backgroundColor: 'transparent',
  },
  mediaBadge: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    backgroundColor: '#B25B2A',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },

});
