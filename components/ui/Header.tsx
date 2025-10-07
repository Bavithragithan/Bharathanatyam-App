import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ProfileSidebar from './ProfileSidebar';

interface HeaderProps {
  title: string;
  backgroundColor?: string;
}

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
    message: 'Your “Natyam Level 2” course payment is due by October 10.',
    time: 'Yesterday, 4:10 PM',
  },
  {
    id: '3',
    icon: 'musical-notes-outline',
    title: 'New Lesson Available',
    message: '“Talam Techniques - Part 3” is now unlocked in your course.',
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

export default function Header({ title, backgroundColor = '#F9EDEF' }: HeaderProps) {
  const [isProfileSidebarVisible, setIsProfileSidebarVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleProfilePress = () => setIsProfileSidebarVisible(true);
  const handleNotificationPress = () => setIsNotificationVisible(true);
  const handleCloseSidebar = () => setIsProfileSidebarVisible(false);
  const handleCloseNotification = () => setIsNotificationVisible(false);

  return (
    <>
      <View style={[styles.header, { backgroundColor }]}>
        <Text style={styles.headerTitle}>{title}</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleNotificationPress}>
            <Ionicons name="notifications-outline" size={26} color="#7A4D3A" />
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#7A4D3A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  profileButton: {
    padding: 4,
  },
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
    backgroundColor: '#FFFFFF', // ✅ solid white (no blur)
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