import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import JobSection from './Jobs';
import AboutUs from './about_us';
import NewJob from './Jobs/new_job';
import AllViews from './all_view';
import ViewJobPage from './Jobs/view_jobs';
import Footer from './footer';
import HeaderNav from './Navbar/nabvar';

const App = () => {
  return (
    <Router>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<AllViews />} />
        <Route path="/jobs" element={<JobSection isLarge={true} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/newJob" element={<NewJob />} />
        <Route path="/viewJob/:jobId" element={<ViewJobPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
