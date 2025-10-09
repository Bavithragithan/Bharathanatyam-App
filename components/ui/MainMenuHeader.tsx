import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useMemo, useRef, useState } from 'react';
import {
    FlatList,
    Modal,
    PanResponder,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import ProfileSidebar from './ProfileSidebar';

const notifications = [
  {
    id: '1',
    icon: 'calendar-outline',
    title: 'Upcoming Class',
    message: 'Your Abhinaya class is scheduled for tomorrow at 6:00 PM.',
    time: 'Today, 8:30 AM',
  },
  {
    id: '2',
    icon: 'card-outline',
    title: 'Course Payment Due',
    message: 'Your "Natyam Level 2" course payment is due by October 10.',
    time: 'Yesterday, 4:10 PM',
  },
  {
    id: '3',
    icon: 'musical-notes-outline',
    title: 'New Lesson Available',
    message: '"Talam Techniques - Part 3" is now unlocked in your course.',
    time: '2 days ago',
  },
  {
    id: '4',
    icon: 'sparkles-outline',
    title: 'Performance Invitation',
    message: 'Join the annual Bharatanatyam showcase at Jaffna Cultural Hall.',
    time: '2 days ago',
  },
];

export default function MainMenuHeader() {
  const [isProfileSidebarVisible, setIsProfileSidebarVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleProfilePress = () => setIsProfileSidebarVisible(true);
  const handleNotificationPress = () => setIsNotificationVisible(true);
  const handleCloseSidebar = () => setIsProfileSidebarVisible(false);
  const handleCloseNotification = () => setIsNotificationVisible(false);

  return (
    <>
      <View style={styles.header}>
        {/* Top Header Row with Profile and Notification */}
        <View style={styles.headerRow}>
          <View style={styles.headerSpacer} />
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              accessibilityLabel="Notifications" 
              style={styles.bellButton}
              onPress={handleNotificationPress}
            >
              <Ionicons name="notifications-outline" size={28} color="#7A4D3A" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
              <Image 
                source={require('@/assets/images/user.png')} 
                style={styles.avatar} 
                contentFit="cover" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Bar */}
        <View style={styles.calendarRow}>
          <WeekStrip />
        </View>
      </View>

      <ProfileSidebar visible={isProfileSidebarVisible} onClose={handleCloseSidebar} />

      <Modal
        visible={isNotificationVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseNotification}
      >
        <TouchableWithoutFeedback onPress={handleCloseNotification}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popupContainer}>
                <Text style={styles.popupTitle}>Notifications</Text>

                <FlatList
                  data={notifications}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.notificationCard}>
                      <View style={styles.iconContainer}>
                        <Ionicons name={item.icon as any} size={22} color="#fff" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                        <Text style={styles.notificationTime}>{item.time}</Text>
                      </View>
                    </View>
                  )}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

// Calendar Week Strip Component
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
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E5D6D8',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  headerSpacer: { 
    width: 34, 
    height: 34 
  },
  headerIcons: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  bellButton: { 
    padding: 6 
  },
  profileButton: {
    padding: 4,
  },
  avatar: { 
    width: 34, 
    height: 34, 
    borderRadius: 17 
  },
  calendarRow: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 12,
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
  // Notification Modal Styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  popupContainer: {
    marginTop: 70,
    marginRight: 20,
    width: 300,
    padding: 14,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#5C2A20',
    textAlign: 'center',
    marginBottom: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9EDEF',
    borderRadius: 16,
    padding: 10,
    gap: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#B06A45',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4A2A1F',
  },
  notificationMessage: {
    fontSize: 13,
    color: '#3C2A21',
    opacity: 0.8,
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 11,
    color: '#7A5B4A',
    marginTop: 4,
  },
  separator: {
    height: 10,
  },
});
