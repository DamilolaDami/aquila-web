import React, { useState } from 'react'
import Lottie from 'lottie-react'
import videoAnimation from '../../animations/animation_ll56028m.json'
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

import { firestore, storage } from '../../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const ApplyJobDialog = ({ open, onClose, job }) => {
  const [uploadVideoResume, setUploadVideoResume] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [applying, setApplying] = useState(false)

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0])
  }

  const applyWithVideoResume = async () => {
    if (selectedFile) {
      setApplying(true)
      const user = getAuth()
      // Create a storage reference
      const storageRef = ref(storage, `videoResumes/${selectedFile.name}`)

      // Upload the selected file to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, selectedFile)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        snapshot => {
          // You can monitor the upload progress here
        },
        error => {
          console.error('Error uploading video resume:', error)
        },
        async () => {
          // Upload completed successfully, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          // Call applyForJob with the video resume link
          applyForJob({
            value: true,
            hasvideoResume: true,
            videoResumeURL: downloadURL
          })
          setApplying(false)
          onClose()

          // window.location.href = "/";
        }
      )
    }
  }

  const applyWithoutVideoResume = () => {
    setApplying(true)
    applyForJob({ value: true, hasvideoResume: false, videoResumeURL: '' })
    onClose() // Close the dialog after applying
    // window.location.href = "/";
  }
  const applyForJob = async ({
    value,
    hasvideoResume,
    videoResumeURL
  } = {}) => {
    try {
      const user = getAuth()
      const db = getFirestore()
      console.log('value', value)
      const jobRef = doc(db, 'jobs', job.jobID)
      console.log('jobID', job.jobID)
      const jobSnapshot = await getDoc(jobRef)

      if (!jobSnapshot.exists()) {
        console.error('Error: Job document does not exist.')
        return
      }

      const selectedJob = jobSnapshot.data()

      // Check if the 'job' object exists and has a 'jobID' property
      if (!job || !job.jobID) {
        console.error(
          "Error: 'job' object is invalid or missing 'jobID' property"
        )
        return
      }

      // Check if a valid 'selectedJob' is found
      if (!selectedJob) {
        console.error('Error: Selected job not found in the job list')
        return
      }

      const userID = user.currentUser.uid
      const applicants = selectedJob.applicants || [] // Initialize the 'applicants' array if it's not present

      // Check if the user is already an applicant before adding
      if (!applicants.includes(userID)) {
        if (value === true) {
          applicants.push(userID)
        }
      } else {
        // Remove the user from the 'applicants' array
        if (value === false) {
          const index = applicants.indexOf(userID)
          if (index > -1) {
            applicants.splice(index, 1)
          }
        }
      }

      // Update the 'applicants' field in the Firestore document
      await setDoc(jobRef, { applicants }, { merge: true })

      const applicationsCollectionRef = collection(
        db,
        'jobs',
        job.jobID,
        'applications'
      )

      // Prepare application data
      const applicationData = {
        userID: userID,
        hasVideoResume: hasvideoResume,
        videoResumeURL: videoResumeURL || null
        // ... any other data you want to include
      }

      // Add the application document to the applications collection
      await addDoc(applicationsCollectionRef, applicationData)
      setApplying(true)
      console.log('Applied for job')
    } catch (error) {
      console.error('Error applying for job:', error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          fontWeight: 600
        }}
      >
        Improve Your Chances
      </DialogTitle>
      <DialogContent>
        {' '}
        <Lottie
          animationData={videoAnimation}
          loop={true}
          style={{ width: '40%', height: '40%', margin: 'auto' }}
        />
        <p style={{ paddingBottom: '20px' }}>
          Enhance your chances of securing this opportunity by submitting a
          concise 2-minute video resume. You can showcase your skills and
          passion directly to the hiring team.
          {job.calendly ? (
            <span>
              Alternatively, if you prefer direct interaction, you're welcome to
              schedule a call with our recruiter using the following link:{' '}
              <a href={job.calendly} target='_blank' rel='noopener noreferrer'>
                Schedule a Call
              </a>
              .
            </span>
          ) : (
            <span>
              Of course, if you prefer, you can also apply without submitting a
              video resume.
            </span>
          )}
        </p>
        <FormControlLabel
          control={
            <Checkbox
              checked={uploadVideoResume}
              onChange={() => setUploadVideoResume(!uploadVideoResume)}
            />
          }
          label='Upload Video Resume'
        />
        {uploadVideoResume && (
          <TextField
            label=''
            type='file'
            onChange={handleFileSelect}
            inputProps={{
              accept: 'video/*' // Specify accepted file types
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={
            uploadVideoResume ? applyWithVideoResume : applyWithoutVideoResume
          }
          sx={{
            backgroundColor: '#3f51b5',
            color: '#fff',
            fontWeight: 600
          }}
        >
          Apply
        </Button>
      </DialogActions>
      <Dialog open={applying} onClose={() => setApplying(false)}>
        <DialogTitle>Submitting Application</DialogTitle>
        <DialogContent>
          <p>Your application is being submitted. Please wait...</p>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}

export default ApplyJobDialog
