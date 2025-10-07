import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';

const { width: screenWidth } = Dimensions.get('window');

const choreographyTabs = ['Live Classes', 'Teachers', 'Schedule'];

export default function ChoreographyScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Live Classes');
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<
    null | { name: string; title: string; experience: string; bio: string }
  >(null);
  const flatListRef = useRef<FlatList<any>>(null);
  const tabClick = useRef(false);

  const handleTabChange = (tab: string) => {
    tabClick.current = true;
    setActiveTab(tab);
    const index = choreographyTabs.indexOf(tab);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
    setTimeout(() => { tabClick.current = false; }, 500);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    if (tabClick.current) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    const newTab = choreographyTabs[index];
    if (newTab && newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const teachers: { name: string; title: string; experience: string; bio: string }[] = [
    {
      name: 'Smt. Ananya Iyer',
      title: 'Senior Guru',
      experience: '15+ years teaching',
      bio:
        'Ananya Iyer is a senior Bharatanatyam guru specializing in Nritta and Abhinaya. She has choreographed award-winning pieces and trained students worldwide.',
    },
    {
      name: 'Sri. Karthik Subramanian',
      title: 'Choreographer',
      experience: '12 years stage performance',
      bio:
        'Karthik focuses on rhythm-centric choreography and has led ensemble productions across India and abroad.',
    },
    {
      name: 'Smt. Meera Krishnan',
      title: 'Guru & Mentor',
      experience: '20 years mentoring',
      bio:
        'Meera emphasizes technique with expression and has mentored numerous arangetrams and solo recitals.',
    },
  ];

  const LiveClassesComponent = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Live Classes"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <View style={styles.liveClassCard}>
        <View style={styles.liveClassContent}>
          <View style={styles.liveClassInfo}>
            <Text style={styles.liveClassTitle}>Bharatanatyam Adavus - Intermediate</Text>
            <Text style={styles.liveClassDescription}>Next session: Today, 6:00 PM IST</Text>
            <View style={styles.liveRow}>
              <View style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>LIVE</Text>
              </View>
              <Text style={styles.liveStatus}>Join now for live instruction</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() =>
            router.push({
              pathname: '../live-class',
              params: {
                name: teachers[0].name,
                title: teachers[0].title,
                experience: teachers[0].experience,
              },
            })
          }
        >
          <Text style={styles.joinButtonText}>Join Class</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  const TeachersComponent = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Teachers"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <View style={styles.teachersList}>
        {teachers.map((teacher) => (
          <View key={teacher.name} style={styles.teacherCard}>
            <View style={styles.teacherContent}>
              <View style={styles.teacherInfo}>
                <Text style={styles.teacherName}>{teacher.name}</Text>
                <Text style={styles.teacherTitle}>{teacher.title} • {teacher.experience}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTeacher(teacher);
                    setIsAboutVisible(true);
                  }}
                >
                  <Text style={styles.linkText}>About teacher</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() =>
                router.push({
                  pathname: '../live-class',
                  params: {
                    name: teacher.name,
                    title: teacher.title,
                    experience: teacher.experience,
                  },
                })
              }
            >
              <Text style={styles.joinButtonText}>Join Class</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  const ScheduleComponent = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.scheduleCard}>
        <Text style={styles.scheduleTitle}>Weekly Schedule</Text>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleDay}>Monday</Text>
          <Text style={styles.scheduleTime}>6:00 PM - 7:30 PM</Text>
          <Text style={styles.scheduleClass}>Basic Adavus</Text>
        </View>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleDay}>Wednesday</Text>
          <Text style={styles.scheduleTime}>6:00 PM - 7:30 PM</Text>
          <Text style={styles.scheduleClass}>Intermediate Adavus</Text>
        </View>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleDay}>Friday</Text>
          <Text style={styles.scheduleTime}>6:00 PM - 7:30 PM</Text>
          <Text style={styles.scheduleClass}>Advanced Choreography</Text>
        </View>
      </View>
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  const tabContent = [
    { key: 'Live Classes', component: <LiveClassesComponent /> },
    { key: 'Teachers', component: <TeachersComponent /> },
    { key: 'Schedule', component: <ScheduleComponent /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choreography" backgroundColor="#FDF2F8" />

      <View style={styles.tabsContainer}>
        {choreographyTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabChange(tab)}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        ref={flatListRef}
        data={tabContent}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth, flex: 1 }}>
            {item.component}
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.key}
        style={styles.content}
      />

      <Modal
        visible={isAboutVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAboutVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>About {selectedTeacher?.name}</Text>
            {!!selectedTeacher && (
              <Text style={styles.modalBody}>
                {selectedTeacher.bio}
              </Text>
            )}
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.closeButton, { flex: 1 }]}
                activeOpacity={0.8}
                onPress={() => setIsAboutVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <View style={{ width: 12 }} />
              <TouchableOpacity
                style={[styles.joinButton, { flex: 1 }]}
                activeOpacity={0.8}
                onPress={() => {
                  if (selectedTeacher) {
                    setIsAboutVisible(false);
                    router.push({
                      pathname: '../live-class',
                      params: {
                        name: selectedTeacher.name,
                        title: selectedTeacher.title,
                        experience: selectedTeacher.experience,
                      },
                    });
                  }
                }}
              >
                <Text style={styles.joinButtonText}>View Live Class</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5D6D8',
    justifyContent: 'space-evenly',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  activeTab: {
    position: 'relative',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A47E74',
    textAlign: 'center',
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7A4D3A',
    textAlign: 'center',
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: -8,
    left: 12,
    right: 12,
    height: 3,
    backgroundColor: '#B75F37',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  liveClassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  liveClassContent: {
    padding: 20,
  },
  liveClassInfo: {
    flex: 1,
  },
  liveClassTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  liveClassDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  liveBadge: {
    backgroundColor: '#E84545',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveStatus: {
    color: '#A47E74',
    fontSize: 12,
    flexShrink: 1,
  },
  teachersList: {
    paddingTop: 10,
  },
  teacherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  teacherContent: {
    padding: 20,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  teacherTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  linkText: {
    color: '#B75F37',
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginTop: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 15,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  scheduleTime: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  scheduleClass: {
    fontSize: 12,
    color: '#A47E74',
    flex: 1,
    textAlign: 'right',
  },
  joinButton: {
    backgroundColor: '#B75F37',
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    color: '#7A4D3A',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  modalBody: {
    color: '#A47E74',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#B75F37',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
