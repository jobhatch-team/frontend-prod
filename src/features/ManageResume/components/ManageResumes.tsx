import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  fetchUserResumes,
  uploadResume,
  updateResume,
  deleteResume,
  Resume
} from '../resumeSlice';
import { useNavigate } from 'react-router-dom';

const ManageResumes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const { userResumes, loading, error } = useAppSelector((state) => state.resumes);

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchUserResumes());
  }, [dispatch]);

  const resetForm = () => {
    setTitle('');
    setFile(null);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !editingId) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (title) formData.append('title', title);

    try {
      if (editingId) {
        await dispatch(updateResume({ resumeId: editingId, formData })).unwrap();
      } else {
        await dispatch(uploadResume(formData)).unwrap();
      }
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      dispatch(deleteResume(id));
    }
  };

  const handleEdit = (resume: Resume) => {
    setTitle(resume.title || '');
    setEditingId(resume.id);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Your Resumes</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept=".pdf,.docx"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {editingId ? 'Update Resume' : 'Upload Resume'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {userResumes.map((resume) => (
          <li
            key={resume.id}
            className="p-4 border rounded flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{resume.title || 'Untitled Resume'}</p>
              <a
                href={resume.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View File
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(resume)}
                className="px-3 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(resume.id)}
                className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/onboarding/analyze/${resume.id}`)}
                className="px-3 py-1 bg-green-600 rounded text-white hover:bg-green-700"
              >
                AI Analysis
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageResumes;

