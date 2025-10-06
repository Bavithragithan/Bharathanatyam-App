import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { chatGroups, personalChats } from '../../../data.js';

const { width } = Dimensions.get('window');

export default function Chat() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState('Group');
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
    <TouchableOpacity key={chat.id} style={styles.chatItem} onPress={() => handleChatPress(chat)}>
      <Image source={chat.avatar} style={styles.chatAvatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <View style={styles.chatMeta}>
            <Text style={styles.chatTime}>• {chat.time}</Text>
            {chat.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.chatDescription} numberOfLines={1}>
          {chat.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderGroupChats = () => (
    <View style={styles.chatList}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {chatGroups && chatGroups.length > 0 ? (
          chatGroups.map((chat) => renderChatItem(chat))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No group chats available</Text>
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
            <Text style={styles.emptyText}>No personal chats available</Text>
          </View>
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <View style={styles.toggleBackground}>
          <View style={[styles.toggleSlider, activeSubTab === 'Personal' && styles.toggleSliderActive]} />
          <TouchableOpacity
            style={[styles.toggleButton, activeSubTab === 'Group' && styles.toggleButtonActive]}
            onPress={() => handleTabChange('Group')}
          >
            <Text style={[styles.toggleText, activeSubTab === 'Group' && styles.toggleTextActive]}>
              Group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeSubTab === 'Personal' && styles.toggleButtonActive]}
            onPress={() => handleTabChange('Personal')}
          >
            <Text style={[styles.toggleText, activeSubTab === 'Personal' && styles.toggleTextActive]}>
              Personal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
  toggleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  toggleBackground: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    position: 'relative',
    width: 320,
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
    shadowOpacity: 0.1,
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
  },
  toggleButtonActive: {
    // No additional styling needed as the slider provides the visual feedback
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContentContainer: {
    width: width,
    flex: 1,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
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
  },
  bottomSpacing: {
    height: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
