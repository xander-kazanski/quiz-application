import React from 'react';
import Day from './Day';

interface CalendarGridProps {
  today: number;
  onDayClick: (dayId: number) => void;
}

const quizData: { id: number; title: string; difficulty: "easy" | "medium" | "hard" }[] = [
  { id: 1, title: "Car Brands", difficulty: "easy" },
  { id: 2, title: "Luxury Cars", difficulty: "easy" },
  { id: 3, title: "Car History", difficulty: "medium" },
  { id: 4, title: "Sports Cars", difficulty: "medium" },
  { id: 5, title: "Electric Vehicles", difficulty: "easy" },
  { id: 6, title: "Car Engines", difficulty: "medium" },
  { id: 7, title: "Supercars", difficulty: "hard" },
  { id: 8, title: "Car Models", difficulty: "easy" },
  { id: 9, title: "Classic Cars", difficulty: "hard" },
  { id: 10, title: "Car Technology", difficulty: "medium" },
  { id: 11, title: "Racing Cars", difficulty: "easy" },
  { id: 12, title: "Car Designers", difficulty: "hard" },
  { id: 13, title: "Car Manufacturing", difficulty: "medium" },
  { id: 14, title: "Car Safety", difficulty: "easy" },
  { id: 15, title: "Famous Car Models", difficulty: "medium" },
  { id: 16, title: "Car Innovations", difficulty: "medium" },
  { id: 17, title: "Car Aerodynamics", difficulty: "hard" },
  { id: 18, title: "Off-Road Vehicles", difficulty: "easy" },
  { id: 19, title: "Car Patents", difficulty: "medium" },
  { id: 20, title: "Vintage Cars", difficulty: "hard" },
  { id: 21, title: "Car Accessories", difficulty: "easy" },
  { id: 22, title: "Car Anatomy", difficulty: "medium" },
  { id: 23, title: "Car Chemistry", difficulty: "hard" },
  { id: 24, title: "Car Advertising", difficulty: "easy" },
  { id: 25, title: "Physics of Cars", difficulty: "hard" },
  { id: 26, title: "Famous Car Landmarks", difficulty: "medium" },
  { id: 27, title: "Car Literature", difficulty: "medium" },
  { id: 28, title: "Car Shows", difficulty: "easy" },
  { id: 29, title: "Car Languages", difficulty: "medium" },
  { id: 30, title: "Space Cars", difficulty: "hard" },
  { id: 31, title: "Car Video Games", difficulty: "medium" },
  { id: 32, title: "Car Logic Puzzles", difficulty: "hard" },
  { id: 33, title: "Car Mechanics", difficulty: "medium" },
  { id: 34, title: "Car World Records", difficulty: "easy" },
  { id: 35, title: "Car Brain Teasers", difficulty: "hard" },
];

const CalendarGrid: React.FC<CalendarGridProps> = ({ today, onDayClick }) => (
  <div className="grid grid-cols-7 grid-rows-5 gap-0.5 bg-gray-200 p-0.5">
    {quizData.map(day => (
      <Day 
        key={day.id} 
        day={day} 
        isToday={day.id === today}
        onDayClick={onDayClick}
      />
    ))}
  </div>
);

export default CalendarGrid;