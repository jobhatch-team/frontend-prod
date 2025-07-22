/**
 * JobHatch Resume Service Module
 * Handles all resume-related API requests to the backend
 */

class ResumeService {
    constructor() {
        this.apiBase = '/api';
        this.userId = sessionStorage.getItem('currentUserId') || 'user1';
    }

    /**
     * Upload a resume PDF for parsing
     * @param {File} file - The resume PDF file
     * @param {boolean} useAI - Whether to use AI for parsing
     * @returns {Promise} - API response with parsed experiences
     */
    async uploadResume(file, useAI = false) {
        try {
            console.log(`[DEBUG] Uploading resume file: ${file.name}, type: ${file.type}, size: ${file.size} bytes, useAI: ${useAI}`);
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('user_id', this.userId);
            formData.append('use_ai', useAI.toString());

            const response = await fetch(`${this.apiBase}/upload/resume`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`[DEBUG] Upload resume error: ${JSON.stringify(error)}`);
                throw new Error(error.error || 'Failed to upload resume');
            }

            const responseData = await response.json();
            console.log(`[DEBUG] Upload resume success: Got ${responseData.experiences?.length || 0} experiences, personal info: ${Object.keys(responseData.personal_info || {}).length > 0 ? 'yes' : 'no'}`);
            return responseData;
        } catch (error) {
            console.error('Error uploading resume:', error);
            throw error;
        }
    }

    /**
     * Get all experiences for the current user
     * @returns {Promise} - API response with experiences
     */
    async getExperiences() {
        try {
            const response = await fetch(`${this.apiBase}/resume/experiences?user_id=${this.userId}`);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to get experiences');
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting experiences:', error);
            throw error;
        }
    }

    /**
     * Update experiences for the current user
     * @param {Array} experiences - Array of experience objects
     * @returns {Promise} - API response
     */
    async updateExperiences(experiences) {
        try {
            const response = await fetch(`${this.apiBase}/resume/experiences?user_id=${this.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    experiences: experiences
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update experiences');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating experiences:', error);
            throw error;
        }
    }

    /**
     * Generate an improved resume using GPT
     * @param {Object} resumeData - Complete resume data object
     * @param {String} templateId - Optional template ID to use
     * @param {boolean} useAI - Whether to use GPT for enhancement
     * @returns {Promise} - API response with improved resume details
     */
    async generateImprovedResume(resumeData = {}, templateId = null, useAI = true) {
        try {
            const response = await fetch(`${this.apiBase}/resume/generate?user_id=${this.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...resumeData,
                    template_id: templateId,
                    use_ai: useAI
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to generate improved resume');
            }

            return await response.json();
        } catch (error) {
            console.error('Error generating improved resume:', error);
            throw error;
        }
    }

    /**
     * Enhance resume using OpenAI GPT-4o
     * @param {Object} resumeData - Complete resume data object
     * @returns {Promise} - API response with enhanced resume
     */
    async enhanceResumeWithAI(resumeData) {
        try {
            const response = await fetch(`${this.apiBase}/enhance-resume?user_id=${this.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resumeData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to enhance resume with AI');
            }

            return await response.json();
        } catch (error) {
            console.error('Error enhancing resume with AI:', error);
            throw error;
        }
    }

    /**
     * Parse a resume with or without AI
     * @param {File} file - The resume file to parse
     * @param {boolean} useAI - Whether to use AI for parsing
     * @returns {Promise} - API response with parsed resume data
     */
    async parseResume(file, useAI = true) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('use_ai', useAI.toString());

            const response = await fetch(`${this.apiBase}/parse-resume`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to parse resume');
            }

            return await response.json();
        } catch (error) {
            console.error('Error parsing resume:', error);
            throw error;
        }
    }

    /**
     * Get available resume templates
     * @returns {Promise} - API response with template list
     */
    async getResumeTemplates() {
        try {
            const response = await fetch(`${this.apiBase}/templates/resume`);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to get resume templates');
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting resume templates:', error);
            throw error;
        }
    }

    /**
     * Get available cover letter templates
     * @returns {Promise} - API response with template list
     */
    async getCoverLetterTemplates() {
        try {
            const response = await fetch(`${this.apiBase}/templates/cover`);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to get cover letter templates');
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting cover letter templates:', error);
            throw error;
        }
    }

    /**
     * Get the preview URL for a template
     * @param {string} templateType - Type of template (resume/cover)
     * @param {string} filename - The filename of the template
     * @returns {string} - URL for previewing the template
     */
    getTemplatePreviewUrl(templateType, filename) {
        return `${this.apiBase}/templates/preview/${templateType}/${filename}`;
    }

    /**
     * Get the download URL for a resume
     * @param {string} filename - The filename of the resume
     * @returns {string} - URL for downloading the resume
     */
    getResumeDownloadUrl(filename) {
        return `${this.apiBase}/resume/download/${this.userId}/${filename}`;
    }

    /**
     * Upload a cover letter PDF for parsing
     * @param {File} file - The cover letter PDF file
     * @returns {Promise} - API response with parsed cover letter
     */
    async uploadCoverLetter(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('user_id', this.userId);

            const response = await fetch(`${this.apiBase}/upload/coverletter`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to upload cover letter');
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading cover letter:', error);
            throw error;
        }
    }

    /**
     * Generate an improved cover letter using GPT
     * @param {Object} jobDetails - Details about the job (company, position)
     * @param {string} content - The original cover letter content
     * @param {String} templateId - Optional template ID to use
     * @returns {Promise} - API response with improved cover letter
     */
    async generateImprovedCoverLetter(jobDetails, content, templateId = null) {
        try {
            const response = await fetch(`${this.apiBase}/coverletter/generate?user_id=${this.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    job_details: jobDetails,
                    content: content,
                    template_id: templateId
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to generate improved cover letter');
            }

            return await response.json();
        } catch (error) {
            console.error('Error generating improved cover letter:', error);
            throw error;
        }
    }

    /**
     * Get the download URL for a cover letter
     * @param {string} filename - The filename of the cover letter
     * @returns {string} - URL for downloading the cover letter
     */
    getCoverLetterDownloadUrl(filename) {
        return `${this.apiBase}/coverletter/download/${this.userId}/${filename}`;
    }
}

// Create a singleton instance
const resumeService = new ResumeService();

// Make available globally
window.JobHatch = window.JobHatch || {};
window.JobHatch.resumeService = resumeService; 