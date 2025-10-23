import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getQuizData } from '../data';

export default function QuizInterfaceScreen() {
  const router = useRouter();
  const { category, topicTitle, topicId } = useLocalSearchParams();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const quizData = getQuizData(category as string, topicTitle as string);
  const currentQuestion = quizData?.questions[currentQuestionIndex];

  useEffect(() => {
    if (!showExplanation && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswerSubmit(-1);
    }
  }, [timeLeft, showExplanation, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = (answerIndex?: number) => {
    // use explicit nullish coalescing so answerIndex = 0 is handled
    const resolved = answerIndex ?? selectedAnswer ?? -1;
    if (resolved === null && resolved !== -1) return;

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = resolved;
    setUserAnswers(newUserAnswers);

    // Move to next question or finish quiz. Pass updated answers so final calc includes this answer
    handleNextQuestion(newUserAnswers);
  };

  const handleNextQuestion = (answers?: number[]) => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      const sourceAnswers = answers ?? userAnswers;
      const totalCorrect = quizData.questions.reduce((acc: number, q: any, idx: number) => {
        const ua = sourceAnswers[idx];
        return acc + (ua === q.correct ? 1 : 0);
      }, 0);
      setScore(totalCorrect);
      setQuizCompleted(true);
      setShowExplanation(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setUserAnswers([]);
  };

  const handleBackToTopics = () => {
    router.back();
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 90) return 'Outstanding! You have exceptional knowledge of this topic!';
    if (percentage >= 80) return 'Very Good! You have mastered this topic well!';
    if (percentage >= 70) return 'Good! You have a solid understanding of this topic!';
    if (percentage >= 60) return 'Fair! Keep practicing to improve your knowledge!';
    if (percentage >= 50) return 'Average! Study more to enhance your understanding!';
    return 'Needs Improvement! Review the topic and try again!';
  };

  const getScoreGrade = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'D';
  };

  if (!quizData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Quiz data not found</Text>
      </SafeAreaView>
    );
  }

  if (quizCompleted) {
    return (
      <ImageBackground 
        source={require('@/assets/images/quiz.jpeg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={handleBackToTopics}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quiz Complete!</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
            <View style={styles.resultCard}>
              <Ionicons 
                name={score >= quizData.questions.length * 0.8 ? "trophy" : "checkmark-circle"} 
                size={64} 
                color={getScoreColor()} 
              />
              <Text style={styles.resultTitle}>Quiz Completed!</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  {score} / {quizData.questions.length}
                </Text>
                <Text style={[styles.percentageText, { color: getScoreColor() }]}>
                  {Math.round((score / quizData.questions.length) * 100)}%
                </Text>
                <Text style={[styles.gradeText, { color: getScoreColor() }]}>
                  Grade: {getScoreGrade()}
                </Text>
              </View>
              <Text style={styles.messageText}>{getScoreMessage()}</Text>
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewTitle}>Review Your Answers</Text>
                          {quizData.questions.map((question: any, index: number) => {
                            const userAnswer = userAnswers[index];
                            const isCorrect = userAnswer === question.correct;
                            return (
                              <View key={question.id} style={styles.questionReviewCard}>
                                {/* Correctness badge */}
                                <View style={[
                                  styles.correctnessBadge,
                                  isCorrect ? styles.correctBadge : styles.wrongBadge,
                                ]}>
                                  <Text style={[
                                    styles.correctnessText,
                                    isCorrect ? styles.correctText : styles.wrongText,
                                  ]}>{isCorrect ? 'Correct' : 'Wrong'}</Text>
                                </View>

                                <Text style={styles.questionReviewText}>
                                  Q{index + 1}: {question.question}
                                </Text>
                    
                                <View style={styles.answerReviewContainer}>
                                  {question.options.map((option: any, optionIndex: number) => (
                                    <View
                                      key={optionIndex}
                                      style={[
                                        styles.answerReviewOption,
                                        optionIndex === question.correct && styles.correctAnswerReview,
                                        optionIndex === userAnswer && optionIndex !== question.correct && styles.incorrectAnswerReview,
                                      ]}
                                    >
                                      <Text style={[
                                        styles.answerReviewText,
                                        optionIndex === question.correct && styles.correctAnswerText,
                                        optionIndex === userAnswer && optionIndex !== question.correct && styles.incorrectAnswerText,
                                      ]}>
                                        {String.fromCharCode(65 + optionIndex)}. {option}
                                      </Text>
                                      {optionIndex === question.correct && (
                                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                                      )}
                                      {optionIndex === userAnswer && optionIndex !== question.correct && (
                                        <Ionicons name="close-circle" size={20} color="#F44336" />
                                      )}
                                    </View>
                                  ))}
                                </View>

                                <View style={styles.explanationContainer}>
                                  <Text style={styles.explanationTitle}>Explanation:</Text>
                                  <Text style={styles.explanationText}>{question.explanation}</Text>
                                </View>
                              </View>
                            );
                          })}
            </View>

            {/* Action Buttons: fixed footer */}
            <View style={styles.resultButtons} pointerEvents="box-none">
              <TouchableOpacity 
                style={styles.restartButton}
                onPress={handleRestartQuiz}
                activeOpacity={0.9}
              >
                <Text style={styles.restartButtonText}>Retake Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.backToTopicsButton}
                onPress={handleBackToTopics}
                activeOpacity={0.9}
              >
                <Text style={styles.backToTopicsText}>Back to Topics</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('@/assets/images/quiz.jpeg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleBackToTopics}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{quizData.title}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </Text>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.questionCard}>
            <View style={styles.timerContainer}>
              <Ionicons name="time" size={20} color="#FFFFFF" />
              <Text style={[styles.timerText, { color: '#FFFFFF' }]}>
                {timeLeft}s
              </Text>
            </View>
            
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedAnswer === index && styles.selectedOptionText,
                  ]}>
                    {String.fromCharCode(65 + index)}. {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.submitButton, selectedAnswer === null && styles.disabledButton]}
                onPress={() => handleAnswerSubmit()}
                disabled={selectedAnswer === null}
              >
                <Text style={styles.submitButtonText}>
                  {currentQuestionIndex < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DAA520',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedOption: {
    borderColor: 'rgba(122, 77, 58, 0.8)',
    backgroundColor: 'rgba(122, 77, 58, 0.2)',
    shadowColor: '#7A4D3A',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  incorrectOption: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  selectedOptionText: {
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: '#F44336',
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  actionButtons: {
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'rgba(122, 77, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: 'rgba(204, 204, 204, 0.6)',
    backdropFilter: 'blur(5px)',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  nextButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    backdropFilter: 'blur(10px)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  gradeText: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  resultButtons: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  restartButton: {
    backgroundColor: 'rgba(122, 77, 58, 0.8)',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  backToTopicsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backToTopicsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  // correctness badge
  correctnessBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  correctBadge: {
    backgroundColor: '#E8F5E8',
  },
  wrongBadge: {
    backgroundColor: '#FFEBEE',
  },
  correctnessText: {
    fontSize: 12,
    fontWeight: '700',
  },
  correctText: {
    color: '#4CAF50',
  },
  wrongText: {
    color: '#F44336',
  },
  reviewSection: {
    marginTop: 20,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  questionReviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  questionReviewText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  answerReviewContainer: {
    marginBottom: 12,
  },
  answerReviewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  correctAnswerReview: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  incorrectAnswerReview: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  answerReviewText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  correctAnswerText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  incorrectAnswerText: {
    color: '#F44336',
    fontWeight: '600',
  },
});
