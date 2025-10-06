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
        source={require('@/assets/images/main-menu.jpeg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={handleBackToTopics}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
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
      source={require('@/assets/images/main-menu.jpeg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleBackToTopics}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#7A4D3A" />
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
              <Ionicons name="time" size={20} color={timeLeft <= 10 ? '#F44336' : '#7A4D3A'} />
              <Text style={[styles.timerText, { color: timeLeft <= 10 ? '#F44336' : '#7A4D3A' }]}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    color: '#7A4D3A',
    fontWeight: '500',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  questionCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignSelf: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A4D3A',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#7A4D3A',
    backgroundColor: '#F5F5F5',
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
    color: '#7A4D3A',
    fontWeight: '500',
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: '600',
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
    backgroundColor: '#7A4D3A',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#7A4D3A',
    marginTop: 16,
    marginBottom: 8,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 4,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  gradeText: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#7A4D3A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  resultButtons: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  restartButton: {
    backgroundColor: '#7A4D3A',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  backToTopicsButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  backToTopicsText: {
    color: '#7A4D3A',
    fontSize: 14,
    fontWeight: '600',
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
    color: '#ffffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionReviewCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  questionReviewText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7A4D3A',
    marginBottom: 12,
    lineHeight: 22,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    color: '#7A4D3A',
    fontWeight: '500',
    flex: 1,
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
