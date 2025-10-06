import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { leaderboardData } from '../data.js';

const { width } = Dimensions.get('window');

export default function GamePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Play');
  const [gameData, setGameData] = useState<any>(null);
  const flatListRef = useRef<FlatList<any>>(null);
  const tabClick = useRef(false);
  const [userStats, setUserStats] = useState({
    currentScore: 1850,
    rank: 8,
    gamesPlayed: 13,
    winRate: 87,
  });

  const tabs = ['Play', 'Leaderboard'];

  useEffect(() => {
    if (params.gameData) {
      try {
        const game = JSON.parse(params.gameData as string);
        setGameData(game);
      } catch (error) {
        console.error('Error parsing game data:', error);
      }
    }
  }, [params.gameData]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

  const handleTabChange = (tab: string) => {
    tabClick.current = true;
    setActiveTab(tab);
    const index = tabs.indexOf(tab);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
    setTimeout(() => { tabClick.current = false; }, 500);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    if (tabClick.current) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    const newTab = tabs[index];
    if (newTab && newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const handleStartGame = () => {
    router.push({
      pathname: '/game-play',
      params: { gameId: gameData.id, gameData: JSON.stringify(gameData) }
    });
  };

  const renderLeaderboardItem = (player: any, index: number) => (
    <View key={player.id} style={styles.leaderboardItem}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>#{player.rank}</Text>
      </View>
      <Image source={player.avatar} style={styles.playerAvatar} />
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerStats}>{player.gamesPlayed} games • {player.winRate}% win rate</Text>
      </View>
      <Text style={styles.playerScore}>{player.score}</Text>
    </View>
  );

  const renderPlayTab = () => (
    <View style={styles.playContainer}>
      {gameData && (
        <>
          <View style={styles.gameHeader}>
            <View style={styles.gameImageLarge}>
              <Image source={gameData.image} style={styles.gameImageStyle} />
              <View style={[styles.difficultyBadgeLarge, { backgroundColor: getDifficultyColor(gameData.difficulty) }]}>
                <Text style={styles.difficultyTextLarge}>{gameData.difficulty}</Text>
              </View>
            </View>
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>{gameData.title}</Text>
              <Text style={styles.gameDescription}>{gameData.description}</Text>
              <View style={styles.gameStatsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{gameData.points}</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{gameData.timeLimit}s</Text>
                  <Text style={styles.statLabel}>Time Limit</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{gameData.type}</Text>
                  <Text style={styles.statLabel}>Type</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.userStatsContainer}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.userStatsGrid}>
              <View style={styles.userStatItem}>
                <Text style={styles.userStatValue}>{userStats.currentScore}</Text>
                <Text style={styles.userStatLabel}>Current Score</Text>
              </View>
              <View style={styles.userStatItem}>
                <Text style={styles.userStatValue}>#{userStats.rank}</Text>
                <Text style={styles.userStatLabel}>Rank</Text>
              </View>
              <View style={styles.userStatItem}>
                <Text style={styles.userStatValue}>{userStats.gamesPlayed}</Text>
                <Text style={styles.userStatLabel}>Games Played</Text>
              </View>
              <View style={styles.userStatItem}>
                <Text style={styles.userStatValue}>{userStats.winRate}%</Text>
                <Text style={styles.userStatLabel}>Win Rate</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const renderLeaderboardTab = () => (
    <View style={styles.leaderboardContainer}>
      <Text style={styles.sectionTitle}>Top Players</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {leaderboardData.map((player, index) => renderLeaderboardItem(player, index))}
      </ScrollView>
    </View>
  );

  if (!gameData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading game...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Center</Text>
        <View style={styles.headerRight} />
      </View>

       <View style={styles.tabsContainer}>
         <TouchableOpacity
           style={[styles.tab, activeTab === 'Play' && styles.activeTab]}
           onPress={() => handleTabChange('Play')}
         >
           <Text style={[styles.tabText, activeTab === 'Play' && styles.activeTabText]}>
             Play
           </Text>
           {activeTab === 'Play' && <View style={styles.activeTabUnderline} />}
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.tab, activeTab === 'Leaderboard' && styles.activeTab]}
           onPress={() => handleTabChange('Leaderboard')}
         >
           <Text style={[styles.tabText, activeTab === 'Leaderboard' && styles.activeTabText]}>
             Leaderboard
           </Text>
           {activeTab === 'Leaderboard' && <View style={styles.activeTabUnderline} />}
         </TouchableOpacity>
       </View>

      <FlatList
        ref={flatListRef}
        data={[
          { key: 'Play' },
          { key: 'Leaderboard' }
        ]}
        renderItem={({ item }) => (
          <View style={styles.tabContentContainer}>
            {item.key === 'Play' ? renderPlayTab() : renderLeaderboardTab()}
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.key}
        style={styles.content}
        removeClippedSubviews={true}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7A4D3A',
  },
  headerRight: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5D6D8',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#A47E74',
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A4D3A',
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
  tabContentContainer: {
    width: width,
    flex: 1,
    paddingHorizontal: 20,
  },
  playContainer: {
    flex: 1,
    paddingTop: 20,
  },
  gameHeader: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  gameImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 20,
    position: 'relative',
  },
  gameImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  difficultyBadgeLarge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyTextLarge: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  gameInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 22,
  },
  gameStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#B8732F',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  userStatsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  userStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userStatItem: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#B8732F',
  },
  userStatLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  startButton: {
    backgroundColor: '#B8732F',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  leaderboardContainer: {
    flex: 1,
    paddingTop: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B8732F',
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  playerStats: {
    fontSize: 12,
    color: '#666',
  },
  playerScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#B8732F',
  },
});
