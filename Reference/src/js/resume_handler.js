/**
 * JobHatch Resume Handler Module
 * Manages all resume and cover letter related interactions with the backend
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache important DOM elements
    const resumeFileInput = document.getElementById('resumeFileInput');
    const resumeParserSection = document.getElementById('resumeParserSection');
    const parsedResumeContainer = document.getElementById('parsedResumeContainer');
    const parsedExperiencesList = document.getElementById('parsedExperiencesList');
    const parserProgressBar = document.getElementById('parserProgressBar');
    const parserStatusText = document.getElementById('parserStatusText');
    const resumeEditorSection = document.getElementById('resumeEditorSection');
    const experiencesList = document.getElementById('experiencesList');
    const educationList = document.getElementById('educationList');
    const skillsList = document.getElementById('skillsList');
    const noResumesState = document.getElementById('noResumesState');
    const resumesList = document.getElementById('resumesList');
    
    // Cover letter elements
    const coverLetterFileInput = document.getElementById('coverLetterFileInput');
    const coverLetterEditor = document.getElementById('coverLetterEditor');
    const noCoverLettersState = document.getElementById('noCoverLettersState');
    const coverLettersList = document.getElementById('coverLettersList');
    
    // Resume option buttons
    const freeWriteOption = document.getElementById('freeWriteOption');
    const uploadResumeOption = document.getElementById('uploadResumeOption');
    const aiGeneratorOption = document.getElementById('aiGeneratorOption');
    const createResumeBtn = document.getElementById('createResumeBtn');
    
    // Tab navigation elements
    const resumeTabBtn = document.getElementById('resumeTabBtn');
    const coverLetterTabBtn = document.getElementById('coverLetterTabBtn');
    const resumeTabContent = document.getElementById('resumeTabContent');
    const coverLetterTabContent = document.getElementById('coverLetterTabContent');
    
    // Template-related elements
    const resumeTemplateSelector = document.getElementById('resumeTemplateSelector');
    const coverLetterTemplateSelector = document.getElementById('coverLetterTemplateSelector');
    const templatePreviewContainer = document.getElementById('templatePreviewContainer');
    const resumeTemplatesContainer = document.getElementById('resumeTemplatesContainer');
    const coverTemplatesContainer = document.getElementById('coverTemplatesContainer');
    
    // Add new element for Generate button
    const generateTempResumeBtn = document.getElementById('generateTempResumeBtn');
    
    // Load templates on page load
    loadResumeTemplates();
    loadCoverLetterTemplates();
    
    // Bind events for resume and cover letter file uploads
    if (resumeFileInput) {
        resumeFileInput.addEventListener('change', handleResumeUpload);
    }
    
    if (coverLetterFileInput) {
        coverLetterFileInput.addEventListener('change', handleCoverLetterUpload);
    }
    
    // Add event listeners to resume options
    if (freeWriteOption) {
        freeWriteOption.addEventListener('click', function() {
            if (resumeEditorSection) {
                resumeEditorSection.style.display = 'block';
                resumeParserSection.style.display = 'none';
                // Initialize empty editor for free writing
                initializeResumeEditor();
            }
        });
    }
    
    if (uploadResumeOption) {
        uploadResumeOption.addEventListener('click', function() {
            if (resumeFileInput) {
                resumeFileInput.click();
            }
        });
    }
    
    if (aiGeneratorOption) {
        aiGeneratorOption.addEventListener('click', function() {
            handleAIResumeGeneration();
        });
    }
    
    if (createResumeBtn) {
        createResumeBtn.addEventListener('click', function() {
            if (resumeEditorSection) {
                resumeEditorSection.style.display = 'block';
                // Initialize empty editor for free writing
                initializeResumeEditor();
            }
        });
    }
    
    // Add event listener for generate temp resume button
    if (generateTempResumeBtn) {
        generateTempResumeBtn.addEventListener('click', handleGenerateTempResume);
    }
    
    // Tab navigation
    if (resumeTabBtn && coverLetterTabBtn) {
        resumeTabBtn.addEventListener('click', function() {
            resumeTabBtn.classList.add('active');
            coverLetterTabBtn.classList.remove('active');
            resumeTabContent.classList.add('active');
            coverLetterTabContent.classList.remove('active');
        });
        
        coverLetterTabBtn.addEventListener('click', function() {
            coverLetterTabBtn.classList.add('active');
            resumeTabBtn.classList.remove('active');
            coverLetterTabContent.classList.add('active');
            resumeTabContent.classList.remove('active');
        });
    }
    
    // Add click handlers for other buttons that may appear
    document.addEventListener('click', function(event) {
        // Resume editor buttons
        if (event.target.matches('#addExperienceBtn')) {
            addExperienceField();
        } else if (event.target.matches('#addEducationBtn')) {
            addEducationField();
        } else if (event.target.matches('#addSkillBtn') || event.target.matches('#skillInput') && event.key === 'Enter') {
            addSkill();
        } else if (event.target.matches('#saveResumeBtn')) {
            saveResume();
        } else if (event.target.matches('#cancelEditBtn')) {
            cancelEdit();
        } else if (event.target.matches('#reuploadResumeBtn')) {
            if (resumeFileInput) {
                resumeFileInput.click();
            }
        } else if (event.target.matches('#editParsedResumeBtn')) {
            convertParsedToEditor();
        }
        // Previous buttons
        else if (event.target.matches('#improveResumeBtn')) {
            handleImproveResume();
        } else if (event.target.matches('#downloadImprovedResumeBtn')) {
            handleDownloadImprovedResume(event.target.dataset.filename);
        } else if (event.target.matches('#improveCoverLetterBtn')) {
            handleImproveCoverLetter();
        } else if (event.target.matches('#downloadImprovedCoverLetterBtn')) {
            handleDownloadImprovedCoverLetter(event.target.dataset.filename);
        }
        // Resume list buttons
        else if (event.target.closest('.resume-download-btn')) {
            const filename = event.target.closest('.resume-download-btn').dataset.filename;
            if (filename) {
                downloadResume(filename);
            }
        } else if (event.target.closest('.resume-edit-btn')) {
            const resumeId = event.target.closest('.resume-edit-btn').dataset.id;
            if (resumeId) {
                editResume(resumeId);
            }
        } else if (event.target.closest('.resume-delete-btn')) {
            const resumeId = event.target.closest('.resume-delete-btn').dataset.id;
            if (resumeId) {
                deleteResume(resumeId);
            }
        }
        // Template preview click handlers
        else if (event.target.closest('.template-preview-item')) {
            const templateItem = event.target.closest('.template-preview-item');
            const templateType = templateItem.dataset.type;
            const templateId = templateItem.dataset.id;
            const templateFilename = templateItem.dataset.filename;
            
            // Select this template
            selectTemplate(templateType, templateId, templateFilename);
        }
        // Resume preview click
        else if (event.target.closest('.resume-preview-btn')) {
            const filename = event.target.closest('.resume-preview-btn').dataset.filename;
            if (filename) {
                previewResume(filename);
            }
        }
        // Template selector click
        else if (event.target.matches('#showResumeTemplatesBtn')) {
            showTemplateSelector('resume');
        }
        else if (event.target.matches('#showCoverTemplatesBtn')) {
            showTemplateSelector('cover');
        }
        // Close template selector
        else if (event.target.matches('#closeTemplateSelector')) {
            hideTemplateSelector();
        }
        // Generate temp resume button (in case the listener above doesn't catch it)
        else if (event.target.matches('#generateTempResumeBtn')) {
            handleGenerateTempResume();
        }
    });
    
    // Load experiences on page load
    loadExperiences();
    
    /**
     * Handle resume file upload
     * @param {Event} event - The change event from file input
     */
    async function handleResumeUpload(event) {
        try {
            if (!event.target.files || !event.target.files[0]) {
                return;
            }
            
            const file = event.target.files[0];
            
            // Check if AI enhancement is enabled
            const useAI = document.getElementById('useAI')?.checked || false;
            
            // Show parsing UI
            if (resumeParserSection) {
                resumeParserSection.style.display = 'block';
            }
            
            if (parsedResumeContainer) {
                parsedResumeContainer.style.display = 'none';
            }
            
            // Show progress indicator
            let progress = 0;
            const interval = setInterval(function() {
                progress += 5;
                if (parserProgressBar) {
                    parserProgressBar.style.width = progress + '%';
                }
                
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 150);
            
            if (parserStatusText) {
                parserStatusText.textContent = useAI ? 
                    'Uploading and processing your resume with AI...' : 
                    'Uploading and processing your resume...';
            }
            
            // Check if it's an image file
            const isImage = file.type.startsWith('image/');
            if (isImage && parserStatusText) {
                parserStatusText.textContent = 'Uploading and analyzing your resume image with AI...';
            }
            
            // Send to backend for parsing
            const response = await window.JobHatch.resumeService.uploadResume(file, useAI);
            
            // Update UI with response
            if (parserStatusText) {
                parserStatusText.textContent = 'Resume parsed successfully!';
            }
            
            if (parsedResumeContainer) {
                parsedResumeContainer.style.display = 'block';
            }
            
            // Display parsed experiences
            displayParsedExperiences(response.experiences, response.added_experiences);
            
            // If personal info was returned, fill in the resume form
            if (response.personal_info && Object.keys(response.personal_info).length > 0) {
                populatePersonalInfo(response.personal_info);
            }
            
            // If summary was returned, fill in the summary field
            if (response.summary) {
                populateSummary(response.summary);
            }
            
            // Show a toast notification
            showToast('Resume uploaded and parsed successfully!', 'success');
            
            // Also add this resume to the list of user's resumes
            addResumeToList({
                id: new Date().getTime(),
                title: `Resume - ${file.name}`,
                filename: response.filename,
                date: new Date().toLocaleDateString(),
                ai_enhanced: useAI
            });
            
        } catch (error) {
            console.error('Error handling resume upload:', error);
            
            if (parserStatusText) {
                parserStatusText.textContent = 'Error parsing resume. Please try again.';
            }
            
            showToast('Error parsing resume. Please try a different file.', 'error');
        }
    }
    
    /**
     * Populate personal information form fields with data from backend
     * @param {Object} personalInfo - Personal information object from backend
     */
    function populatePersonalInfo(personalInfo) {
        console.log('Populating personal info:', personalInfo);
        
        const fieldMappings = {
            'name': 'resumeName',
            'email': 'resumeEmail',
            'phone': 'resumePhone',
            'location': 'resumeLocation',
            'title': 'resumeTitle'
        };
        
        // For each field in the personal info, find the corresponding form field and populate it
        for (const [backendField, formField] of Object.entries(fieldMappings)) {
            if (personalInfo[backendField]) {
                const field = document.getElementById(formField);
                if (field) {
                    field.value = personalInfo[backendField];
                }
            }
        }
    }
    
    /**
     * Populate the summary field with data from backend
     * @param {string} summary - Summary text from backend
     */
    function populateSummary(summary) {
        console.log('Populating summary:', summary);
        
        const summaryField = document.getElementById('resumeSummary');
        if (summaryField) {
            summaryField.value = summary;
        }
    }
    
    /**
     * Handle cover letter file upload
     * @param {Event} event - The change event from file input
     */
    async function handleCoverLetterUpload(event) {
        try {
            if (!event.target.files || !event.target.files[0]) {
                return;
            }
            
            const file = event.target.files[0];
            
            // Show loading indicator
            showToast('Uploading and parsing cover letter...', 'info');
            
            // Send to backend for parsing
            const response = await window.JobHatch.resumeService.uploadCoverLetter(file);
            
            // Open cover letter editor with parsed content
            if (coverLetterEditor) {
                coverLetterEditor.style.display = 'block';
                
                // Populate the cover letter form with parsed content
                const contentField = document.getElementById('coverLetterBody');
                if (contentField) {
                    contentField.value = response.content;
                }
            }
            
            // Show success toast
            showToast('Cover letter uploaded and parsed successfully!', 'success');
            
        } catch (error) {
            console.error('Error handling cover letter upload:', error);
            showToast('Error parsing cover letter. Please try a different file.', 'error');
        }
    }
    
    /**
     * Handle AI resume generation
     */
    async function handleAIResumeGeneration() {
        // Show AI resume generation UI
        if (resumeEditorSection) {
            resumeEditorSection.style.display = 'block';
            resumeParserSection.style.display = 'none';
            
            // Initialize empty editor for AI writing
            initializeResumeEditor();
            
            // Check the AI enhancement checkbox
            const aiCheckbox = document.getElementById('enhanceWithAI');
            if (aiCheckbox) {
                aiCheckbox.checked = true;
            }
            
            // Show a message about AI enhancement
            showToast('Fill in your resume details and we\'ll enhance it with AI!', 'info');
        }
    }
    
    /**
     * Display parsed experiences in the UI
     * @param {Array} experiences - All user experiences
     * @param {Array} newExperiences - Newly added experiences
     */
    function displayParsedExperiences(experiences, newExperiences = []) {
        if (!parsedExperiencesList) return;
        
        parsedExperiencesList.innerHTML = '';
        
        // First check if we have experiences
        if (!experiences || experiences.length === 0) {
            parsedExperiencesList.innerHTML = '<p>No experiences found in your resume. Please try a different file.</p>';
            return;
        }
        
        // Map of experience IDs that are new
        const newExpIds = new Set();
        if (newExperiences) {
        newExperiences.forEach(exp => newExpIds.add(exp.id));
        }
        
        // Create a work experience section
        const experiencesSection = document.createElement('div');
        experiencesSection.className = 'parsed-section';
        
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = 'Work Experience';
        experiencesSection.appendChild(sectionTitle);
        
        // Add each experience
        experiences.forEach(exp => {
            const expItem = document.createElement('div');
            expItem.className = 'parsed-item';
            
            // Add a "new" badge if this is a newly added experience
            const isNew = newExpIds.has(exp.id);
            
            const company = exp.company || 'Unknown Company';
            const title = exp.title || 'Unknown Position';
            const startDate = exp.startDate || exp.start_date || 'Unknown';
            const endDate = exp.endDate || exp.end_date || 'Present';
            const description = exp.description || exp.responsibilities || '';
            
            expItem.innerHTML = `
                <div class="parsed-item-header">
                    <h4>${title} at ${company} ${isNew ? '<span class="badge badge-success">New</span>' : ''}</h4>
                    <span class="parsed-item-date">${startDate} - ${endDate}</span>
                </div>
                <p>${description}</p>
            `;
            
            experiencesSection.appendChild(expItem);
        });
        
        parsedExperiencesList.appendChild(experiencesSection);
        
        // Add buttons for next actions
        const actionBtns = document.createElement('div');
        actionBtns.className = 'parser-actions';
        actionBtns.innerHTML = `
            <button class="btn btn-outline" id="reuploadResumeBtn">
                <i class="fas fa-sync-alt"></i> Reupload Resume
            </button>
            <button class="btn btn-outline" id="editParsedResumeBtn">
                <i class="fas fa-edit"></i> Edit Resume
            </button>
            <button class="btn btn-primary" id="improveResumeBtn">
                <i class="fas fa-magic"></i> Improve Resume with AI
            </button>
        `;
        
        parsedExperiencesList.appendChild(actionBtns);
    }
    
    /**
     * Handle the "Improve Resume" button click
     */
    async function handleImproveResume() {
        try {
            // Show loading toast
            showToast('Generating an improved resume with AI...', 'info');
            
            // Get selected template if any
            const selectedTemplateId = document.body.dataset.selectedResumeTemplate || null;
            
            // Send request to backend
            const response = await window.JobHatch.resumeService.generateImprovedResume(selectedTemplateId);
            
            // Display success and show download button
            if (parsedExperiencesList) {
                // Add suggestions section
                const suggestionsSection = document.createElement('div');
                suggestionsSection.className = 'parsed-section improvement-section';
                
                const suggestionTitle = document.createElement('h3');
                suggestionTitle.textContent = 'AI Improvement Suggestions';
                suggestionsSection.appendChild(suggestionTitle);
                
                // Add each suggestion
                if (response.suggestions && response.suggestions.length > 0) {
                    response.suggestions.forEach(suggestion => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.className = 'parsed-item';
                        suggestionItem.innerHTML = `
                            <div class="parsed-item-header">
                                <h4>${suggestion.title}</h4>
                            </div>
                            <p>${suggestion.description}</p>
                        `;
                        suggestionsSection.appendChild(suggestionItem);
                    });
                }
                
                parsedExperiencesList.appendChild(suggestionsSection);
                
                // Add download and preview buttons
                const actionBtns = document.createElement('div');
                actionBtns.className = 'parser-actions';
                actionBtns.innerHTML = `
                    <button class="btn btn-outline resume-preview-btn" data-filename="${response.filename}">
                        <i class="fas fa-eye"></i> Preview Resume
                    </button>
                    <button class="btn btn-primary" id="downloadImprovedResumeBtn" data-filename="${response.filename}">
                        <i class="fas fa-download"></i> Download Improved Resume
                    </button>
                `;
                
                parsedExperiencesList.appendChild(actionBtns);
                
                // Add to the resume list
                addResumeToList({
                    id: new Date().getTime(),
                    title: 'AI-Improved Resume',
                    filename: response.filename,
                    date: new Date().toLocaleDateString(),
                    isAIGenerated: true,
                    templateId: response.template_id
                });
            }
            
            showToast('Resume improved successfully!', 'success');
            
        } catch (error) {
            console.error('Error improving resume:', error);
            showToast('Error improving resume. Please try again later.', 'error');
        }
    }
    
    /**
     * Handle downloading an improved resume
     * @param {string} filename - The filename of the resume to download
     */
    function handleDownloadImprovedResume(filename) {
        if (!filename) {
            showToast('No filename provided for download', 'error');
            return;
        }
        
        const downloadUrl = window.JobHatch.resumeService.getResumeDownloadUrl(filename);
        
        // Create a temporary link element and trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Downloading your improved resume...', 'success');
    }
    
    /**
     * Download a resume by filename
     * @param {string} filename - The filename of the resume to download
     */
    function downloadResume(filename) {
        handleDownloadImprovedResume(filename);
    }
    
    /**
     * Edit an existing resume
     * @param {string} resumeId - The ID of the resume to edit
     */
    function editResume(resumeId) {
        // In a real implementation, we would load the specific resume data
        // For now, just load all experiences and show the editor
        convertParsedToEditor();
    }
    
    /**
     * Delete a resume
     * @param {string} resumeId - The ID of the resume to delete
     */
    function deleteResume(resumeId) {
        const resumeItem = document.querySelector(`.resume-item[data-id="${resumeId}"]`);
        if (resumeItem && resumesList) {
            resumesList.removeChild(resumeItem);
            
            // Check if there are no more resumes
            if (resumesList.children.length === 0) {
                if (noResumesState) {
                    noResumesState.style.display = 'block';
                }
                
                if (resumesList) {
                    resumesList.style.display = 'none';
                }
            }
            
            showToast('Resume deleted successfully', 'success');
        }
    }
    
    /**
     * Load experiences from backend
     */
    async function loadExperiences() {
        try {
            const response = await window.JobHatch.resumeService.getExperiences();
            
            // We'll use the experience endpoint to store resume list data as well
            const experiences = response.experiences || [];
            
            // Check if we have saved resumes
            const savedResumes = experiences.filter(exp => exp.is_resume_entry);
            
            if (savedResumes.length > 0) {
                // We have saved resumes, populate the list
                if (noResumesState) {
                    noResumesState.style.display = 'none';
                }
                
                if (resumesList) {
                    resumesList.style.display = 'block';
                    
                    // Clear existing items
                    resumesList.innerHTML = '';
                    
                    // Add each resume
                    savedResumes.forEach(resume => {
                        addResumeToList(resume);
                    });
                }
            }
        } catch (error) {
            console.error('Error loading experiences:', error);
        }
    }
    
    /**
     * Add a resume to the list of user's resumes
     * @param {Object} resume - The resume object with details
     */
    function addResumeToList(resume) {
        if (!resumesList) return;
        
        // Show the list and hide the empty state
        if (noResumesState) {
            noResumesState.style.display = 'none';
        }
        
        resumesList.style.display = 'grid';
            
            // Create resume item
            const resumeItem = document.createElement('div');
            resumeItem.className = 'resume-item';
        resumeItem.dataset.id = resume.id;
        
        // Add the AI enhanced class if this resume was enhanced with AI
        if (resume.ai_enhanced) {
            resumeItem.classList.add('ai-enhanced');
        }
        
        // Add the templated class if this resume used a template
        if (resume.template_id) {
            resumeItem.classList.add('templated');
        }
        
        // Create resume header with icons
        const resumeHeader = document.createElement('div');
        resumeHeader.className = 'resume-header';
        
        // Document icon (different based on if AI generated)
        const resumeIcon = document.createElement('i');
        if (resume.ai_enhanced) {
            resumeIcon.className = 'fas fa-file-medical text-primary';
        } else if (resume.template_id) {
            resumeIcon.className = 'fas fa-file-alt text-info';
        } else {
            resumeIcon.className = 'fas fa-file-alt';
        }
        resumeHeader.appendChild(resumeIcon);
        
        // Resume info
        const resumeInfo = document.createElement('div');
        resumeInfo.className = 'resume-info';
        
        // Resume title with tag if AI generated
        const resumeTitle = document.createElement('h3');
        resumeTitle.textContent = resume.title;
        
        resumeInfo.appendChild(resumeTitle);
        
        // Resume date
        const resumeDate = document.createElement('p');
        resumeDate.textContent = resume.date;
        resumeInfo.appendChild(resumeDate);
        
        // Add the info section to the header
        resumeHeader.appendChild(resumeInfo);
        
        // Resume actions
        const resumeActions = document.createElement('div');
        resumeActions.className = 'resume-actions';
        
        // Preview button
        const previewBtn = document.createElement('button');
        previewBtn.innerHTML = '<i class="fas fa-eye"></i>';
        previewBtn.className = 'action-btn preview-btn';
        previewBtn.title = 'Preview Resume';
        previewBtn.addEventListener('click', function() {
            previewResume(resume.id);
        });
        resumeActions.appendChild(previewBtn);
        
        // Download button
        const downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
        downloadBtn.className = 'action-btn download-btn';
        downloadBtn.title = 'Download Resume';
        downloadBtn.addEventListener('click', function() {
            downloadResume(resume.filename);
        });
        resumeActions.appendChild(downloadBtn);
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.className = 'action-btn edit-btn';
        editBtn.title = 'Edit Resume';
        editBtn.addEventListener('click', function() {
            editResume(resume.id);
        });
        resumeActions.appendChild(editBtn);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.title = 'Delete Resume';
        deleteBtn.addEventListener('click', function() {
            deleteResume(resume.id);
        });
        resumeActions.appendChild(deleteBtn);
        
        resumeHeader.appendChild(resumeActions);
        resumeItem.appendChild(resumeHeader);
        
        // Add the resume item to the list
        resumesList.appendChild(resumeItem);
    }
    
    /**
     * Helper function to show toast notifications
     * @param {string} message - The message to display
     * @param {string} type - The type of toast (success, error, info, warning)
     */
    function showToast(message, type = 'success') {
        // Check if the toast container exists, create it if not
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${
                    type === 'success' ? 'check-circle' : 
                    type === 'error' ? 'exclamation-circle' : 
                    type === 'warning' ? 'exclamation-triangle' : 
                    'info-circle'
                }"></i>
            </div>
            <div class="toast-content">
                <p>${message}</p>
            </div>
            <button class="toast-close-btn">
                <i class="fas fa-times"></i>
                    </button>
                `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Add close functionality
        const closeBtn = toast.querySelector('.toast-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                toastContainer.removeChild(toast);
            });
        }
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            if (toast.parentNode === toastContainer) {
                toastContainer.removeChild(toast);
            }
        }, 5000);
    }
    
    /**
     * Initialize resume editor with empty fields
     */
    function initializeResumeEditor() {
        // Clear existing fields
        if (experiencesList) {
            experiencesList.innerHTML = '';
        }
        
        if (educationList) {
            educationList.innerHTML = '';
        }
        
        if (skillsList) {
            skillsList.innerHTML = '';
        }
        
        // Add one empty experience and education field
        addExperienceField();
        addEducationField();
        
        // Clear personal info fields
        const personalInfoFields = ['resumeName', 'resumeTitle', 'resumeEmail', 'resumePhone', 'resumeLocation', 'resumeSummary'];
        personalInfoFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
            }
        });
    }
    
    /**
     * Convert parsed resume to editor format
     */
    function convertParsedToEditor() {
        if (resumeParserSection && resumeEditorSection) {
            resumeParserSection.style.display = 'none';
            resumeEditorSection.style.display = 'block';
            
            // Initialize with empty fields first
            initializeResumeEditor();
            
            // Then load the data from the parsed resume
            window.JobHatch.resumeService.getExperiences()
                .then(response => {
                    loadResumeIntoEditor(response.experiences);
                })
                .catch(error => {
                    console.error('Error loading experiences:', error);
                });
        }
    }
    
    /**
     * Load experiences into the resume editor
     * @param {Array} experiences - List of experiences to load
     */
    function loadResumeIntoEditor(experiences) {
        if (!experiences || !experiencesList) {
            return;
        }
        
        // Clear existing fields
        experiencesList.innerHTML = '';
        
        // Add each experience
        experiences.forEach(exp => {
            addExperienceField(exp);
        });
        
        // If no experiences were added, add an empty one
        if (experiences.length === 0) {
            addExperienceField();
        }
    }
    
    /**
     * Add an experience field to the resume editor
     * @param {Object} experience - Optional experience data to populate the field
     */
    function addExperienceField(experience = null) {
        if (!experiencesList) return;
        
        const expId = `exp-${Date.now()}`;
        const expItem = document.createElement('div');
        expItem.className = 'experience-item';
        expItem.dataset.id = expId;
        
        // Prepare values from experience if available
        const companyValue = experience ? (experience.company || '') : '';
        const titleValue = experience ? (experience.title || '') : '';
        const startDateValue = experience ? (experience.start_date || experience.startDate || '') : '';
        const endDateValue = experience ? (experience.end_date || experience.endDate || '') : '';
        const descriptionValue = experience ? (
            experience.description || 
            experience.responsibilities || 
            (Array.isArray(experience.bullet_points) ? experience.bullet_points.join('\n') : experience.bullet_points) || 
            ''
        ) : '';
        
        expItem.innerHTML = `
            <div class="experience-header">
                <h4>Work Experience</h4>
                <button type="button" class="remove-btn" data-id="${expId}">
                    <i class="fas fa-times"></i>
                </button>
                </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="${expId}-company">Company</label>
                    <input type="text" id="${expId}-company" name="company" value="${companyValue}" placeholder="e.g. Acme Inc.">
                </div>
                <div class="form-group">
                    <label for="${expId}-title">Job Title</label>
                    <input type="text" id="${expId}-title" name="title" value="${titleValue}" placeholder="e.g. Software Engineer">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="${expId}-start">Start Date</label>
                    <input type="text" id="${expId}-start" name="start_date" value="${startDateValue}" placeholder="e.g. June 2020">
                </div>
                <div class="form-group">
                    <label for="${expId}-end">End Date</label>
                    <input type="text" id="${expId}-end" name="end_date" value="${endDateValue}" placeholder="e.g. Present">
                </div>
            </div>
            <div class="form-group">
                <label for="${expId}-description">Responsibilities/Achievements</label>
                <textarea id="${expId}-description" name="description" rows="4" placeholder="Describe your responsibilities and achievements...">${descriptionValue}</textarea>
            </div>
        `;
        
        experiencesList.appendChild(expItem);
        
        // Add event listener to remove button
        const removeBtn = expItem.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                experiencesList.removeChild(expItem);
            });
        }
    }
    
    /**
     * Add an education field to the resume editor
     * @param {Object} education - Optional education data to populate the field
     */
    function addEducationField(education = null) {
        if (!educationList) return;
        
        const eduId = `edu-${Date.now()}`;
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.dataset.id = eduId;
        
        // Prepare values from education if available
        const schoolValue = education ? (education.school || '') : '';
        const degreeValue = education ? (education.degree || '') : '';
        const fieldValue = education ? (education.field || '') : '';
        const startDateValue = education ? (education.start_date || '') : '';
        const endDateValue = education ? (education.end_date || '') : '';
        
        eduItem.innerHTML = `
            <div class="education-header">
                <h4>Education</h4>
                <button type="button" class="remove-btn" data-id="${eduId}">
                    <i class="fas fa-times"></i>
                    </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="${eduId}-school">School/University</label>
                    <input type="text" id="${eduId}-school" name="school" value="${schoolValue}" placeholder="e.g. University of California, Berkeley">
                </div>
                <div class="form-group">
                    <label for="${eduId}-degree">Degree</label>
                    <input type="text" id="${eduId}-degree" name="degree" value="${degreeValue}" placeholder="e.g. Bachelor of Science">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="${eduId}-field">Field of Study</label>
                    <input type="text" id="${eduId}-field" name="field" value="${fieldValue}" placeholder="e.g. Computer Science">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="${eduId}-start">Start Date</label>
                    <input type="text" id="${eduId}-start" name="start_date" value="${startDateValue}" placeholder="e.g. August 2016">
                </div>
                <div class="form-group">
                    <label for="${eduId}-end">End Date</label>
                    <input type="text" id="${eduId}-end" name="end_date" value="${endDateValue}" placeholder="e.g. May 2020">
                </div>
                </div>
            `;
            
        educationList.appendChild(eduItem);
        
        // Add event listener to remove button
        const removeBtn = eduItem.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                educationList.removeChild(eduItem);
            });
        }
    }
    
    /**
     * Add a skill to the skills list
     */
    function addSkill() {
        const skillInput = document.getElementById('skillInput');
        if (!skillInput || !skillsList) return;
        
        const skillValue = skillInput.value.trim();
        if (!skillValue) return;
        
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            <span>${skillValue}</span>
            <button type="button" class="remove-skill-btn">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        skillsList.appendChild(skillTag);
        
        // Add event listener to remove button
        const removeBtn = skillTag.querySelector('.remove-skill-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                skillsList.removeChild(skillTag);
            });
        }
        
        // Clear input
        skillInput.value = '';
    }
    
    /**
     * Save the resume to backend
     */
    async function saveResume() {
        try {
            // Check if AI enhancement is enabled
            const useAI = document.getElementById('enhanceWithAI')?.checked || false;
            
            // Collect all form data
            const resumeData = {
                personal_info: {
                    name: document.getElementById('resumeName')?.value || '',
                    title: document.getElementById('resumeTitle')?.value || '',
                    email: document.getElementById('resumeEmail')?.value || '',
                    phone: document.getElementById('resumePhone')?.value || '',
                    location: document.getElementById('resumeLocation')?.value || '',
                },
                summary: document.getElementById('resumeSummary')?.value || '',
                experience: [],
                education: [],
                skills: []
            };
            
            // Collect experiences
            const experienceItems = document.querySelectorAll('.experience-item');
            experienceItems.forEach(item => {
                const id = item.dataset.id;
                
                resumeData.experience.push({
                    company: document.getElementById(`${id}-company`)?.value || '',
                    title: document.getElementById(`${id}-title`)?.value || '',
                    startDate: document.getElementById(`${id}-start`)?.value || '',
                    endDate: document.getElementById(`${id}-end`)?.value || '',
                    description: document.getElementById(`${id}-description`)?.value || ''
                });
            });
            
            // Collect education
            const educationItems = document.querySelectorAll('.education-item');
            educationItems.forEach(item => {
                const id = item.dataset.id;
                
                resumeData.education.push({
                    institution: document.getElementById(`${id}-school`)?.value || '',
                    degree: document.getElementById(`${id}-degree`)?.value || '',
                    field: document.getElementById(`${id}-field`)?.value || '',
                    date: document.getElementById(`${id}-year`)?.value || ''
                });
            });
            
            // Collect skills
            const skillTags = document.querySelectorAll('.skill-tag span');
            skillTags.forEach(tag => {
                resumeData.skills.push(tag.textContent);
            });
            
            let enhancedResumeData = resumeData;
            
            // Show loading indicator if using AI
            if (useAI) {
                showToast('Enhancing your resume with AI...', 'info');
                
                // Enhance resume with AI
                try {
                    const response = await window.JobHatch.resumeService.enhanceResumeWithAI(resumeData);
                    enhancedResumeData = response.enhanced_resume;
                    showToast('Resume enhanced with AI!', 'success');
                } catch (error) {
                    console.error('Error enhancing resume with AI:', error);
                    showToast('Error enhancing resume with AI. Using original content.', 'warning');
                }
            }
            
            // Get selected template
            const templateId = document.querySelector('.template-preview-item.selected')?.dataset.id;
            
            // Generate a resume with the template and enhanced data
            const generatedResume = await window.JobHatch.resumeService.generateImprovedResume(
                enhancedResumeData, 
                templateId,
                false // Don't use AI again since we already enhanced if needed
            );
            
            // Add to the resume list
            addResumeToList({
                id: new Date().getTime(),
                title: resumeData.personal_info.name ? 
                       `${resumeData.personal_info.name}'s Resume` : 
                       'My Resume',
                filename: generatedResume.pdf_url.split('/').pop(),
                date: new Date().toLocaleDateString(),
                ai_enhanced: useAI,
                template_id: templateId
            });
            
            // Hide the editor
            if (resumeEditorSection) {
                resumeEditorSection.style.display = 'none';
            }
            
            // Show success message
            showToast('Resume saved successfully!', 'success');
            
        } catch (error) {
            console.error('Error saving resume:', error);
            showToast('Error saving resume. Please try again.', 'error');
        }
    }
    
    /**
     * Cancel resume editing
     */
    function cancelEdit() {
        if (resumeEditorSection) {
            resumeEditorSection.style.display = 'none';
        }
        
        if (resumeParserSection) {
            resumeParserSection.style.display = 'none';
        }
    }
    
    /**
     * Load resume templates from backend
     */
    async function loadResumeTemplates() {
        try {
            const response = await window.JobHatch.resumeService.getResumeTemplates();
            
            if (response.templates && response.templates.length > 0) {
                // Populate template selector if it exists
                if (resumeTemplatesContainer) {
                    populateTemplateSelector(resumeTemplatesContainer, response.templates, 'resume');
                }
                
                // Also populate the dropdown if it exists
                if (resumeTemplateSelector) {
                    populateTemplateDropdown(resumeTemplateSelector, response.templates);
                }
            }
        } catch (error) {
            console.error('Error loading resume templates:', error);
        }
    }
    
    /**
     * Load cover letter templates from backend
     */
    async function loadCoverLetterTemplates() {
        try {
            const response = await window.JobHatch.resumeService.getCoverLetterTemplates();
            
            if (response.templates && response.templates.length > 0) {
                // Populate template selector if it exists
                if (coverTemplatesContainer) {
                    populateTemplateSelector(coverTemplatesContainer, response.templates, 'cover');
                }
                
                // Also populate the dropdown if it exists
                if (coverLetterTemplateSelector) {
                    populateTemplateDropdown(coverLetterTemplateSelector, response.templates);
                }
            }
        } catch (error) {
            console.error('Error loading cover letter templates:', error);
        }
    }
    
    /**
     * Populate template selector with templates
     * @param {HTMLElement} container - The container element to populate
     * @param {Array} templates - Array of template objects
     * @param {string} type - Type of templates (resume/cover)
     */
    function populateTemplateSelector(container, templates, type) {
        if (!container) return;
        
        // Clear existing templates
        container.innerHTML = '';
        
        // Add each template
        templates.forEach(template => {
            const templateItem = document.createElement('div');
            templateItem.className = 'template-preview-item';
            templateItem.dataset.id = template.id;
            templateItem.dataset.type = type;
            templateItem.dataset.filename = template.filename;
            
            // Create template preview
            const previewUrl = template.preview_url || window.JobHatch.resumeService.getTemplatePreviewUrl(type, template.filename.replace('.docx', '.png'));
            
            templateItem.innerHTML = `
                <div class="template-preview-image">
                    <img src="${previewUrl}" alt="${template.name}" 
                        onerror="this.onerror=null; this.src='/static/previews/${type}/${template.id}.png'; this.classList.add('fallback-image');">
                </div>
                <div class="template-preview-info">
                    <h4>${template.name}</h4>
                    <button class="btn btn-sm btn-outline select-template-btn">
                        <i class="fas fa-check"></i> Select
                    </button>
                </div>
            `;
            
            container.appendChild(templateItem);
        });
    }
    
    /**
     * Populate template dropdown with templates
     * @param {HTMLElement} dropdown - The dropdown element to populate
     * @param {Array} templates - Array of template objects
     */
    function populateTemplateDropdown(dropdown, templates) {
        if (!dropdown) return;
        
        // Clear existing options
        dropdown.innerHTML = '<option value="">-- Select Template --</option>';
        
        // Add each template as an option
        templates.forEach(template => {
            const option = document.createElement('option');
            option.value = template.id;
            option.textContent = template.name;
            dropdown.appendChild(option);
        });
        
        // Add change event listener
        dropdown.addEventListener('change', function() {
            // When template is selected from dropdown, update UI
            const selectedTemplateId = this.value;
            if (selectedTemplateId) {
                // Find corresponding template
                const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
                if (selectedTemplate) {
                    updateTemplatePreview(dropdown.id === 'resumeTemplateSelector' ? 'resume' : 'cover', 
                                        selectedTemplate.id, selectedTemplate.filename);
                }
            }
        });
    }
    
    /**
     * Show template selector modal
     * @param {string} type - Type of templates to show (resume/cover)
     */
    function showTemplateSelector(type) {
        const selectorContainer = document.getElementById('templateSelectorModal');
        if (!selectorContainer) return;
        
        // Set modal title based on type
        const modalTitle = selectorContainer.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = type === 'resume' ? 'Select Resume Template' : 'Select Cover Letter Template';
        }
        
        // Show the correct templates container
        if (resumeTemplatesContainer) {
            resumeTemplatesContainer.style.display = type === 'resume' ? 'grid' : 'none';
        }
        
        if (coverTemplatesContainer) {
            coverTemplatesContainer.style.display = type === 'cover' ? 'grid' : 'none';
        }
        
        // Store the template type in the modal
        selectorContainer.dataset.type = type;
        
        // Show the modal
        selectorContainer.style.display = 'block';
        document.body.classList.add('modal-open');
    }
    
    /**
     * Hide template selector modal
     */
    function hideTemplateSelector() {
        const selectorContainer = document.getElementById('templateSelectorModal');
        if (!selectorContainer) return;
        
        // Hide the modal
        selectorContainer.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
    
    /**
     * Select a template
     * @param {string} type - Type of template (resume/cover)
     * @param {string} templateId - ID of selected template
     * @param {string} filename - Filename of the template
     */
    function selectTemplate(type, templateId, filename) {
        // Set the selected template in the dropdown
        const dropdown = type === 'resume' ? resumeTemplateSelector : coverLetterTemplateSelector;
        if (dropdown) {
            dropdown.value = templateId;
        }
        
        // Update preview
        updateTemplatePreview(type, templateId, filename);
        
        // Hide template selector
        hideTemplateSelector();
        
        // Show toast
        showToast(`${type === 'resume' ? 'Resume' : 'Cover Letter'} template selected`, 'success');
    }
    
    /**
     * Update template preview
     * @param {string} type - Type of template (resume/cover)
     * @param {string} templateId - ID of selected template
     * @param {string} filename - Filename of the template
     */
    function updateTemplatePreview(type, templateId, filename) {
        // Store selected template ID
        document.body.dataset[`selected${type.charAt(0).toUpperCase() + type.slice(1)}Template`] = templateId;
        
        // Get template from cache if available
        let template = null;
        if (type === 'resume' && window.JobHatch.resumeTemplates) {
            template = window.JobHatch.resumeTemplates.find(t => t.id === templateId);
        } else if (type === 'cover' && window.JobHatch.coverTemplates) {
            template = window.JobHatch.coverTemplates.find(t => t.id === templateId);
        }
        
        // Update preview if container exists
        const previewContainer = type === 'resume' ? templatePreviewContainer : 
                                document.getElementById('coverTemplatePreviewContainer');
        
        if (previewContainer) {
            // Use the direct preview URL if available, otherwise construct it
            const previewUrl = template && template.preview_url ? 
                template.preview_url : 
                `/api/templates/preview/${type}/${templateId}.png`;
            
            const downloadUrl = window.JobHatch.resumeService.getTemplatePreviewUrl(type, filename);
            
            previewContainer.innerHTML = `
                <div class="template-preview-frame">
                    <img src="${previewUrl}" alt="${templateId}" class="template-preview-img"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="template-preview-fallback" style="display: none;">
                        <div class="preview-placeholder">
                            <i class="fas fa-file-alt"></i>
                            <p>${filename}</p>
                            <p class="preview-note">Preview not available, but template can be used.</p>
                </div>
                </div>
                </div>
                <div class="template-preview-actions">
                    <button class="btn btn-sm btn-primary" id="${type === 'resume' ? 'changeTemplateBtn' : 'changeCoverTemplateBtn'}">
                        <i class="fas fa-exchange-alt"></i> Change Template
                    </button>
                    ${type === 'resume' ?
                        `<button class="btn btn-sm btn-outline" id="downloadTemplateBtn" data-url="${downloadUrl}">
                            <i class="fas fa-download"></i> Download Template
                        </button>` : ''
                    }
                </div>
            `;
            
            // Add event listener to change template button
            const changeBtn = previewContainer.querySelector(`#${type === 'resume' ? 'changeTemplateBtn' : 'changeCoverTemplateBtn'}`);
            if (changeBtn) {
                changeBtn.addEventListener('click', function() {
                    showTemplateSelector(type);
                });
            }
            
            // Add event listener to download template button
            const downloadBtn = previewContainer.querySelector('#downloadTemplateBtn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function() {
                    const url = this.dataset.url;
                    if (url) {
                        window.open(url, '_blank');
                    }
                });
            }
        }
    }
    
    /**
     * Preview a resume
     * @param {string} filename - The filename of the resume to preview
     */
    function previewResume(filename) {
        if (!filename) {
            showToast('No filename provided for preview', 'error');
            return;
        }
        
        const previewUrl = window.JobHatch.resumeService.getResumeDownloadUrl(filename);
        
        // Create modal for preview
        const previewModal = document.createElement('div');
        previewModal.className = 'modal document-preview-modal';
        previewModal.style.display = 'flex'; // Ensure it's visible
        previewModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Document Preview</h2>
                    <button class="close-btn" id="closePreviewModal">&times;</button>
                </div>
                <div class="modal-body">
                    <iframe src="${previewUrl}" title="Document Preview" class="document-preview-iframe"></iframe>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" id="closePreviewBtn">Close</button>
                    <button class="btn btn-primary" id="downloadPreviewBtn" data-filename="${filename}">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(previewModal);
        
        // Add event listeners for modal buttons
        const closeBtn = previewModal.querySelector('#closePreviewModal');
        const closePreviewBtn = previewModal.querySelector('#closePreviewBtn');
        const downloadBtn = previewModal.querySelector('#downloadPreviewBtn');
        
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(previewModal);
        });
        
        closePreviewBtn.addEventListener('click', function() {
            document.body.removeChild(previewModal);
        });
        
                downloadBtn.addEventListener('click', function() {
            handleDownloadImprovedResume(filename);
            document.body.removeChild(previewModal);
        });
    }
    
    /**
     * Collect all resume data from the editor form
     * @returns {Object} The complete resume data object
     */
    function collectResumeData() {
        console.log('[DEBUG] Collecting resume form data');
        
        const resumeData = {
            personal_info: {
                name: document.getElementById('resumeName')?.value || '',
                title: document.getElementById('resumeTitle')?.value || '',
                email: document.getElementById('resumeEmail')?.value || '',
                phone: document.getElementById('resumePhone')?.value || '',
                location: document.getElementById('resumeLocation')?.value || ''
            },
            summary: document.getElementById('resumeSummary')?.value || '',
            experience: [],
            education: [],
            skills: []
        };
        
        // Get experience items
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach(item => {
            const id = item.dataset.id;
            if (!id) return;
            
            const company = document.getElementById(`${id}-company`)?.value || '';
            const title = document.getElementById(`${id}-title`)?.value || '';
            const startDate = document.getElementById(`${id}-start`)?.value || '';
            const endDate = document.getElementById(`${id}-end`)?.value || '';
            const description = document.getElementById(`${id}-description`)?.value || '';
            
            if (title || company || description) {
                resumeData.experience.push({
                    title,
                    company,
                    startDate,
                    endDate,
                    description
                });
            }
        });
        
        // Get education items
        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach(item => {
            const id = item.dataset.id;
            if (!id) return;
            
            const school = document.getElementById(`${id}-school`)?.value || '';
            const degree = document.getElementById(`${id}-degree`)?.value || '';
            const field = document.getElementById(`${id}-field`)?.value || '';
            const start = document.getElementById(`${id}-start`)?.value || '';
            const end = document.getElementById(`${id}-end`)?.value || '';
            
            if (school || degree || field) {
                resumeData.education.push({
                    institution: school,
                    degree,
                    field,
                    startDate: start,
                    endDate: end,
                    date: end || 'Present'
                });
            }
        });
        
        // Get skills
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            const skillText = tag.querySelector('span')?.textContent;
            if (skillText && !skillText.includes('×')) {
                resumeData.skills.push(skillText.trim());
            }
        });
        
        // Get template if selected
        const templateItem = document.querySelector('.template-preview-item.selected');
        if (templateItem) {
            resumeData.template = templateItem.dataset.filename;
            resumeData.templateId = templateItem.dataset.id;
        }
        
        // Check if AI enhancement is enabled
        const enhanceWithAI = document.getElementById('enhanceWithAI')?.checked || false;
        resumeData.enhance_with_ai = enhanceWithAI;
        
        console.log('[DEBUG] Collected resume data:', resumeData);
        return resumeData;
    }
    
    /**
     * Handle generating a temporary resume from current editor state
     */
    async function handleGenerateTempResume() {
        try {
            // Show loading state
            const generateBtn = document.getElementById('generateTempResumeBtn');
            const originalText = generateBtn.innerHTML;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            generateBtn.disabled = true;
            
            // Get current resume data from form
            const resumeData = collectResumeData();
            
            console.log('[DEBUG] Generating temporary resume with data:', resumeData);
            
            // Call the API to generate temp resume
            const response = await fetch('/api/resume/generate-temp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resumeData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to generate temporary resume');
            }
            
            const data = await response.json();
            console.log('[DEBUG] Generated temp resume:', data);
            
            // Show success message
            showToast('Resume generated successfully! You can find it in your resumes list.', 'success');
            
            // Add the temporary resume to the list
            const tempResume = {
                id: data.id || new Date().getTime(),
                title: `${resumeData.personal_info?.name || 'Untitled'} Resume`,
                filename: data.filename || data.pdf_filename,
                date: new Date().toLocaleDateString(),
                ai_enhanced: document.getElementById('enhanceWithAI')?.checked || false
            };
            
            addResumeToList(tempResume);
            
            // Show the resumes list if it was empty before
            if (noResumesState && resumesList) {
                noResumesState.style.display = 'none';
                resumesList.style.display = 'grid';
            }
            
            // Reset button state
            generateBtn.innerHTML = originalText;
            generateBtn.disabled = false;
            
        } catch (error) {
            console.error('[DEBUG] Error generating temp resume:', error);
            showToast('Failed to generate resume. Please try again.', 'error');
            
            // Reset button state
            const generateBtn = document.getElementById('generateTempResumeBtn');
            if (generateBtn) {
                generateBtn.innerHTML = '<i class="fas fa-file-download"></i> Generate Resume';
                generateBtn.disabled = false;
            }
        }
    }
}); 