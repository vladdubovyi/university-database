import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { FaFileAlt, FaImage, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function CourseDetails() {
  const { courseId } = useParams();
  const course = courseData[courseId];
  const [sectionsOpen, setSectionsOpen] = useState({
    exams: true,
    materials: false
  });

  const getIcon = (format) => {
    switch (format) {
      case 'photo':
        return <FaImage className="material-icon" />;
      default:
        return <FaFileAlt className="material-icon" />;
    }
  };

  const toggleSection = (section) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const groupByYear = (materials) => {
    return materials.reduce((acc, material) => {
      if (!acc[material.year]) {
        acc[material.year] = [];
      }
      acc[material.year].push(material);
      return acc;
    }, {});
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  const exams = course.materials.filter(m => m.type === 'exam');
  const learningMaterials = course.materials.filter(m => m.type === 'notes');
  const examsByYear = groupByYear(exams);
  const materialsByYear = groupByYear(learningMaterials);

  const renderMaterialsList = (materialsByYear) => {
    if (Object.keys(materialsByYear).length === 0) {
      return (
        <div className="no-content">
          No content found
        </div>
      );
    }

    return Object.entries(materialsByYear)
      .sort(([yearA], [yearB]) => yearB - yearA)
      .map(([year, materials]) => (
        <div key={year}>
          <div className="year-divider">{year}</div>
          {materials.map((material, index) => (
            <a 
              href={material.url} 
              key={index} 
              className="material-item" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {getIcon(material.format)}
              <div className="material-info">
                <span className="material-title">{material.title}</span>
              </div>
            </a>
          ))}
        </div>
      ));
  };

  return (
    <div className="course-details">
      <Link to="/" className="back-link">← Back to Courses</Link>
      <h1>{course.name}</h1>
      <p>Course ID: {courseId}</p>
      
      {/* Past Exams Section */}
      <div className="materials-section">
        <button 
          className="section-header" 
          onClick={() => toggleSection('exams')}
        >
          <h2>Past Exams</h2>
          {sectionsOpen.exams ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {sectionsOpen.exams && (
          <div className="materials">
            {renderMaterialsList(examsByYear)}
          </div>
        )}
      </div>

      {/* Learning Materials Section */}
      <div className="materials-section">
        <button 
          className="section-header" 
          onClick={() => toggleSection('materials')}
        >
          <h2>Learning Materials</h2>
          {sectionsOpen.materials ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {sectionsOpen.materials && (
          <div className="materials">
            {renderMaterialsList(materialsByYear)}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;