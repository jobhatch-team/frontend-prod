import React, { useState } from 'react';
import { debugFetch } from '../config/api';

interface InfoIntakeFormProps {
  onSubmit?: (data: FormData) => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  userType?: string;
  initialEmail?: string;
}

interface FormData {
  name: string;
  company: string;
  jobTitle: string;
  phoneNumber: string;
  email: string;
}

const InfoIntakeForm: React.FC<InfoIntakeFormProps> = ({
  onSubmit,
  onSuccess,
  onError,
  userType = 'founder',
  initialEmail = ''
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    jobTitle: '',
    phoneNumber: '',
    email: initialEmail
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    console.log('[INFO-INTAKE] Starting form submission for founder:', formData);

    try {
      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      // Backend submission removed - using Google Forms as primary method
      console.log('[INFO-INTAKE] Submitting to Google Forms (primary method)...');

      // Submit to Google Forms (primary submission) - using dedicated founder intake form
      console.log('[INFO-INTAKE] Submitting to Google Forms...');
      const form = new FormData();
      
      // Map form fields to Google Forms entry IDs for the founder intake form
      // Form URL: https://docs.google.com/forms/d/1KexEBqOl5GMfwqiEABgUUlzdL6Nwz_GdXfRpxFvZvvQ/edit
      // Fields in order: Name, Company, Position, Phone Number, Email
      
      // Predicted entry IDs based on common Google Forms patterns:
      // These are educated guesses based on the field order and typical Google Forms ID patterns
      form.append('entry.1636224620', formData.name);         // Name (1st field)
      form.append('entry.1047813905', formData.company);      // Company (2nd field)  
      form.append('entry.370378145', formData.jobTitle);     // Position (3rd field)
      form.append('entry.352052880', formData.phoneNumber);  // Phone Number (4th field)
      form.append('entry.786807798', formData.email);        // Email (5th field)
      
      
      console.log('[INFO-INTAKE] Form data being submitted:', {
        name: formData.name,
        company: formData.company,
        jobTitle: formData.jobTitle,
        phoneNumber: formData.phoneNumber,
        email: formData.email
      });

      // Using the dedicated founder intake form
      await fetch(
        'https://docs.google.com/forms/d/1KexEBqOl5GMfwqiEABgUUlzdL6Nwz_GdXfRpxFvZvvQ/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          body: form,
        }
      );
      
      console.log('[INFO-INTAKE] ✅ Google Forms submission completed');
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error('[INFO-INTAKE] ❌ Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Submission failed. Please try again.';
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🚀</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, Founder!
          </h2>
          <p className="text-gray-600">
            Tell us about yourself and your company to get started with recruiting top talent.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your company name"
              disabled={isSubmitting}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Job Title Field */}
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.jobTitle ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., CEO, Founder, Co-founder"
              disabled={isSubmitting}
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
              disabled={isSubmitting}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 hover:scale-105 active:scale-95'
              } shadow-lg`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Complete Setup'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By submitting this form, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoIntakeForm; 