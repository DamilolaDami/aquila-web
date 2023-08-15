import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import JobDescription from "../Jobs/components/job_description";
import SimilarJobsList from "../Jobs/components/similar_job";
import { auth } from "../config/firebase";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "./components/loading_spinner";

const ViewJobPage = () => {
  const location = useLocation();
  const jobIDNew = location.state?.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const getJob = async () => {
    try {
      const db = getFirestore();
      const jobRef = collection(db, "jobs");
      const jobSnapshot = await getDocs(jobRef);
      const jobList = jobSnapshot.docs.map((doc) => doc.data());
      const selectedJob = jobList.find((job) => job.jobID === jobIDNew);

      if (selectedJob) {
        setJob(selectedJob);
      } else {
        console.log("Job not found");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching job:", error);
      setLoading(false);
    }
  };

  //apply for job
 
  useEffect(() => {
    if (jobIDNew) {
      getJob();
    }
  }, [jobIDNew]);

  const isDesktop = window.innerWidth >=824;

  return (
    <div
      className="view-job-page"
      style={{
        paddingTop: "100px",
        display: "grid",
        gridTemplateColumns: isDesktop ? "2fr 1fr" : "1fr", // Adjust column layout
        gap: "20px",
      }}
    >
      {loading ? (
        <div><LoadingSpinner /></div>
      ) : (
        <React.Fragment>
          <div>
            {job ? (
              <JobDescription job={job} />
            ) : (
              <div>Job not found</div>
            )}
          </div>
          {isDesktop && (
            <div className="similar-jobs">
              {job && <SimilarJobsList currentJobId={job.jobID} />}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default ViewJobPage;




