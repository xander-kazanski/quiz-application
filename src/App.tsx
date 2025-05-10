import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizCalendar from './HomePage/calendar-quiz-landing-page-react';
import ImageQuiz from './QuizePage/image-quiz-component';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizCalendar />} />
        <Route path="/quiz/:dayId" element={<ImageQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
