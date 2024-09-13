import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import JobDetails from './components/JobDetails';
import './App.css'

const getBookmarksFromStorage = () => {
  const storedBookmarks = localStorage.getItem('bookmarkedJobs');
  return storedBookmarks ? JSON.parse(storedBookmarks) : [];
};

const saveBookmarksToStorage = (bookmarkedJobs) => {
  localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
};

const App = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState(getBookmarksFromStorage());

  const handleBookmark = (job) => {
    const jobExists = bookmarkedJobs.find((item) => item.id === job.id);
    let updatedBookmarks;
    if (jobExists) {
      
      updatedBookmarks = bookmarkedJobs.filter((item) => item.id !== job.id);
    } else {
      updatedBookmarks = [...bookmarkedJobs, job];
    }
    setBookmarkedJobs(updatedBookmarks);
    saveBookmarksToStorage(updatedBookmarks);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Jobs onBookmark={handleBookmark} />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/bookmarks" element={<Bookmarks bookmarkedJobs={bookmarkedJobs} />} />
      </Routes>
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center'}}>
        <button onClick={() => window.location.href = '/'}>Jobs</button>
        <button className="btn btn-primary bookmark-button" onClick={() => window.location.href = '/bookmarks'}>Bookmarks</button>
      </footer>
    </Router>
  );
};

export default App;
