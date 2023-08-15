import React from "react";
import Header from "./Header";
import JobSection from "./Jobs";
import AboutUs from "./about_us";


const AllViews= () => {
    return (
        <div>
            <Header />
            <JobSection isLarge={false} />
        </div>
    )
}

export default AllViews;