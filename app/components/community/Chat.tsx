import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { chatGroups, personalChats } from '../../../data.js';

const { width } = Dimensions.get('window');

export default function Chat() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState('Group');
  const [searchText, setSearchText] = useState('');
  const tabClick = useRef(false);

  const tabs = ['Group', 'Personal'];

  const handleTabChange = (tab: string) => {
    setActiveSubTab(tab);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    if (tabClick.current) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    const newTab = tabs[index];
    if (newTab && newTab !== activeSubTab) {
      setActiveSubTab(newTab);
    }
  };

  const handleChatPress = (chat: any) => {
    router.push({
      pathname: '/chat-window',
      params: { chatId: chat.id, chatData: JSON.stringify(chat) }
    });
  };

  const renderChatItem = (chat: any) => (
    <View key={chat.id} style={styles.chatItemContainer}>
      <View style={styles.glassCardContent}>
        <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(chat)}>
          <View style={styles.avatarContainer}>
            <Image source={chat.avatar} style={styles.chatAvatar} />
            <View style={[styles.statusIndicator, { backgroundColor: chat.isOnline ? '#4CAF50' : '#9E9E9E' }]} />
          </View>
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <View style={styles.chatMeta}>
                <Text style={styles.chatTime}>{chat.time}</Text>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
            <Text style={styles.chatDescription} numberOfLines={2}>
              {chat.description}
            </Text>
            {chat.lastMessage && (
              <Text style={styles.lastMessage} numberOfLines={1}>
                {chat.lastMessage}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={16} color="#666" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGroupChats = () => (
    <View style={styles.chatList}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {chatGroups && chatGroups.length > 0 ? (
          chatGroups.map((chat) => renderChatItem(chat))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={48} color="#999" />
            <Text style={styles.emptyText}>No group chats available</Text>
            <Text style={styles.emptySubText}>Start a conversation with fellow dancers</Text>
          </View>
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );

  const renderPersonalChats = () => (
    <View style={styles.chatList}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {personalChats && personalChats.length > 0 ? (
          personalChats.map((chat) => renderChatItem(chat))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="person-outline" size={48} color="#999" />
            <Text style={styles.emptyText}>No personal chats available</Text>
            <Text style={styles.emptySubText}>Connect with individual dancers</Text>
          </View>
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={18} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Toggle Tabs */}
      <View style={styles.toggleContainer}>
        <View style={styles.glassToggleBackground}>
          <View style={[styles.toggleSlider, activeSubTab === 'Personal' && styles.toggleSliderActive]} />
          <TouchableOpacity
            style={[styles.toggleButton, activeSubTab === 'Group' && styles.toggleButtonActive]}
            onPress={() => handleTabChange('Group')}
          >
            <Ionicons name="people" size={16} color={activeSubTab === 'Group' ? '#FFFFFF' : '#666'} />
            <Text style={[styles.toggleText, activeSubTab === 'Group' && styles.toggleTextActive]}>
              Group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeSubTab === 'Personal' && styles.toggleButtonActive]}
            onPress={() => handleTabChange('Personal')}
          >
            <Ionicons name="person" size={16} color={activeSubTab === 'Personal' ? '#FFFFFF' : '#666'} />
            <Text style={[styles.toggleText, activeSubTab === 'Personal' && styles.toggleTextActive]}>
              Personal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeSubTab === 'Group' ? renderGroupChats() : renderPersonalChats()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
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
  filterButton: {
    padding: 5,
  },
  // Toggle Styles
  toggleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  glassToggleBackground: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 25,
    padding: 4,
    position: 'relative',
    width: 320,
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
  toggleSlider: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 156,
    height: 36,
    backgroundColor: '#B8732F',
    borderRadius: 21,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleSliderActive: {
    left: 160,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    flexDirection: 'row',
  },
  toggleButtonActive: {
    // No additional styling needed as the slider provides the visual feedback
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 5,
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Content Styles
  content: {
    flex: 1,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Chat Item Styles
  chatItemContainer: {
    marginBottom: 15,
    borderRadius: 15,
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
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  chatDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  lastMessage: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  moreButton: {
    padding: 8,
    marginLeft: 10,
  },
  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  bottomSpacing: {
    height: 100,
  },
});
