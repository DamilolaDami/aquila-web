import React from "react";


interface JobModel {
    jobID: string; // Unique job ID based on current timestamp
    title: string;
    description: string;
    posterImageURL: string;
    location: string;
    company: string;
    price: number;
    applicants: string[]; // Array to store job applicants (users who applied for the job) - Assuming user IDs are used here
    saved: string[]; // Array to store users who saved the job - Assuming user IDs are used here
    keywords: string[]; // Array of lowercase keywords extracted from the job title
    hasExpired: boolean;
    createdAt: number; // Timestamp when the job was created (in milliseconds)
    requirements: string[];
    experienceLevel : string;
    calendly: string;
  }
  
  export default JobModel;
  



