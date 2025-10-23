import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    ImageBackground,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';

const { width: screenWidth } = Dimensions.get('window');

const choreographyTabs = ['Live Classes', 'Teachers', 'Schedule'];

export default function ChoreographyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Live Classes');
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<
    null | { name: string; title: string; experience: string; bio: string }
  >(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return formatDate(date1) === formatDate(date2);
  };

  const isToday = (date: Date) => {
    return isSameDate(date, new Date());
  };

  const hasClass = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5; // Monday, Wednesday, Friday
  };

  const getClassForDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    switch (dayOfWeek) {
      case 1: return { 
        time: '6:00 PM - 7:30 PM', 
        class: 'Basic Adavus', 
        teacher: 'Smt. Ananya Iyer',
        level: 'Beginner',
        duration: '90 min',
        type: 'Technique',
        description: 'Learn fundamental adavus with proper technique and rhythm.',
        color: '#4CAF50'
      };
      case 3: return { 
        time: '6:00 PM - 7:30 PM', 
        class: 'Intermediate Adavus', 
        teacher: 'Sri. Karthik Subramanian',
        level: 'Intermediate',
        duration: '90 min',
        type: 'Choreography',
        description: 'Build on basic techniques with complex combinations.',
        color: '#FF9800'
      };
      case 5: return { 
        time: '6:00 PM - 7:30 PM', 
        class: 'Advanced Choreography', 
        teacher: 'Smt. Meera Krishnan',
        level: 'Advanced',
        duration: '90 min',
        type: 'Performance',
        description: 'Master advanced choreography and expression techniques.',
        color: '#E91E63'
      };
      default: return null;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

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
        <View style={styles.glassCardContent}>
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
            <View style={styles.glassCardContent}>
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
          </View>
        ))}
      </View>
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  const CalendarComponent = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const renderCalendarDays = () => {
      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isSelected = isSameDate(date, selectedDate);
        const isTodayDate = isToday(date);
        const hasClassOnDay = hasClass(date);
        const classInfo = getClassForDate(date);
        
        days.push(
          <TouchableOpacity
            key={day}
            style={[
              styles.calendarDay,
              isSelected && styles.selectedDay,
              isTodayDate && styles.todayDay,
              hasClassOnDay && styles.classDay,
            ]}
            onPress={() => setSelectedDate(date)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isTodayDate && styles.todayDayText,
              hasClassOnDay && styles.classDayText,
            ]}>
              {day}
            </Text>
            {hasClassOnDay && (
              <View style={[
                styles.classIndicator,
                { backgroundColor: classInfo?.color || '#B75F37' }
              ]} />
            )}
            {isTodayDate && <View style={styles.todayIndicator} />}
          </TouchableOpacity>
        );
      }
      
      return days;
    };

    const selectedClassInfo = getClassForDate(selectedDate);

    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color="#B75F37" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{monthName}</Text>
          <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color="#B75F37" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarCard}>
          <View style={styles.weekDaysRow}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {renderCalendarDays()}
          </View>
        </View>

        {/* Calendar Legend */}
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Class Types</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Basic Adavus</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.legendText}>Intermediate</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E91E63' }]} />
              <Text style={styles.legendText}>Advanced</Text>
            </View>
          </View>
        </View>

        {/* Selected Date Info */}
        {selectedClassInfo && (
          <View style={styles.classInfoCard}>
            <View style={styles.classInfoHeader}>
              <Text style={styles.classInfoTitle}>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              <View style={[styles.levelBadge, { backgroundColor: selectedClassInfo.color }]}>
                <Text style={styles.levelBadgeText}>{selectedClassInfo.level}</Text>
              </View>
            </View>
            
            <View style={styles.classDetailsGrid}>
              <View style={styles.classDetailItem}>
                <Ionicons name="time-outline" size={18} color="#B75F37" />
                <Text style={styles.classDetailLabel}>Time</Text>
                <Text style={styles.classDetailValue}>{selectedClassInfo.time}</Text>
              </View>
              <View style={styles.classDetailItem}>
                <Ionicons name="hourglass-outline" size={18} color="#B75F37" />
                <Text style={styles.classDetailLabel}>Duration</Text>
                <Text style={styles.classDetailValue}>{selectedClassInfo.duration}</Text>
              </View>
              <View style={styles.classDetailItem}>
                <Ionicons name="book-outline" size={18} color="#B75F37" />
                <Text style={styles.classDetailLabel}>Type</Text>
                <Text style={styles.classDetailValue}>{selectedClassInfo.type}</Text>
              </View>
              <View style={styles.classDetailItem}>
                <Ionicons name="person-outline" size={18} color="#B75F37" />
                <Text style={styles.classDetailLabel}>Teacher</Text>
                <Text style={styles.classDetailValue}>{selectedClassInfo.teacher}</Text>
              </View>
            </View>

            <View style={styles.classDescription}>
              <Text style={styles.classDescriptionText}>{selectedClassInfo.description}</Text>
            </View>

            <View style={styles.classActions}>
              <TouchableOpacity style={[styles.joinClassButton, { backgroundColor: selectedClassInfo.color }]}>
                <Ionicons name="videocam-outline" size={18} color="#FFFFFF" />
                <Text style={styles.joinClassButtonText}>Join Live Class</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reminderButton}>
                <Ionicons name="notifications-outline" size={18} color="#B75F37" />
                <Text style={styles.reminderButtonText}>Set Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* No Class Selected Message */}
        {!selectedClassInfo && (
          <View style={styles.noClassCard}>
            <Ionicons name="calendar-outline" size={48} color="#A47E74" />
            <Text style={styles.noClassTitle}>No Class Scheduled</Text>
            <Text style={styles.noClassText}>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            <Text style={styles.noClassSubtext}>
              Tap on a day with a colored indicator to view class details
            </Text>
          </View>
        )}

        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    );
  };

  const tabContent = [
    { key: 'Live Classes', component: <LiveClassesComponent /> },
    { key: 'Teachers', component: <TeachersComponent /> },
    { key: 'Schedule', component: <CalendarComponent /> },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
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

      <ImageBackground
        source={require('@/assets/images/main-menu.jpeg')}
        style={[styles.content, { flex: 1 }]}
        imageStyle={{ resizeMode: 'cover', opacity: 0.9 }}
      >
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
      </ImageBackground>

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
    paddingTop: 20,
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
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  liveClassCard: {
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
    backgroundColor: 'rgba(183, 95, 55, 0.8)',
    backdropFilter: 'blur(10px)',
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(183, 95, 55, 0.3)',
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
  // Calendar Styles
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
  },
  calendarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#A47E74',
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  selectedDay: {
    backgroundColor: '#B75F37',
    borderRadius: 20,
  },
  todayDay: {
    backgroundColor: '#F7EFF1',
    borderRadius: 20,
  },
  classDay: {
    backgroundColor: '#FFF5F5',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  todayDayText: {
    color: '#B75F37',
    fontWeight: '700',
  },
  classDayText: {
    color: '#B75F37',
    fontWeight: '600',
  },
  classIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  todayIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B75F37',
  },
  classInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  classInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 15,
  },
  classInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  joinClassButton: {
    backgroundColor: '#B75F37',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  joinClassButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Enhanced Calendar Styles
  classInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  classDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  classDetailItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  classDetailLabel: {
    fontSize: 12,
    color: '#A47E74',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 60,
  },
  classDetailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  classDescription: {
    backgroundColor: '#F7EFF1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  classDescriptionText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  classActions: {
    flexDirection: 'row',
    gap: 10,
  },
  reminderButton: {
    flex: 1,
    backgroundColor: '#F7EFF1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  reminderButtonText: {
    color: '#B75F37',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Legend Styles
  legendCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  // No Class Styles
  noClassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  noClassTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginTop: 15,
    marginBottom: 8,
  },
  noClassText: {
    fontSize: 16,
    color: '#A47E74',
    marginBottom: 8,
  },
  noClassSubtext: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});
