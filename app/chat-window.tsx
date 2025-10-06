import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { chatMessages } from '../data.js';

export default function ChatWindow() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [chatData, setChatData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (params.chatData) {
      try {
        const chat = JSON.parse(params.chatData as string);
        setChatData(chat);
        
        const chatId = chat.id;
        const existingMessages = chatMessages[chatId as keyof typeof chatMessages] || [];
        setMessages(existingMessages);
      } catch (error) {
        console.error('Error parsing chat data:', error);
      }
    }
  }, [params.chatData]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      senderId: 'me',
      senderName: 'You',
      message: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupOption = (option: string) => {
    setShowPopup(false);
    console.log('Selected option:', option);
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={[styles.messageContainer, item.isMe ? styles.myMessage : styles.otherMessage]}>
      {!item.isMe && (
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.senderName}</Text>
        </View>
      )}
      <View style={[styles.messageBubble, item.isMe ? styles.myMessageBubble : styles.otherMessageBubble]}>
        <Text style={[styles.messageText, item.isMe ? styles.myMessageText : styles.otherMessageText]}>
          {item.message}
        </Text>
      </View>
      <Text style={[styles.timestamp, item.isMe ? styles.myTimestamp : styles.otherTimestamp]}>
        {item.timestamp}
      </Text>
    </View>
  );

  if (!chatData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading chat...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
          </TouchableOpacity>
          <View style={styles.chatInfo}>
            <Image source={chatData.avatar} style={styles.chatAvatar} />
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{chatData.name}</Text>
              <Text style={styles.chatStatus}>
                {chatData.type === 'group' ? `${messages.length} members` : 'Online'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton} onPress={togglePopup}>
            <Ionicons name="ellipsis-vertical" size={20} color="#7A4D3A" />
          </TouchableOpacity>
        </View>

        {showPopup && (
          <TouchableOpacity style={styles.popupOverlay} onPress={togglePopup} activeOpacity={1}>
            <View style={styles.popupMenu}>
              <TouchableOpacity 
                style={styles.popupItem} 
                onPress={() => handlePopupOption('View Profile')}
              >
                <Ionicons name="person-outline" size={20} color="#7A4D3A" />
                <Text style={styles.popupText}>View Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.popupItem} 
                onPress={() => handlePopupOption('Media')}
              >
                <Ionicons name="images-outline" size={20} color="#7A4D3A" />
                <Text style={styles.popupText}>Media</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.popupItem} 
                onPress={() => handlePopupOption('Search')}
              >
                <Ionicons name="search-outline" size={20} color="#7A4D3A" />
                <Text style={styles.popupText}>Search</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.popupItem} 
                onPress={() => handlePopupOption('Mute')}
              >
                <Ionicons name="volume-mute-outline" size={20} color="#7A4D3A" />
                <Text style={styles.popupText}>Mute</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.popupItem} 
                onPress={() => handlePopupOption('Clear Chat')}
              >
                <Ionicons name="trash-outline" size={20} color="#FF5722" />
                <Text style={[styles.popupText, styles.dangerText]}>Clear Chat</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, newMessage.trim() ? styles.sendButtonActive : styles.sendButtonInactive]} 
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons name="send" size={20} color={newMessage.trim() ? "#FFFFFF" : "#999"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5D6D8',
    backgroundColor: '#FDF2F8',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  chatStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageHeader: {
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginLeft: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  myMessageBubble: {
    backgroundColor: '#B8732F',
    borderBottomRightRadius: 6,
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  myTimestamp: {
    textAlign: 'right',
    marginRight: 12,
  },
  otherTimestamp: {
    textAlign: 'left',
    marginLeft: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5D6D8',
    backgroundColor: '#FDF2F8',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5D6D8',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#B8732F',
  },
  sendButtonInactive: {
    backgroundColor: '#E5D6D8',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  popupMenu: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  popupText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  dangerText: {
    color: '#FF5722',
  },
});

