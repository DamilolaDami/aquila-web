import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
//see more/ see less icons
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import formatPrice from '../../global/utils/format_price'
import { useLocation } from 'react-router-dom'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore'
import { auth } from '../../config/firebase'
import { getAuth } from 'firebase/auth'
import ApplyJobDialog from './apply_job_dialog'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material'

const JobDescription = ({ job }) => {
  const [expanded, setExpanded] = useState(false)
  const [userHasApplied, setUserHasApplied] = useState(false)
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [uploadVideoResume, setUploadVideoResume] = useState(false);
  const [alreadyAppliedDialog, setalreadyAppliedDialog] = useState(false);

  // ... (existing functions and code)

  const openApplyDialog = () => {
    setShowApplyDialog(true);
  };

  const closeApplyDialog = () => {
    setShowApplyDialog(false);
  };



  const handleSeeMore = () => {
    setExpanded(!expanded)
  }
  const formatDate = timestamp => {
    const date = new Date(parseInt(timestamp, 10))
    const today = new Date()
    const diff = today - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))
    if (days > 0) {
      return `Posted ${days} ${days > 1 ? 'days' : 'day'} ago`
    }
    if (hours > 0) {
      return `Posted ${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
    }
    if (minutes > 0) {
      return `Posted ${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
    }
    return 'Posted just now'
  }

 
  //unapply for job
  

  return (
    <div>
      <div>
        <img
          src={job.posterImageURL}
          alt={job.title}
          style={{
            height: '400px',
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                paddingLeft: '20px',
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h3 className='job-title-name'
               
              >
                {job.title}
              </h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: '20px'
                }}
              >
                  <button
          onClick={() => {
            if (job.applicants.includes(auth.currentUser.uid) || userHasApplied) {
             
              setalreadyAppliedDialog(true)
            } else {
              openApplyDialog();
            }
          }}
          style={{
            border: 'none',
            background:
              job.applicants.includes(auth.currentUser.uid) || userHasApplied
                ? '#4285F4'
                : '#3f51b5',
            height: '40px',
            width: '150px',
            padding: '10px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {job.applicants.includes(auth.currentUser.uid) || userHasApplied
            ? 'Applied'
            : 'Apply'}
        </button>
                <div style={{ width: '10px' }}></div>

                <button className='detail-save-btn'
                  style={{
                    border: 'none',
                    background: 'none',
                    height: '40px',
                    width: '100px',
                    color: '#3f51b5',
                    cursor: 'pointer',
                    border: '1px solid #3f51b5'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <p
                style={{
                  margin: '0px',
                  paddingBottom: '5px',
                  color: 'grey'
                }}
              >
                {job.company}
              </p>
              <p style={{ margin: '0px', paddingBottom: '5px' }}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: 'grey', paddingRight: '5px' }}
                />
                {job.location +
                  ' | ' +
                  job.experienceLevel +
                  ' | ' +
                  formatDate(job.createdAt)}
              </p>
              <p className='detail-job-price'
               
              >
                {formatPrice(job.price)}
              </p>
              <h3>Job Description</h3>
              <p
                style={{
                  margin: '0px',
                  paddingBottom: '5px',
                  color: 'grey',
                  fontSize: '16px'
                }}
              >
                {expanded
                  ? job.description
                  : `${job.description.slice(0, 250)}...`}
              </p>
              <button
                onClick={handleSeeMore}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'blue',
                  cursor: 'pointer'
                }}
              >
                {expanded ? (
                  <div>
                    See Less <FontAwesomeIcon icon={faAngleUp} />
                  </div>
                ) : (
                  <div>
                    See More <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                )}
              </button>
              <h3>Requirements</h3>

              <ul
                style={{
                  margin: '0px',
                  paddingBottom: '5px',
                  color: 'grey',
                  fontSize: '16px'
                }}
              >
                {job.requirements.map((requirement, index) => (
                  <li
                    key={index}
                    style={{ margin: '0px', paddingBottom: '5px' }}
                  >
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
           
          </div>
        </div>
        <ApplyJobDialog open={showApplyDialog} onClose={closeApplyDialog} job={job} />
        <Dialog open={alreadyAppliedDialog} onClose={() => setalreadyAppliedDialog(false)}>
            <DialogTitle>Application Sent</DialogTitle>
            <DialogContent>
                <p>You have already applied for this job!.</p>
            </DialogContent>
        </Dialog>
      </div>
     
    </div>
    
  )
}

export default JobDescription
