import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import SignupDialog from '../../global/auth_dialog'
import { getAuth, onAuthStateChanged, User} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import formatPrice from '../../global/utils/format_price'



const JobCard = ({ job }: any) => {
 const [isDialogOpen, setIsDialogOpen] = useState(false);
 //get the current user
  const user = getAuth();
 const isSavedByUser = job.saved.includes(user.currentUser?.uid);
 //user has applied for the job
  const hasApplied = job.applicants.includes(user.currentUser?.uid);
  console.log('hasApplied', hasApplied);
  const navigate = useNavigate();
  // Function to navigate to the "View Job" page
  const goToViewJobPage = (jobID) => {
    navigate(`/viewJob/${jobID}`, { state: { id: jobID } });
   
  };

  // Example usage when navigating to the "View Job" page based on jobID
  const handleViewJobClick = (jobID) => {
    goToViewJobPage(jobID);
  };

 const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
   
    return [year, month, day].join('-');
  };
 
  

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <img
        src={job.posterImageURL}
        alt={job.title}
        style={{
          height: '200px',
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h3 style={{ margin: '0px', paddingBottom: '5px',
          
        }}>{job.title}</h3>
          <p style={{ margin: '0px', paddingBottom: '5px',
          color: 'grey',
         }}>{job.company}</p>
          <p style={{ margin: '0px', paddingBottom: '5px' }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'grey', paddingRight: '5px' }} />
            {job.location}
          </p>
        </div>
        <div
          style={{
            textAlign: 'right',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          
          <p style={{ margin: '0px', paddingBottom: '5px', color: 'grey', fontSize: '12px' }}>
            {formatDate(job.createdAt)}
          </p>
        </div>
      </div>
      <p style={{ margin: '0px', paddingBottom: '5px', fontWeight: 'bold', fontSize: '18px' }}>
           {formatPrice(job.price)}
          </p>
      <div
        style={{
          textAlign: 'left',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '15px',
          display: 'flex',
          paddingBottom: '5px',
        }}
      >
        
        <button
          onClick={() => {
            if (user.currentUser) {
              //then the user is logged in, navigate to the job page
              handleViewJobClick(job.jobID);
            } else {
              setIsDialogOpen(true);
            }
          }}
          style={{
            backgroundColor: '#3f51b5',
            color: hasApplied ? 'white' : 'white',
            border: 'none',
            width: '100%',
            borderRadius: '5px',
            padding: '20px',
            cursor: 'pointer',
            position: 'relative',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
        {hasApplied ? 'Applied' : 'Apply'}
        </button>
        <div style={{ textAlign: 'left', justifyContent: 'space-between', width: '10px' }}>
          <p> </p>
        </div>
        <div
          style={{
            textAlign: 'left',
            justifyContent: 'space-between',
            height: '25px',
            width: '27px',
            borderRadius: '50%',
            border: isSavedByUser ? '1px solid red' : '1px solid grey',
            padding: '10px',
            display: 'flex',
          }}
        >
          <FontAwesomeIcon icon={faHeart} style={{ color: isSavedByUser ? 'red' : 'grey',
          fontSize: '25px' }} />
        </div>
      </div>
      <SignupDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default JobCard;



