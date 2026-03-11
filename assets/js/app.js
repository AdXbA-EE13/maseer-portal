/**
 * MASEER PORTAL - MAIN APPLICATION LOGIC
 * Form validation, GitHub API integration, file handling, and UI interactions
 */

(function() {
    'use strict';
    
    // Configuration - Will be injected at build time via window.GITHUB_CONFIG
    const CONFIG = {
        REPO_OWNER: window.GITHUB_CONFIG?.REPO_OWNER || 'AdXbA-EEI3',
        REPO_NAME: window.GITHUB_CONFIG?.REPO_NAME || 'maseer-portal',
        GITHUB_TOKEN: window.GITHUB_CONFIG?.GITHUB_TOKEN || '',
        FB_APP_ID: window.GITHUB_CONFIG?.FB_APP_ID || '',
        ISSUE_LABEL: 'client-registration',
        MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
        ALLOWED_FILE_TYPES: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
    };
    
    // State
    let currentStep = 1;
    const totalSteps = 4;
    let uploadedLogo = null;
    let isSubmitting = false;
    
    /**
     * Initialize application
     */
    function init() {
        setupFormNavigation();
        setupFileUpload();
        setupFormValidation();
        setupPhoneInput();
        setupFacebookLogin();
        setupCharacterCounters();
        
        console.log('[App] Maseer Portal initialized');
    }
    
    /**
     * Setup multi-step form navigation
     */
    function setupFormNavigation() {
        // Next step buttons
        document.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', function() {
                if (validateCurrentSection()) {
                    goToStep(currentStep + 1);
                }
            });
        });
        
        // Previous step buttons
        document.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', function() {
                goToStep(currentStep - 1);
            });
        });
        
        // Form submission
        const form = document.getElementById('registrationForm');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    }
    
    /**
     * Navigate to specific step
     * @param {number} step - Step number
     */
    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;
        
        // Hide current section
        const currentSection = document.querySelector(`.form-section[data-section="${currentStep}"]`);
        if (currentSection) {
            currentSection.classList.remove('active');
        }
        
        // Show new section
        const newSection = document.querySelector(`.form-section[data-section="${step}"]`);
        if (newSection) {
            newSection.classList.add('active');
            newSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Update progress
        currentStep = step;
        updateProgressIndicator();
        
        // Track step change
        if (window.Consciousness) {
            window.Consciousness.trackInteraction('step_change', { step: step });
        }
    }
    
    /**
     * Update progress indicator
     */
    function updateProgressIndicator() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('completed');
            }
        });
        
        document.querySelectorAll('.progress-line').forEach((line, index) => {
            line.classList.toggle('completed', index < currentStep - 1);
        });
    }
    
    /**
     * Validate current section
     * @returns {boolean} True if valid
     */
    function validateCurrentSection() {
        const section = document.querySelector(`.form-section[data-section="${currentStep}"]`);
        if (!section) return true;
        
        const requiredFields = section.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
                field.focus();
            }
        });
        
        return isValid;
    }
    
    /**
     * Validate a single field
     * @param {HTMLElement} field - Field to validate
     * @returns {boolean} True if valid
     */
    function validateField(field) {
        // Remove previous error state
        field.classList.remove('invalid');
        
        // Check validity
        const isValid = field.checkValidity();
        
        if (!isValid) {
            field.classList.add('invalid');
        }
        
        return isValid;
    }
    
    /**
     * Setup form validation
     */
    function setupFormValidation() {
        const form = document.getElementById('registrationForm');
        if (!form) return;
        
        // Real-time validation
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.value) {
                    validateField(this);
                }
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });
    }
    
    /**
     * Setup file upload zone
     */
    function setupFileUpload() {
        const zone = document.getElementById('logoUploadZone');
        const input = document.getElementById('logoUpload');
        const preview = document.getElementById('logoPreview');
        const previewImg = document.getElementById('previewImage');
        const removeBtn = document.getElementById('removeLogo');
        const fileInfo = document.getElementById('fileInfo');
        const browseBtn = zone?.querySelector('.upload-btn');
        
        if (!zone || !input) return;
        
        // Browse button click
        if (browseBtn) {
            browseBtn.addEventListener('click', () => input.click());
        }
        
        // Zone click
        zone.addEventListener('click', function(e) {
            if (e.target === zone || e.target.closest('.upload-content')) {
                input.click();
            }
        });
        
        // File selection
        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFile(this.files[0]);
            }
        });
        
        // Drag and drop
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length > 0) {
                handleFile(e.dataTransfer.files[0]);
            }
        });
        
        // Remove file
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                removeFile();
            });
        }
        
        /**
         * Handle selected file
         * @param {File} file - Selected file
         */
        function handleFile(file) {
            // Validate file type
            if (!CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
                showToast(t('toast.file.invalid'), 'error');
                return;
            }
            
            // Validate file size
            if (file.size > CONFIG.MAX_FILE_SIZE) {
                showToast(t('toast.file.large'), 'error');
                return;
            }
            
            // Read and preview file
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedLogo = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: e.target.result.split(',')[1] // Base64 without prefix
                };
                
                if (previewImg) {
                    previewImg.src = e.target.result;
                }
                
                zone.querySelector('.upload-content').classList.add('hidden');
                preview.classList.remove('hidden');
                
                if (fileInfo) {
                    fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
                }
                
                showToast('Logo uploaded successfully', 'success');
            };
            reader.readAsDataURL(file);
        }
        
        /**
         * Remove uploaded file
         */
        function removeFile() {
            uploadedLogo = null;
            input.value = '';
            
            zone.querySelector('.upload-content').classList.remove('hidden');
            preview.classList.add('hidden');
            
            if (fileInfo) {
                fileInfo.textContent = '';
            }
        }
    }
    
    /**
     * Format file size
     * @param {number} bytes - Size in bytes
     * @returns {string} Formatted size
     */
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    
    /**
     * Setup phone input formatting
     */
    function setupPhoneInput() {
        const phoneInput = document.getElementById('contactPhone');
        if (!phoneInput) return;
        
        phoneInput.addEventListener('input', function() {
            // Remove non-numeric characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            value = value.substring(0, 10);
            
            // Format: XX XXX XXXX
            if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{3})(\d+)/, '$1 $2 $3');
            } else if (value.length >= 4) {
                value = value.replace(/(\d{2})(\d+)/, '$1 $2');
            }
            
            this.value = value;
        });
    }
    
    /**
     * Setup Facebook login
     */
    function setupFacebookLogin() {
        const fbBtn = document.getElementById('fbLoginBtn');
        if (!fbBtn || !CONFIG.FB_APP_ID) {
            // Hide Facebook section if not configured
            const fbSection = document.getElementById('fbLoginSection');
            if (fbSection) fbSection.style.display = 'none';
            return;
        }
        
        fbBtn.addEventListener('click', function() {
            if (typeof FB === 'undefined') {
                showToast('Facebook SDK not loaded', 'error');
                return;
            }
            
            FB.login(function(response) {
                if (response.authResponse) {
                    // Get page info
                    FB.api('/me/accounts', function(pages) {
                        if (pages.data && pages.data.length > 0) {
                            const page = pages.data[0];
                            fillFormFromFacebook(page);
                        }
                    });
                }
            }, { scope: 'pages_read_engagement' });
        });
    }
    
    /**
     * Fill form with Facebook page data
     * @param {Object} page - Facebook page data
     */
    function fillFormFromFacebook(page) {
        const brandName = document.getElementById('brandName');
        const facebookPage = document.getElementById('facebookPage');
        
        if (brandName && page.name) {
            brandName.value = page.name;
        }
        
        if (facebookPage && page.id) {
            facebookPage.value = `https://facebook.com/${page.id}`;
        }
        
        showToast('Information filled from Facebook', 'success');
    }
    
    /**
     * Setup character counters
     */
    function setupCharacterCounters() {
        const targetAudience = document.getElementById('targetAudience');
        const keyOfferings = document.getElementById('keyOfferings');
        const audienceCount = document.getElementById('audienceCount');
        const offeringsCount = document.getElementById('offeringsCount');
        
        if (targetAudience && audienceCount) {
            targetAudience.addEventListener('input', function() {
                audienceCount.textContent = this.value.length;
                if (this.value.length > 500) {
                    this.value = this.value.substring(0, 500);
                    audienceCount.textContent = 500;
                }
            });
        }
        
        if (keyOfferings && offeringsCount) {
            keyOfferings.addEventListener('input', function() {
                offeringsCount.textContent = this.value.length;
                if (this.value.length > 500) {
                    this.value = this.value.substring(0, 500);
                    offeringsCount.textContent = 500;
                }
            });
        }
    }
    
    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        // Final validation
        if (!validateCurrentSection()) {
            return;
        }
        
        // Check terms
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms?.checked) {
            showToast(t('validation.terms.required'), 'error');
            agreeTerms?.focus();
            return;
        }
        
        isSubmitting = true;
        setSubmitLoading(true);
        
        try {
            // Collect form data
            const formData = collectFormData();
            
            // Generate tracking ID
            const trackingId = generateTrackingId();
            formData.trackingId = trackingId;
            
            // Try to create GitHub issue
            let success = false;
            if (CONFIG.GITHUB_TOKEN) {
                success = await createGitHubIssue(formData);
            }
            
            // Fallback: Save to localStorage if GitHub fails
            if (!success) {
                saveToLocalStorage(formData);
            }
            
            // Save tracking info for success page
            saveTrackingInfo(trackingId);
            
            // Clear draft
            if (window.Consciousness) {
                window.Consciousness.clearDraft();
            }
            
            // Show success and redirect
            showToast(t('toast.submit.success'), 'success');
            
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 1500);
            
        } catch (error) {
            console.error('Submission error:', error);
            showToast(t('toast.submit.error'), 'error');
            isSubmitting = false;
            setSubmitLoading(false);
        }
    }
    
    /**
     * Collect form data
     * @returns {Object} Form data
     */
    function collectFormData() {
        const form = document.getElementById('registrationForm');
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Add metadata
        data.submittedAt = new Date().toISOString();
        data.userAgent = navigator.userAgent;
        data.language = navigator.language;
        data.screenResolution = `${window.screen.width}x${window.screen.height}`;
        
        // Add logo if uploaded
        if (uploadedLogo) {
            data.logo = uploadedLogo;
        }
        
        return data;
    }
    
    /**
     * Generate tracking ID
     * @returns {string} Tracking ID
     */
    function generateTrackingId() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `MSR-${timestamp}-${random}`;
    }
    
    /**
     * Create GitHub issue
     * @param {Object} data - Form data
     * @returns {boolean} True if successful
     */
    async function createGitHubIssue(data) {
        try {
            const issueBody = formatIssueBody(data);
            
            const response = await fetch(`https://api.github.com/repos/${CONFIG.REPO_OWNER}/${CONFIG.REPO_NAME}/issues`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: `Client Registration: ${data.brandName}`,
                    body: issueBody,
                    labels: [CONFIG.ISSUE_LABEL, data.industry || 'other']
                })
            });
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('[App] GitHub issue created:', result.number);
            
            return true;
            
        } catch (error) {
            console.error('[App] GitHub issue creation failed:', error);
            return false;
        }
    }
    
    /**
     * Format issue body
     * @param {Object} data - Form data
     * @returns {string} Markdown formatted body
     */
    function formatIssueBody(data) {
        return `## Client Registration

**Tracking ID:** ${data.trackingId}
**Submitted:** ${new Date(data.submittedAt).toLocaleString()}

### Brand Information
- **Brand Name:** ${data.brandName}
- **Local Name:** ${data.localName || 'N/A'}
- **Industry:** ${data.industry}

### Design
- **Primary Color:** ${data.primaryColor}
- **Secondary Color:** ${data.secondaryColor}

### Business Details
- **Target Audience:**
${data.targetAudience}

- **Key Offerings:**
${data.keyOfferings}

### Contact Information
- **Phone:** +93 ${data.contactPhone}
- **Facebook:** ${data.facebookPage || 'N/A'}

### Logo
${data.logo ? `Logo uploaded (${data.logo.name}, ${formatFileSize(data.logo.size)})` : 'No logo uploaded'}

---
*Submitted via Maseer Portal*
`;
    }
    
    /**
     * Save to localStorage as fallback
     * @param {Object} data - Form data
     */
    function saveToLocalStorage(data) {
        try {
            let submissions = JSON.parse(localStorage.getItem('maseer_submissions') || '[]');
            submissions.push(data);
            localStorage.setItem('maseer_submissions', JSON.stringify(submissions));
            console.log('[App] Saved to localStorage as fallback');
        } catch (e) {
            console.error('[App] Failed to save to localStorage:', e);
        }
    }
    
    /**
     * Save tracking info for success page
     * @param {string} trackingId - Tracking ID
     */
    function saveTrackingInfo(trackingId) {
        const trackingInfo = {
            trackingId: trackingId,
            submissionDate: new Date().toISOString(),
            status: 'pending'
        };
        sessionStorage.setItem('maseer_tracking', JSON.stringify(trackingInfo));
    }
    
    /**
     * Set submit button loading state
     * @param {boolean} loading - Loading state
     */
    function setSubmitLoading(loading) {
        const btn = document.getElementById('submitBtn');
        if (!btn) return;
        
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        
        btn.disabled = loading;
        
        if (btnText) btnText.classList.toggle('hidden', loading);
        if (btnLoader) btnLoader.classList.toggle('hidden', !loading);
    }
    
    /**
     * Show toast notification
     * @param {string} message - Message to show
     * @param {string} type - Toast type (success, error, warning, info)
     * @param {number} duration - Duration in milliseconds
     */
    function showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">×</button>
        `;
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    /**
     * Get translation
     * @param {string} key - Translation key
     * @returns {string} Translated string
     */
    function t(key) {
        if (window.i18n && window.i18n.t) {
            return window.i18n.t(key);
        }
        return key;
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose API globally
    window.App = {
        goToStep: goToStep,
        validateCurrentSection: validateCurrentSection,
        showToast: showToast,
        collectFormData: collectFormData
    };
    
    // Expose showToast globally for convenience
    window.showToast = showToast;
    
})();
