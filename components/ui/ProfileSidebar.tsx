import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AboutSection, HelpSection, ProfileSection, SettingsSection } from './ProfileSections';

interface ProfileSidebarProps {
  visible: boolean;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export default function ProfileSidebar({ visible, onClose }: ProfileSidebarProps) {
  const router = useRouter();
  const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;
  const [currentSection, setCurrentSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const menuItems = [
    { id: 'profile', title: 'Profile', icon: 'person-outline', color: '#7A4D3A', gradient: ['#7A4D3A', '#B75F37'] },
    { id: 'settings', title: 'Settings', icon: 'settings-outline', color: '#2196F3', gradient: ['#2196F3', '#21CBF3'] },
    { id: 'help', title: 'Help & Support', icon: 'help-circle-outline', color: '#9C27B0', gradient: ['#9C27B0', '#BA68C8'] },
    { id: 'about', title: 'About', icon: 'information-circle-outline', color: '#607D8B', gradient: ['#607D8B', '#90A4AE'] },
    { id: 'logout', title: 'Logout', icon: 'log-out-outline', color: '#F44336', gradient: ['#F44336', '#EF5350'] },
  ];

  const handleMenuItemPress = (itemId: string) => {
    if (itemId === 'logout') {
      handleLogout();
    } else {
      setCurrentSection(itemId);
    }
  };

  const handleBackToMenu = () => {
    setCurrentSection(null);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            onClose();
            // Navigate to sign-in page
            router.replace('/sign-in');
          },
        },
      ]
    );
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'profile':
        return <ProfileSection onBack={handleBackToMenu} />;
      case 'settings':
        return <SettingsSection onBack={handleBackToMenu} />;
      case 'help':
        return <HelpSection onBack={handleBackToMenu} />;
      case 'about':
        return <AboutSection onBack={handleBackToMenu} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.sidebar,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
              {currentSection ? (
                renderCurrentSection()
              ) : (
                <ScrollView 
                  style={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  {/* Handle bar */}
                  <View style={styles.handleBar} />
                  
                  {/* Profile Header */}
                  <View style={styles.profileHeader}>
                    <View style={styles.profileImageContainer}>
                      <Image
                        source={require('@/assets/images/user.png')}
                        style={styles.profileImage}
                        contentFit="cover"
                      />
                      <View style={styles.onlineIndicator} />
                    </View>
                    <View style={styles.profileInfo}>
                      <Text style={styles.profileName}>Bavi Bavi</Text>
                      <Text style={styles.profileEmail}>bavi123@gmail.com</Text>
                      <View style={styles.levelBadge}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.levelText}>Intermediate</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                      <Ionicons name="close" size={24} color="#7A4D3A" />
                    </TouchableOpacity>
                  </View>

                  {/* Quick Stats */}
                  <View style={styles.quickStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>24</Text>
                      <Text style={styles.statLabel}>Classes</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>156</Text>
                      <Text style={styles.statLabel}>Hours</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>8</Text>
                      <Text style={styles.statLabel}>Badges</Text>
                    </View>
                  </View>

                  {/* Menu Items */}
                  <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[styles.menuItem, { marginTop: index === 0 ? 0 : 8 }]}
                        onPress={() => handleMenuItemPress(item.id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.menuItemLeft}>
                          <View style={[styles.iconContainer, { backgroundColor: item.gradient[0] + '15' }]}>
                            <Ionicons name={item.icon as any} size={22} color={item.color} />
                          </View>
                          <Text style={styles.menuItemText}>{item.title}</Text>
                        </View>
                        <View style={styles.menuItemRight}>
                          <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* App Version */}
                  <View style={styles.versionContainer}>
                    <View style={styles.versionDivider} />
                    <Text style={styles.versionText}>Bharatanatyam App v1.0.0</Text>
                    <Text style={styles.copyrightText}>© 2025 All rights reserved</Text>
                  </View>
                </ScrollView>
              )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '15%',
  },
  sidebar: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: screenHeight * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
  },
  handleBar: {
    width: 50,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#F9EDEF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7A4D3A',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B75F37',
    marginLeft: 4,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(122, 77, 58, 0.1)',
  },
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7A4D3A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIndicator: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#F9EDEF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  versionDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7A4D3A',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
  },
});
