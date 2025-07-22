import React from 'react';
import ManageCoverLetters from '@/features/ManageResume/components/ManageCoverLetters';
import GenerateCoverLetterFromProfile from '@/features/ManageResume/components/GenerateCoverLetterFromProfile';

const ManageCoverLettersPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <ManageCoverLetters />
      <GenerateCoverLetterFromProfile />
    </div>
  );
};

export default ManageCoverLettersPage;