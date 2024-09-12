import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Jobs.css'; 

const API_URL = 'https://testapi.getlokalapp.com/common/jobs?page=1';


const Jobs = ({ onBookmark }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchJobs = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?page=${pageNum}`);
      const data = await response.json();
      if (data.jobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prevJobs) => [...prevJobs, ...data.jobs]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(page);
  }, [fetchJobs, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


 

  const handleJobClick = (id) => {
    navigate(`/job/${id}`);
  };

  const handleBookmarkClick = (job) => {
    onBookmark(job);
  };

  return (
    <div className="jobs-container">
      <h1>Jobs</h1>
      <div className="jobs-list">
        {jobs.length === 0 && !loading && <p>No jobs available.</p>}
        {jobs.map((job) => (
          <div className="job-card" key={job.id} onClick={() => handleJobClick(job.id)}>
            <h2 className="job-title">{job.title}</h2>
            <p className="job-location">{job.location}</p>
            <p className="job-salary">Salary: ${job.salary}</p>
            <p className="job-phone">Contact: {job.phone}</p>
            <button className="bookmark-button" onClick={(e) => {
              e.stopPropagation(); // Prevent the card click event
              handleBookmarkClick(job);
            }}>
              {job.isBookmarked ? 'Unbookmark' : 'Bookmark'}
            </button>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more jobs available.</p>}
    </div>
  );
}
export default Jobs;
