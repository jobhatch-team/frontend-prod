import React from 'react';
import ShowJobDetails from '../features/ShowJob/components/ShowJobDetails';

const JobsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <ShowJobDetails />
    </div>
  );
};

export default JobsPage;