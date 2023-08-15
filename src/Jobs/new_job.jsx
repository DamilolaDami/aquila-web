import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { firestore, storage } from "../config/firebase";
import SectionHeader from "../global/section_header";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { getFirestore, collection, addDocm, doc, addDoc, setDoc } from "firebase/firestore";

const NewJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [posterImage, setPosterImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState("Beginner");
  const [requirements, setRequirements] = useState([""]);
  const [calendly, setCalendlylink] = useState("");
  const handleExperienceLevelChange = (e) => {
    setExperienceLevel(e.target.value);
  };
  

  // Handle changes to requirements field
  const handleRequirementChange = (index, e) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = e.target.value;
    setRequirements(updatedRequirements);
  };

  // Add a new requirement input field
  const addRequirementField = () => {
    setRequirements([...requirements, ""]);
  };

  // Remove a requirement input field
  const removeRequirementField = (index) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };
  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handlePosterImageChange = (e) => {
    if (e.target.files[0]) {
      setPosterImage(e.target.files[0]);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };
  const handleCalendlylinkChange = (e) => {
    setCalendlylink(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null); // Reset error state before form submission

      setIsUploading(true);
      const imageRef = ref(storage, `job-posters/${posterImage.name}`);
      const uploadTask = uploadBytesResumable(imageRef, posterImage);


      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
          setIsUploading(false);
          setError("Error uploading image. Please try again.");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
             const jobID = Date.now().toString();
            // Save job details to Firestore
            const jobCollection = collection(firestore, "jobs");
            const newJob = doc(jobCollection, jobID);
            await setDoc(newJob, {
              jobID: jobID,
              title: jobTitle,
              description: jobDescription,
              posterImageURL: downloadURL,
              location,
              company,
              price,
              applicants: [],
              saved: [],
              keywords: jobTitle.toLowerCase().split(" "),
              experienceLevel,
              requirements,
              hasExpired: false,
              createdAt: Date.now(),
              calendly,
            });

            // Show success message when job creation is successful
            setSuccessMessage("Job created successfully!");

            // Reset form fields
            setIsUploading(false);
            setJobTitle("");
            setJobDescription("");
            setPosterImage(null);
            setLocation("Remote");
            setCompany("Company Name");
            setExperienceLevel("Beginner");
            setRequirements([""]);
            setPrice(0);
            setUploadProgress(0);
            setCalendlylink("");
          } catch (error) {
            console.error("Error getting image download URL:", error);
            setIsUploading(false);
            setError("Error creating new job. Please try again.");
          }
        }
      );
    } catch (error) {
      console.error("Error creating new job:", error);
      setIsUploading(false);
      setError("Error creating new job. Please try again.");
    }
  };

  return (
    <div className="new-job" style={{ paddingTop: "100px" }}>
      <SectionHeader title="New Job" subtitle="Create a new job" />
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Job Title:</label>
          <input type="text" value={jobTitle} onChange={handleJobTitleChange} required />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea value={jobDescription} onChange={handleJobDescriptionChange} required />
        </div>
        <div>
          <label>Requirements:</label>
          {requirements.map((requirement, index) => (
            <div key={index}>
              <input
                type="text"
                value={requirement}
                onChange={(e) => handleRequirementChange(index, e)}
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => removeRequirementField(index)}>
                  Remove
                </button>
              )}
            </div>
            
          ))}
             <button type="button" onClick={addRequirementField}>
            Add Requirement
          </button>
          </div>
        <div>
          <label>Experience Level:</label>
          <select value={experienceLevel} onChange={handleExperienceLevelChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div>
          <label>Job Poster Image:</label>
          <input type="file" onChange={handlePosterImageChange} accept="image/*" required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={handleLocationChange} />
        </div>
        <div>
          <label>Company:</label>
          <input type="text" value={company} onChange={handleCompanyChange} />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" value={price} onChange={handlePriceChange} />
        </div>
        <div>
          <label>Calendly Link:</label>
          <input type="text" value={calendly} onChange={handleCalendlylinkChange} />
        </div>
        {/* Display error message if an error occurred */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Display success message if job creation is successful */}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <button type="submit" disabled={isUploading}>
          {isUploading ? `Uploading... ${uploadProgress.toFixed(2)}%` : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default NewJob;
