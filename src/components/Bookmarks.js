import React from 'react';
import './Bookmarks.css';

const Bookmarks = ({ bookmarkedJobs }) => {
  return (
    <div className="bookmarks-container">
      <h1>Bookmarked Jobs</h1>
      <div className="bookmarks-list">
        {bookmarkedJobs.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          bookmarkedJobs.map((job) => (
            <div className="bookmark-card" key={job.id}>
              <h2 className="bookmark-title">{job.title}</h2>
              <p className="bookmark-location">{job.location}</p>
              <p className="bookmark-salary">Salary: ${job.salary}</p>
              <p className="bookmark-phone">Contact: {job.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
