import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;