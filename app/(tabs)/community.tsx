import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Header from '../../components/ui/Header';
import { communityTabs } from '../../data.js';
import Challenges from '../components/community/Challenges';
import Chat from '../components/community/Chat';
import Games from '../components/community/Games';
import OnlineEvents from '../components/community/OnlineEvents';

const { width: screenWidth } = Dimensions.get('window');

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('Games');
  const flatListRef = useRef<FlatList<any>>(null);
  const tabClick = useRef(false);

  const handleTabChange = (tab: string) => {
    tabClick.current = true;
    setActiveTab(tab);
    const index = communityTabs.indexOf(tab);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
    setTimeout(() => { tabClick.current = false; }, 500);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    if (tabClick.current) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    const newTab = communityTabs[index];
    if (newTab && newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const tabContent = [
    { key: 'Games', component: <Games /> },
    { key: 'Challenges', component: <Challenges /> },
    { key: 'Online Events', component: <OnlineEvents /> },
    { key: 'Chat', component: <Chat /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Community" backgroundColor="#FDF2F8" />

      <View style={styles.tabsContainer}>
        {communityTabs.map((tab) => (
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
});
