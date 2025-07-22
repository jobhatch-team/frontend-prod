import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  fetchUserCoverLetters,
  uploadCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
  CoverLetter
} from '../coverletterSlice';

const ManageCoverLetters = () => {
  const dispatch = useAppDispatch();
  const { userCoverLetters, loading, error } = useAppSelector((state) => state.coverLetters);

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchUserCoverLetters());
  }, [dispatch]);

  const resetForm = () => {
    setTitle('');
    setFile(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !editingId) return alert('Please select a file.');
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (title) formData.append('title', title);

    try {
      if (editingId) {
        await dispatch(updateCoverLetter({ coverLetterId: editingId, formData })).unwrap();
      } else {
        await dispatch(uploadCoverLetter(formData)).unwrap();
      }
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure?')) dispatch(deleteCoverLetter(id));
  };

  const handleEdit = (cl: CoverLetter) => {
    setTitle(cl.title || '');
    setEditingId(cl.id);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Your Cover Letters</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input type="text" placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <input type="file" accept=".pdf,.docx" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full p-2 border rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
          {editingId ? 'Update Cover Letter' : 'Upload Cover Letter'}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
            Cancel
          </button>
        )}
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {userCoverLetters.map((cl) => (
          <li key={cl.id} className="p-4 border rounded flex items-center justify-between">
            <div>
              <p className="font-medium">{cl.title || 'Untitled Cover Letter'}</p>
              <a href={cl.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View File
              </a>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(cl)} className="px-3 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500">Edit</button>
              <button onClick={() => handleDelete(cl.id)} className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCoverLetters;
