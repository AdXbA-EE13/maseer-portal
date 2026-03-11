/**
 * MASEER PORTAL - ENGAGEMENT TRACKING & ANALYTICS
 * Tracks form interactions, saves drafts, and provides analytics-like functionality
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        STORAGE_KEY: 'maseer_draft',
        TRACKING_KEY: 'maseer_tracking',
        ANALYTICS_KEY: 'maseer_analytics',
        AUTO_SAVE_INTERVAL: 30000, // 30 seconds
        MAX_DRAFT_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
        DEBOUNCE_DELAY: 500
    };
    
    // Session tracking data
    let sessionData = {
        sessionId: generateSessionId(),
        startTime: Date.now(),
        pageViews: 1,
        interactions: [],
        formProgress: {},
        fieldFocusTime: {},
        errors: []
    };
    
    // Current field focus tracking
    let currentField = null;
    let fieldFocusStart = null;
    
    /**
     * Generate unique session ID
     * @returns {string} Session ID
     */
    function generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Initialize consciousness tracking
     */
    function init() {
        loadDraft();
        setupEventListeners();
        startAutoSave();
        trackPageView();
        
        // Track session duration
        setInterval(trackSessionDuration, 60000); // Every minute
        
        console.log('[Consciousness] Tracking initialized:', sessionData.sessionId);
    }
    
    /**
     * Setup event listeners for tracking
     */
    function setupEventListeners() {
        // Form field interactions
        document.querySelectorAll('input, textarea, select').forEach(field => {
            // Focus tracking
            field.addEventListener('focus', function() {
                currentField = this.name || this.id;
                fieldFocusStart = Date.now();
                trackInteraction('focus', { field: currentField });
            });
            
            // Blur tracking
            field.addEventListener('blur', function() {
                if (currentField && fieldFocusStart) {
                    const duration = Date.now() - fieldFocusStart;
                    trackFieldTime(currentField, duration);
                    trackInteraction('blur', { field: currentField, duration: duration });
                }
                currentField = null;
                fieldFocusStart = null;
            });
            
            // Input tracking (debounced)
            if (field.tagName !== 'SELECT' && field.type !== 'checkbox' && field.type !== 'file') {
                field.addEventListener('input', debounce(function() {
                    trackInteraction('input', { 
                        field: this.name || this.id,
                        valueLength: this.value?.length || 0
                    });
                }, CONFIG.DEBOUNCE_DELAY));
            }
            
            // Change tracking
            field.addEventListener('change', function() {
                trackInteraction('change', { 
                    field: this.name || this.id,
                    hasValue: !!this.value
                });
                saveDraft();
            });
        });
        
        // Form navigation tracking
        document.querySelectorAll('.next-step, .prev-step').forEach(btn => {
            btn.addEventListener('click', function() {
                const direction = this.classList.contains('next-step') ? 'next' : 'prev';
                const currentSection = document.querySelector('.form-section.active');
                trackInteraction('navigation', { 
                    direction: direction,
                    fromSection: currentSection?.dataset.section
                });
            });
        });
        
        // Form submission tracking
        const form = document.getElementById('registrationForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                trackInteraction('submit', { 
                    timestamp: Date.now(),
                    formProgress: getFormProgress()
                });
                clearDraft();
            });
        }
        
        // Error tracking
        window.addEventListener('error', function(e) {
            trackError('javascript', e.message, e.filename, e.lineno);
        });
        
        // Unhandled promise rejection tracking
        window.addEventListener('unhandledrejection', function(e) {
            trackError('promise', e.reason?.message || 'Unhandled promise rejection');
        });
        
        // Visibility tracking
        document.addEventListener('visibilitychange', function() {
            trackInteraction('visibility', { 
                state: document.visibilityState,
                timestamp: Date.now()
            });
        });
        
        // Language change tracking
        window.addEventListener('languageChanged', function(e) {
            trackInteraction('language_change', { 
                language: e.detail.language,
                isRTL: e.detail.isRTL
            });
        });
        
        // Before unload - save final state
        window.addEventListener('beforeunload', function() {
            saveDraft();
            saveAnalytics();
        });
    }
    
    /**
     * Track an interaction
     * @param {string} type - Interaction type
     * @param {Object} data - Additional data
     */
    function trackInteraction(type, data = {}) {
        const interaction = {
            type: type,
            timestamp: Date.now(),
            sessionTime: Date.now() - sessionData.startTime,
            ...data
        };
        
        sessionData.interactions.push(interaction);
        
        // Keep only last 100 interactions
        if (sessionData.interactions.length > 100) {
            sessionData.interactions = sessionData.interactions.slice(-100);
        }
        
        // Update form progress
        if (type === 'change' || type === 'input') {
            updateFormProgress();
        }
    }
    
    /**
     * Track field focus time
     * @param {string} field - Field name
     * @param {number} duration - Time in milliseconds
     */
    function trackFieldTime(field, duration) {
        if (!sessionData.fieldFocusTime[field]) {
            sessionData.fieldFocusTime[field] = 0;
        }
        sessionData.fieldFocusTime[field] += duration;
    }
    
    /**
     * Track error
     * @param {string} type - Error type
     * @param {string} message - Error message
     * @param {string} filename - Source file
     * @param {number} lineno - Line number
     */
    function trackError(type, message, filename, lineno) {
        const error = {
            type: type,
            message: message,
            filename: filename,
            lineno: lineno,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        };
        
        sessionData.errors.push(error);
        
        // Keep only last 20 errors
        if (sessionData.errors.length > 20) {
            sessionData.errors = sessionData.errors.slice(-20);
        }
        
        console.error('[Consciousness] Error tracked:', error);
    }
    
    /**
     * Track page view
     */
    function trackPageView() {
        sessionData.pageViews++;
        trackInteraction('pageview', {
            url: window.location.href,
            referrer: document.referrer,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`
        });
    }
    
    /**
     * Track session duration
     */
    function trackSessionDuration() {
        const duration = Date.now() - sessionData.startTime;
        trackInteraction('heartbeat', { duration: duration });
    }
    
    /**
     * Update form progress tracking
     */
    function updateFormProgress() {
        const form = document.getElementById('registrationForm');
        if (!form) return;
        
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let filled = 0;
        let total = 0;
        
        fields.forEach(field => {
            total++;
            if (field.value && field.value.trim() !== '') {
                filled++;
            }
        });
        
        sessionData.formProgress = {
            filled: filled,
            total: total,
            percentage: Math.round((filled / total) * 100),
            timestamp: Date.now()
        };
    }
    
    /**
     * Get current form progress
     * @returns {Object} Progress data
     */
    function getFormProgress() {
        return sessionData.formProgress;
    }
    
    /**
     * Save form draft to localStorage
     */
    function saveDraft() {
        const form = document.getElementById('registrationForm');
        if (!form) return;
        
        const formData = new FormData(form);
        const draft = {
            data: {},
            timestamp: Date.now(),
            sessionId: sessionData.sessionId,
            progress: sessionData.formProgress
        };
        
        // Collect form data (excluding password fields and files)
        formData.forEach((value, key) => {
            if (key !== 'logoUpload' && !key.includes('password')) {
                draft.data[key] = value;
            }
        });
        
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(draft));
            console.log('[Consciousness] Draft saved');
        } catch (e) {
            console.warn('[Consciousness] Failed to save draft:', e);
        }
    }
    
    /**
     * Load form draft from localStorage
     */
    function loadDraft() {
        try {
            const draftJson = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (!draftJson) return;
            
            const draft = JSON.parse(draftJson);
            
            // Check if draft is too old
            if (Date.now() - draft.timestamp > CONFIG.MAX_DRAFT_AGE) {
                clearDraft();
                return;
            }
            
            // Restore form data
            const form = document.getElementById('registrationForm');
            if (form && draft.data) {
                Object.keys(draft.data).forEach(key => {
                    const field = form.querySelector(`[name="${key}"]`);
                    if (field && field.type !== 'file') {
                        field.value = draft.data[key];
                        
                        // Trigger change event for color pickers
                        if (field.type === 'color') {
                            const hexInput = document.getElementById(key + 'Hex');
                            if (hexInput) {
                                hexInput.value = draft.data[key].toUpperCase();
                            }
                        }
                    }
                });
                
                // Show toast notification
                if (window.showToast) {
                    window.showToast(window.t ? window.t('toast.draft.saved') : 'Draft restored', 'info');
                }
                
                console.log('[Consciousness] Draft loaded');
            }
        } catch (e) {
            console.warn('[Consciousness] Failed to load draft:', e);
        }
    }
    
    /**
     * Clear form draft from localStorage
     */
    function clearDraft() {
        try {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
            console.log('[Consciousness] Draft cleared');
        } catch (e) {
            console.warn('[Consciousness] Failed to clear draft:', e);
        }
    }
    
    /**
     * Start auto-save interval
     */
    function startAutoSave() {
        setInterval(function() {
            const form = document.getElementById('registrationForm');
            if (form && hasFormData()) {
                saveDraft();
            }
        }, CONFIG.AUTO_SAVE_INTERVAL);
    }
    
    /**
     * Check if form has any data
     * @returns {boolean} True if form has data
     */
    function hasFormData() {
        const form = document.getElementById('registrationForm');
        if (!form) return false;
        
        const inputs = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="url"], textarea');
        for (let input of inputs) {
            if (input.value && input.value.trim() !== '') {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Save analytics data
     */
    function saveAnalytics() {
        try {
            const analytics = {
                sessionData: sessionData,
                savedAt: Date.now()
            };
            
            // Get existing analytics
            let existingAnalytics = [];
            const existing = localStorage.getItem(CONFIG.ANALYTICS_KEY);
            if (existing) {
                existingAnalytics = JSON.parse(existing);
            }
            
            // Add current session
            existingAnalytics.push(analytics);
            
            // Keep only last 10 sessions
            if (existingAnalytics.length > 10) {
                existingAnalytics = existingAnalytics.slice(-10);
            }
            
            localStorage.setItem(CONFIG.ANALYTICS_KEY, JSON.stringify(existingAnalytics));
        } catch (e) {
            console.warn('[Consciousness] Failed to save analytics:', e);
        }
    }
    
    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Get session statistics
     * @returns {Object} Session statistics
     */
    function getSessionStats() {
        const duration = Date.now() - sessionData.startTime;
        const interactionsByType = {};
        
        sessionData.interactions.forEach(i => {
            interactionsByType[i.type] = (interactionsByType[i.type] || 0) + 1;
        });
        
        return {
            sessionId: sessionData.sessionId,
            duration: duration,
            durationFormatted: formatDuration(duration),
            pageViews: sessionData.pageViews,
            totalInteractions: sessionData.interactions.length,
            interactionsByType: interactionsByType,
            formProgress: sessionData.formProgress,
            fieldFocusTime: sessionData.fieldFocusTime,
            errorCount: sessionData.errors.length
        };
    }
    
    /**
     * Format duration in milliseconds to readable string
     * @param {number} ms - Milliseconds
     * @returns {string} Formatted duration
     */
    function formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }
    
    /**
     * Export session data
     * @returns {Object} Complete session data
     */
    function exportData() {
        return {
            ...sessionData,
            exportedAt: Date.now(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            url: window.location.href
        };
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose API globally
    window.Consciousness = {
        getSessionStats: getSessionStats,
        exportData: exportData,
        saveDraft: saveDraft,
        loadDraft: loadDraft,
        clearDraft: clearDraft,
        trackInteraction: trackInteraction,
        trackError: trackError,
        getFormProgress: getFormProgress
    };
    
})();
