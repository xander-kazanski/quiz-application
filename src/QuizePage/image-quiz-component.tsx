import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample quiz data - in a real app, this would come from your backend
const quizzes = [
  {
    id: 1,
    title: "Make and Model",
    question: "Which one of these is a Bugatti?",
    image: "https://hips.hearstapps.com/hmg-prod/images/rt-bugatti-chiron-super-sport-atiyeh-1-666b54d995eab.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*", // Placeholder image
    correctAnswer: "Bugatti Chiron Super Sport", // Correct answer text
    explanation: "This is the Bugatti Chiron Super Sport, a high-performance luxury car known for its speed and design.",
    difficulty: "medium"
  },
];

export default function ImageQuiz() {
  const navigate = useNavigate();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [timerActive, setTimerActive] = useState(true);

  const currentQuiz = quizzes[currentQuizIndex];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const handleTimeout = () => {
    setTimerActive(false);
    setShowResult(true);
  };

  const handleAnswerSelect = () => {
    if (selectedAnswer !== null || !timerActive) return; // Prevent selecting after answer is chosen

    setTimerActive(false);
    setSelectedAnswer(true);
    setShowResult(true);

    // Calculate points based on time left (more time = more points)
    const pointsEarned = Math.max(10, 10 + timeLeft);
    setScore(score + pointsEarned);
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setTimeLeft(30);
    setTimerActive(true);
    navigate('/'); // Navigate back to the home screen
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuizIndex + 1) / quizzes.length) * 100;

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Quiz Complete!</h1>
          <div className="text-center mb-8">
            <div className="inline-block rounded-full bg-blue-100 p-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Your Score: {score}</h2>
            <p className="text-lg text-gray-600 mt-1">Out of maximum {quizzes.length * 40} points</p>
          </div>
          <button 
            onClick={resetQuiz}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {/* Quiz header */}
        <div className="p-4 md:p-6 flex justify-between items-center border-b border-gray-100">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuiz.difficulty)}`}>
              {currentQuiz.difficulty.charAt(0).toUpperCase() + currentQuiz.difficulty.slice(1)}
            </span>
            <h1 className="text-xl font-bold text-gray-800 mt-1">{currentQuiz.title}</h1>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Question {currentQuizIndex + 1}/{quizzes.length}</span>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center font-medium ${timeLeft <= 5 ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-blue-100 text-blue-800'}`}>
              {timeLeft}
            </div>
          </div>
        </div>
        {/* Question and image */}
        <div className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">
            {currentQuiz.question}
          </h2>
          <div 
            className="relative pb-[66.67%] h-0 bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleAnswerSelect}
          >
            <img 
              src={currentQuiz.image} 
              alt="Quiz question" 
              className="absolute h-full w-full object-cover"
            />
          </div>
        </div>
        {/* Explanation when answer is selected */}
        {showResult && (
          <div className={`mt-5 mx-4 p-6 rounded-lg ${selectedAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className="font-medium mb-2">{selectedAnswer ? 'Correct!' : 'Incorrect'}</p>
            <p className="text-sm">{currentQuiz.explanation}</p>
          </div>
        )}
        {/* Next button */}
        {showResult && (
          <div className="mt-5 mx-4 p-6">
            <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              onClick={handleNextQuestion}
            >
              {currentQuizIndex < quizzes.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}