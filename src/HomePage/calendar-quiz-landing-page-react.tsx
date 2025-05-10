import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Weekdays from '../Weekdays';
import CalendarGrid from './CalendarGrid';
import Footer from './Footer';

const quizData = Array.from({ length: 35 }, (_, i) => ({
  title: `Quiz ${i + 1}`,
  difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
}));

export default function QuizCalendar() {
  const [today, setToday] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current date to highlight today's box
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();

    // Only highlight if the day is within our calendar range
    if (dayOfMonth <= 35) {
      setToday(dayOfMonth);
    }
  }, []);

  const handleDayClick = (dayId: number) => {
    navigate(`/quiz/${dayId}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 md:p-6">
      <Header />

      <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-xl">
        <Weekdays />
        <CalendarGrid today={today} onDayClick={handleDayClick} />
      </div>
      <Footer />
    </div>
  );
}