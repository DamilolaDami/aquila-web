import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc
} from 'firebase/firestore'
import formatPrice from "../../global/utils/format_price";



const SimilarJobsList = ({currentJobId}: {currentJobId: string}) => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
      // Function to fetch jobs from Firebase
      const fetchJobs = async () => {
        try {
          const db = getFirestore();
          const jobCollectionRef = collection(db, "jobs");
          const jobSnapshot = await getDocs(jobCollectionRef);
  
          const fetchedJobs = jobSnapshot.docs.map((doc) => ({
            jobID: doc.id,
            ...doc.data(),
          })); // Cast the array to the type JobModel[]
          //all jobs but without the current job
          const filteredJobs = fetchedJobs.filter((job) => job.jobID !== currentJobId)
          setJobs(filteredJobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
  
      fetchJobs(); // Call the function to fetch jobs when the component mounts
    }, []);
    return (
        <div className="similar-jobs-list">
            <h1>Similar Jobs</h1>
            <div className="jobs-list">
                {jobs.map((job) => (
                    <div className="job" key={job.jobID}>
                        <div className="job-image">
                            <img src={job.posterImageURL} alt={job.title}
                            style={{ width: "30%", height: "50%", objectFit: "cover" }}
                             />
                        </div>
                        <div className="job-title">{job.title}</div>
                        <div className="job-company">{job.company}</div>
                        <div className="job-location">{job.location}</div>
                        <div className="job-salary">{formatPrice(job.price)}</div>
                        <div className="job-apply">
                            <button>Apply</button>
                        </div>
                    </div>
                    
                           
                ))}
                
            </div>
        </div>
    )
}

export default SimilarJobsList;