import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface SectionProps {
  onBack: () => void;
}

interface SettingsSectionProps extends SectionProps {
  onNavigate?: (target: string) => void;
}

export const ProfileSection = ({ onBack }: SectionProps) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollableContent}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.profileCardCompact}>
          <Image
            source={require('@/assets/images/user.png')}
            style={styles.largeProfileImage}
            contentFit="cover"
          />
          <Text style={styles.profileName}>Bavi Bavi</Text>
          <Text style={styles.profileEmail}>bavi1234@gmail.com</Text>
          <Text style={styles.profileLevel}>Bharatanatyam Intermediate</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Classes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.infoCardCompact}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Join Date</Text>
            <Text style={styles.infoValue}>March 2024</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Level</Text>
            <Text style={styles.infoValue}>Intermediate</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Favorite Style</Text>
            <Text style={styles.infoValue}>Varnam</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Practice Time</Text>
            <Text style={styles.infoValue}>156 hours</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current Streak</Text>
            <Text style={styles.infoValue}>12 days</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const SettingsSection = ({ onBack, onNavigate }: SettingsSectionProps) => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >

      <View style={[styles.settingsGroup, styles.settingsGroupTop]}>
        <Text style={styles.groupTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={20} color="#7A4D3A" />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <TouchableOpacity
            onPress={() => setPushEnabled(prev => !prev)}
            activeOpacity={0.8}
            accessibilityRole="switch"
            accessibilityState={{ checked: pushEnabled }}
          >
            <View style={styles.toggle}>
              <View style={pushEnabled ? styles.toggleActive : styles.toggleInactive} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="volume-high-outline" size={20} color="#7A4D3A" />
            <Text style={styles.settingText}>Sound Effects</Text>
          </View>
          <TouchableOpacity
            onPress={() => setSoundEnabled(prev => !prev)}
            activeOpacity={0.8}
            accessibilityRole="switch"
            accessibilityState={{ checked: soundEnabled }}
          >
            <View style={styles.toggle}>
              <View style={soundEnabled ? styles.toggleActive : styles.toggleInactive} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={20} color="#7A4D3A" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <TouchableOpacity
            onPress={() => setDarkModeEnabled(prev => !prev)}
            activeOpacity={0.8}
            accessibilityRole="switch"
            accessibilityState={{ checked: darkModeEnabled }}
          >
            <View style={styles.toggle}>
              <View style={darkModeEnabled ? styles.toggleActive : styles.toggleInactive} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Account</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={() => onNavigate && onNavigate('editProfile')}>
          <View style={styles.settingLeft}>
            <Ionicons name="person-outline" size={20} color="#7A4D3A" />
            <Text style={styles.settingText}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => onNavigate && onNavigate('changePassword')}>
          <View style={styles.settingLeft}>
            <Ionicons name="lock-closed-outline" size={20} color="#7A4D3A" />
            <Text style={styles.settingText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => onNavigate && onNavigate('privacySettings')}>
          <View style={styles.settingLeft}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#7A4D3A" />
            <Text style={styles.settingText}>Privacy Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

 

export const ProgressSection = ({ onBack }: SectionProps) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Progress</Text>
      <View style={styles.placeholder} />
    </View>

    <ScrollView 
      style={styles.scrollableContent}
      showsVerticalScrollIndicator={false}
      bounces={true}
      contentContainerStyle={styles.scrollContent}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
    >

    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>This Week's Progress</Text>
      <View style={styles.progressStats}>
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>4</Text>
          <Text style={styles.progressLabel}>Classes</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>2.5</Text>
          <Text style={styles.progressLabel}>Hours</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>85%</Text>
          <Text style={styles.progressLabel}>Accuracy</Text>
        </View>
      </View>
    </View>

    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Weekly Activity</Text>
      <View style={styles.chart}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <View key={day} style={styles.chartDay}>
            <View style={[styles.chartBar, { height: Math.random() * 60 + 20 }]} />
            <Text style={styles.chartLabel}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  </View>
);

export const HelpSection = ({ onBack }: SectionProps) => {
  const handleEmail = () => {
    Linking.openURL('mailto:support@bharatanatyam.app?subject=Support%20Request');
  };
  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I track my progress?</Text>
            <Text style={styles.faqAnswer}>Your progress is automatically tracked when you complete classes and practice sessions. You can view detailed analytics in the Progress section.</Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I practice offline?</Text>
            <Text style={styles.faqAnswer}>Yes! Download videos and practice materials to your device for offline practice. Go to any lesson and tap the download icon.</Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I change my level?</Text>
            <Text style={styles.faqAnswer}>Your level is automatically adjusted based on your performance and completed lessons. Contact support if you need manual adjustment.</Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What if I miss a class?</Text>
            <Text style={styles.faqAnswer}>No worries! All classes are recorded and available for replay. You can catch up anytime from your class history.</Text>
          </View>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Contact Support</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
            <View style={styles.contactLeft}>
              <Ionicons name="mail-outline" size={20} color="#7A4D3A" />
              <Text style={styles.contactText}>Email Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} disabled>
            <View style={styles.contactLeft}>
              <Ionicons name="chatbubble-outline" size={20} color="#7A4D3A" />
              <Text style={styles.contactText}>Live Chat</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
            <View style={styles.contactLeft}>
              <Ionicons name="call-outline" size={20} color="#7A4D3A" />
              <Text style={styles.contactText}>Phone Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export const AboutSection = ({ onBack, onNavigate }: { onBack: () => void; onNavigate?: (target: string) => void }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.placeholder} />
    </View>

    <ScrollView 
      style={styles.scrollableContent}
      showsVerticalScrollIndicator={false}
      bounces={true}
      contentContainerStyle={styles.scrollContent}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
    >
      <View style={styles.aboutCard}>
        <View style={styles.appLogoContainer}>
          <Image
            source={require('@/assets/images/logo-2.png')}
            style={styles.appLogo}
            contentFit="contain"
          />
        </View>
        <Text style={styles.appName}>Bharatanatyam Learning App</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appDescription}>
          Master the ancient art of Bharatanatyam with our comprehensive learning platform. 
          From basic mudras to complex choreography, we guide you through every step of your dance journey.
        </Text>
      </View>

      <View style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>App Features</Text>
        
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Interactive Video Lessons</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Progress Tracking</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Offline Practice Mode</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Community Challenges</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Expert Instructors</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Performance Analytics</Text>
        </View>
      </View>

      <View style={styles.teamCard}>
        <Text style={styles.teamTitle}>Our Team</Text>
        <Text style={styles.teamDescription}>
          We are passionate about preserving and sharing the beautiful art of Bharatanatyam. 
          Our team consists of experienced dancers, educators, and technologists working together 
          to create the best learning experience for you.
        </Text>
      </View>

      <View style={styles.legalCard}>
        <Text style={styles.legalTitle}>Legal</Text>
        
        <TouchableOpacity style={styles.legalItem} onPress={() => onNavigate && onNavigate('aboutTerms')}>
          <Text style={styles.legalText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.legalItem} onPress={() => onNavigate && onNavigate('aboutPrivacy')}>
          <Text style={styles.legalText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.legalItem} onPress={() => onNavigate && onNavigate('aboutCookies')}>
          <Text style={styles.legalText}>Cookie Policy</Text>
          <Ionicons name="chevron-forward" size={16} color="#C0C0C0" />
        </TouchableOpacity>
      </View>

      <View style={styles.copyrightCard}>
        <Text style={styles.copyrightText}>© 2025 Bharatanatyam Learning App</Text>
        <Text style={styles.copyrightSubtext}>All rights reserved</Text>
      </View>
    </ScrollView>
  </View>
);

export const TermsSection = ({ onBack }: SectionProps) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Terms of Service</Text>
      <View style={styles.placeholder} />
    </View>
    <ScrollView style={styles.scrollableContent} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.appDescription}>By accessing or using the Bharatanatyam Learning App, you agree to be bound by these Terms of Service. If you do not agree, do not use the app.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>2. Accounts & Security</Text>
        <Text style={styles.appDescription}>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us promptly of any unauthorized use.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>3. Content Ownership</Text>
        <Text style={styles.appDescription}>All lessons, videos, text, graphics, and other materials are owned by us or our licensors and are protected by intellectual property laws. You may not copy, modify, or distribute content without permission.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>4. Acceptable Use</Text>
        <Text style={styles.appDescription}>Do not misuse the app. Prohibited behavior includes attempting to disrupt service, reverse engineering, sharing paid content, or engaging in abusive or illegal activities.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>5. Subscriptions & Payments</Text>
        <Text style={styles.appDescription}>Where applicable, paid features are billed according to the plan you select. Fees are non-refundable except where required by law.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>6. Termination</Text>
        <Text style={styles.appDescription}>We may suspend or terminate access if you violate these terms. You may stop using the app at any time.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>7. Changes to Terms</Text>
        <Text style={styles.appDescription}>We may update these Terms from time to time. Continued use after updates constitutes acceptance of the revised Terms.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>8. Contact</Text>
        <Text style={styles.appDescription}>Questions about these Terms? Contact support from the Help & Support section.</Text>
      </View>
    </ScrollView>
  </View>
);

export const PrivacyPolicySection = ({ onBack }: SectionProps) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Privacy Policy</Text>
      <View style={styles.placeholder} />
    </View>
    <ScrollView style={styles.scrollableContent} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Data We Collect</Text>
        <Text style={styles.appDescription}>We collect minimal data necessary to provide the service, such as account details and usage metrics.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>How We Use Data</Text>
        <Text style={styles.appDescription}>Data is used to personalize your experience and improve the app. You can control analytics in Privacy Settings.</Text>
      </View>
    </ScrollView>
  </View>
);

export const CookiePolicySection = ({ onBack }: SectionProps) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Cookie Policy</Text>
      <View style={styles.placeholder} />
    </View>
    <ScrollView style={styles.scrollableContent} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>What Are Cookies</Text>
        <Text style={styles.appDescription}>Cookies are small text files used to remember your preferences and improve performance.</Text>
      </View>
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Managing Cookies</Text>
        <Text style={styles.appDescription}>You can manage analytics and privacy preferences in Privacy Settings within the app.</Text>
      </View>
    </ScrollView>
  </View>
);

export const EditProfileSection = ({ onBack }: SectionProps) => {
  const [name, setName] = React.useState('Bavi Bavi');
  const [email, setEmail] = React.useState('bavi1234@gmail.com');
  const [bio, setBio] = React.useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter your name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Validation', 'Please enter a valid email address.');
      return;
    }
    Alert.alert('Saved', 'Your profile has been updated.');
    onBack();
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Profile Information</Text>

          <View style={styles.formField}>
            <Text style={styles.formLabel}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#999"
              style={styles.textInput}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
              returnKeyType="next"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.formLabel}>Bio</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              placeholderTextColor="#999"
              style={[styles.textInput, styles.multilineInput]}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
            <Ionicons name="save-outline" size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export const ChangePasswordSection = ({ onBack }: SectionProps) => {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const validate = () => {
    if (!currentPassword) {
      Alert.alert('Validation', 'Please enter your current password.');
      return false;
    }
    if (newPassword.length < 8) {
      Alert.alert('Validation', 'New password must be at least 8 characters.');
      return false;
    }
    if (newPassword === currentPassword) {
      Alert.alert('Validation', 'New password must be different from current password.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Validation', 'Confirmation does not match the new password.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Success', 'Your password has been updated.');
      onBack();
    }, 700);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Change Password</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Security</Text>

          <View style={styles.formField}>
            <Text style={styles.formLabel}>Current Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor="#999"
                style={[styles.textInput, styles.passwordInput]}
                secureTextEntry={!showCurrent}
              />
              <TouchableOpacity onPress={() => setShowCurrent(v => !v)} style={styles.eyeButton}>
                <Ionicons name={showCurrent ? 'eye-off-outline' : 'eye-outline'} size={20} color="#7A4D3A" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.formLabel}>New Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#999"
                style={[styles.textInput, styles.passwordInput]}
                secureTextEntry={!showNew}
              />
              <TouchableOpacity onPress={() => setShowNew(v => !v)} style={styles.eyeButton}>
                <Ionicons name={showNew ? 'eye-off-outline' : 'eye-outline'} size={20} color="#7A4D3A" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.formLabel}>Confirm New Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter new password"
                placeholderTextColor="#999"
                style={[styles.textInput, styles.passwordInput]}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(v => !v)} style={styles.eyeButton}>
                <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color="#7A4D3A" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85} disabled={saving}>
            <Ionicons name="save-outline" size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export const PrivacySettingsSection = ({ onBack }: SectionProps) => {
  const [profilePublic, setProfilePublic] = React.useState(true);
  const [twoFactor, setTwoFactor] = React.useState(false);
  const [dataSharing, setDataSharing] = React.useState(false);
  const [emailUpdates, setEmailUpdates] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Saved', 'Your privacy settings have been updated.');
      onBack();
    }, 600);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.settingsGroup, styles.settingsGroupTop]}>
          <Text style={styles.groupTitle}>Visibility</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-circle-outline" size={20} color="#7A4D3A" />
              <Text style={styles.settingText}>Public Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => setProfilePublic(v => !v)}
              activeOpacity={0.8}
              accessibilityRole="switch"
              accessibilityState={{ checked: profilePublic }}
            >
              <View style={styles.toggle}>
                <View style={profilePublic ? styles.toggleActive : styles.toggleInactive} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Security</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#7A4D3A" />
              <Text style={styles.settingText}>Two-Factor Authentication</Text>
            </View>
            <TouchableOpacity
              onPress={() => setTwoFactor(v => !v)}
              activeOpacity={0.8}
              accessibilityRole="switch"
              accessibilityState={{ checked: twoFactor }}
            >
              <View style={styles.toggle}>
                <View style={twoFactor ? styles.toggleActive : styles.toggleInactive} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Data</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="analytics-outline" size={20} color="#7A4D3A" />
              <Text style={styles.settingText}>Allow Anonymous Usage Analytics</Text>
            </View>
            <TouchableOpacity
              onPress={() => setDataSharing(v => !v)}
              activeOpacity={0.8}
              accessibilityRole="switch"
              accessibilityState={{ checked: dataSharing }}
            >
              <View style={styles.toggle}>
                <View style={dataSharing ? styles.toggleActive : styles.toggleInactive} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="mail-outline" size={20} color="#7A4D3A" />
              <Text style={styles.settingText}>Receive Email Updates</Text>
            </View>
            <TouchableOpacity
              onPress={() => setEmailUpdates(v => !v)}
              activeOpacity={0.8}
              accessibilityRole="switch"
              accessibilityState={{ checked: emailUpdates }}
            >
              <View style={styles.toggle}>
                <View style={emailUpdates ? styles.toggleActive : styles.toggleInactive} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85} disabled={saving}>
            <Ionicons name="save-outline" size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Settings'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#F9EDEF',
  },
  scrollableContent: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F9EDEF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
  },
  placeholder: {
    width: 40,
  },
  profileCardCompact: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  largeProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  profileLevel: {
    fontSize: 14,
    color: '#B75F37',
    fontWeight: '600',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7A4D3A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  infoCardCompact: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7A4D3A',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  },
  goalItem: {
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  metricLabel: {
    fontSize: 16,
    color: '#666',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingsGroupTop: {
    paddingTop: 32,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  toggleInactive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  chartDay: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    backgroundColor: '#B75F37',
    borderRadius: 10,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
  },
  // Help & Support Styles
  helpCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  // resourcesCard and related styles removed
  // About Section Styles
  aboutCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appLogoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appLogo: {
    width: 60,
    height: 60,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 8,
    textAlign: 'center',
  },
  appVersion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
  // Form styles
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    color: '#7A4D3A',
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    marginLeft: 8,
    padding: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7A4D3A',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  teamCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  teamDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  legalCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  legalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 16,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  legalText: {
    fontSize: 16,
    color: '#333',
  },
  copyrightCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  copyrightText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7A4D3A',
    marginBottom: 8,
  },
  copyrightSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
