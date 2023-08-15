import React from "react";

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="section-header" >
       <div className="section-header__title">
            <p>{title}</p>
        </div>
        <div className="section-header__subtitle">
            <p>{subtitle}</p>
            </div>
        </div>
    );
    }


export default SectionHeader;