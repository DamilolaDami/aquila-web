import React from "react";
import SectionHeader from "../global/section_header";

const AboutUs = () => {
    return (
        <div className="about-us-container"> {/* Apply a CSS class for styling */}
            <SectionHeader title="About Us" subtitle="A little about us and a brief history of our company" />

            <div className="about-content">
                <p>Welcome to <strong>Aquila</strong>, your premier destination for job postings and career opportunities.</p>
                <p>At Aquila, we are dedicated to connecting top-tier talent with the best job opportunities in the industry.
                Whether you're a recent graduate looking for your first step on the career ladder or an experienced professional seeking new horizons, we've got you covered.</p>
                
                <p>Our journey began in 20XX with a vision to revolutionize the job market and simplify the job search process.
                Frustrated by the lack of transparency and efficiency in the traditional job hunting methods, we set out to create a platform that empowers both job seekers and employers.</p>
                
                <p>Over the years, we've grown into a vibrant community of job seekers and companies, each finding value in our commitment to quality, diversity, and innovation.
                Our platform offers a seamless experience, featuring advanced search capabilities, personalized job recommendations, and a user-friendly interface that streamlines the application process.</p>
                
                <p>Our team is composed of dedicated professionals who share a passion for reshaping the way people approach their careers.
                We believe in the potential of every individual and the transformative impact of finding the right opportunity.</p>
                
                <p>Thank you for choosing Aquila as your trusted partner on your journey to professional success.
                Together, we're building a brighter future for job seekers and employers alike.</p>
            </div>

            <style jsx>
                {`
                    .about-us-container {
                        padding: 20px;
                        border-radius: 5px;
                    }
                    .about-content {
                        margin-top: 20px;
                        font-size: 16px;
                    }
                `}
            </style>
        </div>
    );
}

export default AboutUs;