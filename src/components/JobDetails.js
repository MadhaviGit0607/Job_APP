import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'https://testapi.getlokalapp.com/common/jobs?page=1';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="job-detail">
      <h1>{job.title}</h1>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Phone:</strong> {job.phone}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Requirements:</strong> {job.requirements}</p>
    </div>
  );
};

export default JobDetails;
