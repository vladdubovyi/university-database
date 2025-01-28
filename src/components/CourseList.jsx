import React from 'react';
import { Link } from 'react-router-dom';
import { courseData } from '../data/courseData';

function CourseList() {
  return (
    <div className="course-list">
      <h1>University Course Materials</h1>
      <div className="courses">
        {Object.entries(courseData).map(([courseId, course]) => (
          <Link 
            to={`/course/${courseId}`} 
            key={courseId}
            className="course-card"
          >
            <h2>{course.name}</h2>
            <p>Course ID: {courseId}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CourseList;