import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { mudraMatchQuestions } from '../data.js';

const { width } = Dimensions.get('window');

export default function GamePlay() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [gameData, setGameData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (params.gameData) {
      try {
        const game = JSON.parse(params.gameData as string);
        setGameData(game);
        setTimeLeft(game.timeLimit || 60);
      } catch (error) {
        console.error('Error parsing game data:', error);
      }
    }
  }, [params.gameData]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (gameStarted && !gameEnded && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameStarted, gameEnded, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setGameEnded(false);
  };

  const endGame = () => {
    setGameEnded(true);
    setGameStarted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const question = mudraMatchQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    if (isCorrect) {
      setScore(score + question.points);
    }

    setTimeout(() => {
      if (currentQuestion < mudraMatchQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame();
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(gameData?.timeLimit || 60);
    setGameStarted(false);
    setGameEnded(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const goToGamePage = () => {
    router.back();
  };

  const renderStartScreen = () => (
    <View style={styles.centerContainer}>
      <View style={styles.gamePreview}>
        {gameData && (
          <>
            <Image source={gameData.image} style={styles.previewImage} />
            <Text style={styles.previewTitle}>{gameData.title}</Text>
            <Text style={styles.previewDescription}>{gameData.description}</Text>
            <View style={styles.gameRules}>
              <Text style={styles.rulesTitle}>How to Play:</Text>
              <Text style={styles.rulesText}>• Look at the mudra image</Text>
              <Text style={styles.rulesText}>• Select the correct name</Text>
              <Text style={styles.rulesText}>• Score points for correct answers</Text>
              <Text style={styles.rulesText}>• Complete before time runs out</Text>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Start Playing</Text>
      </TouchableOpacity>
    </View>
  );

   const renderGameScreen = () => {
     const question = mudraMatchQuestions[currentQuestion];
     
     return (
       <ScrollView style={styles.gameContainer} showsVerticalScrollIndicator={false}>
         <View style={styles.gameHeader}>
           <View style={styles.progressContainer}>
             <Text style={styles.progressText}>
               Question {currentQuestion + 1} of {mudraMatchQuestions.length}
             </Text>
             <View style={styles.progressBar}>
               <View 
                 style={[
                   styles.progressFill, 
                   { width: `${((currentQuestion + 1) / mudraMatchQuestions.length) * 100}%` }
                 ]} 
               />
             </View>
           </View>
           <View style={styles.statsContainer}>
             <View style={styles.statItem}>
               <Text style={styles.statValue}>{score}</Text>
               <Text style={styles.statLabel}>Score</Text>
             </View>
             <View style={styles.statItem}>
               <Text style={[styles.statValue, { color: timeLeft < 10 ? '#F44336' : '#B8732F' }]}>
                 {timeLeft}s
               </Text>
               <Text style={styles.statLabel}>Time</Text>
             </View>
           </View>
         </View>

         {/* Question */}
         <View style={styles.questionContainer}>
           <Text style={styles.questionTitle}>What is this mudra called?</Text>
           <View style={styles.mudraImageContainer}>
             <Image source={question.mudraImage} style={styles.mudraImage} />
           </View>
         </View>

         <View style={styles.optionsContainer}>
           {question.options.map((option, index) => {
             let buttonStyle: any = styles.optionButton;
             let textStyle: any = styles.optionText;
             
             if (showResult && selectedAnswer === index) {
               if (index === question.correct) {
                 buttonStyle = [styles.optionButton, styles.correctOption];
                 textStyle = [styles.optionText, styles.correctOptionText];
               } else {
                 buttonStyle = [styles.optionButton, styles.wrongOption];
                 textStyle = [styles.optionText, styles.wrongOptionText];
               }
             } else if (showResult && index === question.correct) {
               buttonStyle = [styles.optionButton, styles.correctOption];
               textStyle = [styles.optionText, styles.correctOptionText];
             }

             return (
               <TouchableOpacity
                 key={index}
                 style={buttonStyle}
                 onPress={() => handleAnswerSelect(index)}
                 disabled={showResult}
               >
                 <Text style={textStyle}>{option}</Text>
               </TouchableOpacity>
             );
           })}
         </View>
         <View style={styles.bottomSpacing} />
       </ScrollView>
     );
   };

  const renderEndScreen = () => {
    const totalPossibleScore = mudraMatchQuestions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPossibleScore) * 100);
    
    return (
      <View style={styles.centerContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Game Complete!</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.finalScore}>{score}</Text>
            <Text style={styles.scoreLabel}>Final Score</Text>
          </View>
          <Text style={styles.percentageText}>{percentage}% Accuracy</Text>
          
          <View style={styles.resultStats}>
            <View style={styles.resultStatItem}>
              <Text style={styles.resultStatValue}>{currentQuestion + 1}</Text>
              <Text style={styles.resultStatLabel}>Questions</Text>
            </View>
            <View style={styles.resultStatItem}>
              <Text style={styles.resultStatValue}>{Math.round(percentage)}%</Text>
              <Text style={styles.resultStatLabel}>Accuracy</Text>
            </View>
            <View style={styles.resultStatItem}>
              <Text style={styles.resultStatValue}>{gameData?.timeLimit - timeLeft}s</Text>
              <Text style={styles.resultStatLabel}>Time Used</Text>
            </View>
          </View>

           <View style={styles.actionButtons}>
             <TouchableOpacity style={styles.fullWidthSecondaryButton} onPress={restartGame}>
               <Text style={styles.secondaryButtonText}>Play Again</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.fullWidthPrimaryButton} onPress={goToGamePage}>
               <Text style={styles.primaryButtonText}>Back to Games</Text>
             </TouchableOpacity>
           </View>
        </View>
      </View>
    );
  };

  if (!gameData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
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
         <Text style={styles.headerTitle}>{gameData.title}</Text>
         <View style={styles.headerRight} />
       </View>

      {!gameStarted && !gameEnded ? renderStartScreen() : 
       gameEnded ? renderEndScreen() : renderGameScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
    paddingTop: 20,
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gamePreview: {
    alignItems: 'center',
    marginBottom: 40,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  previewDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  gameRules: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  rulesText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#B8732F',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  gameContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gameHeader: {
    marginBottom: 30,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#B8732F',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#B8732F',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  mudraImageContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mudraImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  optionsContainer: {
    paddingBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  correctOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  correctOptionText: {
    color: '#4CAF50',
  },
  wrongOptionText: {
    color: '#F44336',
  },
  resultContainer: {
    alignItems: 'center',
    width: '100%',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#B8732F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  percentageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 30,
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  resultStatItem: {
    alignItems: 'center',
  },
  resultStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B8732F',
  },
  resultStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'column',
    width: '100%',
  },
  fullWidthPrimaryButton: {
    backgroundColor: '#B8732F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#B8732F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  fullWidthSecondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#B8732F',
    width: '100%',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#B8732F',
    flex: 1,
    marginRight: 10,
  },
  secondaryButtonText: {
    color: '#B8732F',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
