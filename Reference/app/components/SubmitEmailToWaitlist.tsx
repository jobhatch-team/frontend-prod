'use client';

import React, { useState } from 'react';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('entry.1305314608', formData.email);   // Replace with actual entry ID
    form.append('entry.1788866372', formData.name);    // Replace with actual entry ID
    form.append('entry.1666390546', formData.message); // Replace with actual entry ID

    await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSfKUxYaAAkRuK-DgvKI1W_IVo1OVGgZ8Fm9I6-2mEvEkO2fKw/formResponse',
      {
        method: 'POST',
        mode: 'no-cors',
        body: form,
      }
    );

    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Email address"
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Your name"
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Optional message"
        className="w-full border border-gray-300 rounded px-3 py-2 h-24"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Join Waitlist
      </button>
      {submitted && (
        <p className="text-green-600 text-center">Thanks! You’re on the list.</p>
      )}
    </form>
  );
}
