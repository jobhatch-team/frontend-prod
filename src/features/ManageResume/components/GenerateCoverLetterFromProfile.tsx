import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { generateCoverLetterFromProfile } from '../aiCoverLetterSlice';

const GenerateCoverLetterFromProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.coverLetters);
  const [coverLetterText, setCoverLetterText] = useState('');

  const handleGenerate = async () => {
    try {
      const resultAction = await dispatch(generateCoverLetterFromProfile());
      if (generateCoverLetterFromProfile.fulfilled.match(resultAction)) {
        const generatedText = resultAction.payload.extracted_text || '';
        setCoverLetterText(generatedText);
      }
    } catch (err) {
      console.error('Generation failed:', err);
    }
  };

  const handleCopy = () => {
    if (!coverLetterText) return;
    navigator.clipboard.writeText(coverLetterText).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy.');
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Generate Cover Letter from Profile</h2>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Cover Letter'}
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <textarea
        className="w-full h-64 p-2 border rounded resize-none"
        value={coverLetterText}
        onChange={(e) => setCoverLetterText(e.target.value)}
        placeholder="Generated cover letter text will appear here..."
      />
      <button
        onClick={handleCopy}
        disabled={!coverLetterText}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default GenerateCoverLetterFromProfile;
