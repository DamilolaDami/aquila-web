import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';

const JobChipsRow = () => {
  // Define an array of job types
  const jobTypes = ['Web Developer', 'Software Engineer', 'Data Analyst', 'UX Designer', 'Product Manager', 
  "Machine Learning Engineer", "Data Scientist"
];

  const [currentJobType, setCurrentJobType] = useState(jobTypes[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = jobTypes.indexOf(currentJobType);
      const nextIndex = (currentIndex + 1) % jobTypes.length;
      setCurrentJobType(jobTypes[nextIndex]);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentJobType, jobTypes]);

  return (
    <div style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', gap: '10px', paddingTop: "40px", paddingBottom: "40px" }}>
      {/* Render the chips with the job types */}
      {jobTypes.map((jobType) => (
        <Chip key={jobType} label={jobType} style={{ backgroundColor: currentJobType === jobType ? '#f50057' : '#3f51b5', color: 'white' }} />
      ))}
    </div>
  );
};

export default JobChipsRow;
