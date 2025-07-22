
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { thunkFetchJob } from '../showjobSlice';

const ShowJobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const job = useAppSelector((state) => state.jobs.selectedJob);
  const status = useAppSelector((state) => state.jobs.status);

  useEffect(() => {
    if (id) {
      dispatch(thunkFetchJob(Number(id)));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/jobs" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Job Listings
      </Link>

      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">
        {job.location} &middot; {job.job_type}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Description</h2>
        <p>{job.description}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Requirements</h2>
        <p><strong>Work Experience:</strong> {job.work_experience}</p>
        <p><strong>Skills:</strong> {job.skills}</p>
      </section>

      <section className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div><strong>Salary:</strong> {job.currency} {job.salary_min} - {job.salary_max}</div>
        <div><strong>Equity:</strong> {job.equity_min}% - {job.equity_max}%</div>
        <div><strong>Remote:</strong> {job.is_remote ? 'Yes' : 'No'}</div>
        <div><strong>Visa Sponsorship:</strong> {job.offer_visa_sponsorship ? 'Yes' : 'No'}</div>
        <div><strong>Relocation Accepted:</strong> {job.accept_relocate ? 'Yes' : 'No'}</div>
        <div><strong>Relocation Assistance:</strong> {job.offer_relocate_assistance ? 'Yes' : 'No'}</div>
      </section>
    </div>
  );
};

export default ShowJobDetail;
