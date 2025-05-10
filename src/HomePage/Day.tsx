import React from 'react';

interface DayProps {
  day: {
    id: number;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  isToday: boolean;
  onDayClick: (dayId: number) => void;
}

const Day: React.FC<DayProps> = ({ day, isToday, onDayClick }) => {
  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-orange-500",
    hard: "bg-red-500"
  };

  return (
    <div 
      className={`aspect-square bg-white flex flex-col justify-center items-center cursor-pointer transition-all duration-300 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-md relative ${isToday ? 'border-2 border-blue-500 scale-105' : ''}`}
      onClick={() => onDayClick(day.id)}
    >
      <div className="text-xl font-bold mb-1 text-slate-800">{day.id}</div>
      <div className="text-xs md:text-sm text-center text-gray-600 px-1">{day.title}</div>
      <div className={`absolute top-1 right-1 w-2 h-2 md:w-3 md:h-3 rounded-full ${difficultyColors[day.difficulty]}`}></div>
    </div>
  );
};

export default Day;