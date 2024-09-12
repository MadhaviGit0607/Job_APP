import React from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (!bookmarks.some(b => b.id === job.id)) {
      bookmarks.push(job);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  };

  return (
    <Card variant="outlined" style={{ margin: '10px 0' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Location: {job.location}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Salary: {job.salary}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Phone: {job.phone}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/job/${job.id}`)}
          style={{ marginTop: '10px' }}
        >
          View Details
        </Button>
        <IconButton
          aria-label="bookmark"
          onClick={handleBookmark}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default JobCard;
