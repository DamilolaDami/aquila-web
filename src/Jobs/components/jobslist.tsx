import React, { useState, useEffect } from 'react'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
  orderBy,
  limit,
  startAt,
  startAfter
} from 'firebase/firestore' // Assuming you have already set up your Firebase config and initialized Firestore

import JobCard from './jobcard'
import JobModel from '../data/JobModel'
import LoadingSpinner from './loading_spinner'

const JobsList = () => {
  const [jobs, setJobs] = useState<JobModel[]>([])
  const [allJobs, setAllJobs] = useState<JobModel[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages]= useState(0)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobModel[]>(jobs); // Initialize with all jobs
  const jobsPerPage = 6
  const hasNextPage = jobs.length === jobsPerPage
  const fetchJobs = async () => {
    const db = getFirestore();
    const jobCollectionRef = collection(db, 'jobs');

    try {
      let q = query(
        jobCollectionRef,
        orderBy('createdAt', 'desc'),
        limit(jobsPerPage)
      );

      if (currentPage > 1) {
        const lastVisibleJob = jobs[jobs.length - 1];
        q = query(q, startAfter(lastVisibleJob.createdAt));
      }

      const querySnapshot = await getDocs(q);

      const fetchedJobs = querySnapshot.docs.map(doc => ({
        jobID: doc.id,
        ...doc.data(),
      })) as JobModel[];

      setJobs(fetchedJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const fetchTotalJobs = async () => {
    const db = getFirestore();
    const jobCollectionRef = collection(db, 'jobs');

    try {
      const querySnapshot = await getDocs(jobCollectionRef);
      const fetchedAllJobs = querySnapshot.docs.map(doc => ({
        jobID: doc.id,
        ...doc.data(),
      })) as JobModel[];
      setAllJobs(fetchedAllJobs);
      setTotalPages(Math.ceil(fetchedAllJobs.length / jobsPerPage));
    } catch (error) {
      console.error('Error fetching total jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchTotalJobs();
  }, [currentPage]);

  useEffect(() => {
    // Filter jobs based on search query
    const filtered = allJobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchQuery, allJobs]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className='joblist_list_card'>
       <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
      {loading ? (
        <LoadingSpinner /> // Display a loading spinner while fetching data
      ) : (
        <div>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '30px',
              paddingTop:'30px',
              paddingBottom:'30px'

            }}
          >
           {searchQuery ? (
              filteredJobs.map(job => (
                <JobCard key={job.jobID} job={job} />
              ))
            ) : (
              jobs.map(job => (
                <JobCard key={job.jobID} job={job} />
              ))
            )}
          </div>

          <div className="pagination_button">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1} // Disable the button if already on the first page
            >
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage} // Disable the button if there are no more jobs to fetch
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobsList
