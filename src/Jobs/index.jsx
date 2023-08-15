import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SectionHeader from "../global/section_header";
import JobsList from "./components/jobslist";


const JobSection = ({ isLarge }) => {
    return (
        <div className="view-job" style={{ paddingTop: isLarge ? "100px" : "0px"}}>
         <SectionHeader title="Jobs" subtitle="Find the right jobs for you, right now" />
         <JobsList />
        </div>
    );
    }

export default JobSection;