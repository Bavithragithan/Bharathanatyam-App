import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileSidebar from './ProfileSidebar';

interface HeaderProps {
  title: string;
  backgroundColor?: string;
}

export default function Header({ title, backgroundColor = '#F9EDEF' }: HeaderProps) {
  const [isProfileSidebarVisible, setIsProfileSidebarVisible] = useState(false);

  const handleProfilePress = () => {
    setIsProfileSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setIsProfileSidebarVisible(false);
  };

  return (
    <>
      <View style={[styles.header, { backgroundColor }]}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={24} color="#7A4D3A" />
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            <Image source={require('@/assets/images/user.png')} style={styles.avatar} contentFit="cover" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ProfileSidebar
        visible={isProfileSidebarVisible}
        onClose={handleCloseSidebar}
      />
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
});
