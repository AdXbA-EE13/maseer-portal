/**
 * MASEER PORTAL - INTERNATIONALIZATION SYSTEM
 * Supports English (EN), Persian/Dari (FA), and Pashto (PS)
 * With RTL support for FA/PS languages
 */

(function() {
    'use strict';

    // Translation dictionary
    const translations = {
        en: {
            // App
            'app.title': 'Maseer Portal',
            'app.tagline': 'Your Digital Journey Starts Here',
            
            // Progress
            'progress.brand': 'Brand',
            'progress.design': 'Design',
            'progress.details': 'Details',
            'progress.contact': 'Contact',
            
            // Sections
            'sections.brand': 'Brand Information',
            'sections.design': 'Design & Colors',
            'sections.details': 'Business Details',
            'sections.contact': 'Contact Information',
            
            // Fields - Brand Name
            'fields.brandName.label': 'Brand Name *',
            'fields.brandName.placeholder': 'e.g., Maseer Digital',
            'fields.brandName.hint': 'Your official brand name',
            
            // Fields - Local Name
            'fields.localName.label': 'Local Name',
            'fields.localName.placeholder': 'e.g., مسیر دیجیتال',
            'fields.localName.hint': 'Name in local language (optional)',
            
            // Fields - Industry
            'fields.industry.label': 'Industry *',
            'fields.industry.select': 'Select Industry',
            
            // Industries
            'industries.retail': 'Retail',
            'industries.food': 'Food & Beverage',
            'industries.fashion': 'Fashion',
            'industries.jewelry': 'Jewelry',
            'industries.technology': 'Technology',
            'industries.healthcare': 'Healthcare',
            'industries.education': 'Education',
            'industries.other': 'Other',
            
            // Fields - Colors
            'fields.primaryColor.label': 'Primary Color *',
            'fields.primaryColor.hint': 'Main brand color',
            'fields.secondaryColor.label': 'Secondary Color *',
            'fields.secondaryColor.hint': 'Accent color',
            
            // Color Harmony
            'color.harmony.title': 'Color Harmony Suggestions',
            'color.harmony.complementary': 'Complementary',
            'color.harmony.analogous': 'Analogous',
            'color.harmony.triadic': 'Triadic',
            
            // Preview
            'preview.title': 'Live Preview',
            
            // Fields - Business Details
            'fields.targetAudience.label': 'Target Audience *',
            'fields.targetAudience.placeholder': 'Describe your ideal customers...',
            'fields.keyOfferings.label': 'Key Offerings *',
            'fields.keyOfferings.placeholder': 'List your main products or services...',
            
            // Fields - Logo
            'fields.logo.label': 'Logo Upload',
            'fields.logo.dragDrop': 'Drag & drop your logo here',
            'fields.logo.hint': 'PNG, JPG, or SVG (max 2MB)',
            'fields.logo.browse': 'Browse Files',
            
            // Fields - Contact
            'fields.contactPhone.label': 'Contact Phone *',
            'fields.contactPhone.hint': 'Afghanistan mobile number',
            'fields.contactPhone.placeholder': '70 123 4567',
            'fields.facebookPage.label': 'Facebook Page',
            'fields.facebookPage.hint': 'Optional - for social integration',
            'fields.facebookPage.placeholder': 'https://facebook.com/yourpage',
            
            // Facebook
            'facebook.or': 'or',
            'facebook.login': 'Connect with Facebook',
            'facebook.hint': 'Auto-fill your page information',
            
            // Terms
            'terms.text': 'I agree to the',
            'terms.link': 'Terms of Service',
            
            // Buttons
            'buttons.next': 'Next',
            'buttons.back': 'Back',
            'buttons.submit': 'Submit Registration',
            
            // Validation
            'validation.brandName.required': 'Brand name is required',
            'validation.industry.required': 'Please select an industry',
            'validation.targetAudience.required': 'Target audience is required',
            'validation.keyOfferings.required': 'Key offerings are required',
            'validation.contactPhone.required': 'Valid phone number is required',
            'validation.terms.required': 'You must agree to continue',
            
            // Footer
            'footer.secure': 'Your information is secure and encrypted',
            'footer.powered': 'Powered by Maseer Digital',
            
            // Success Page
            'success.title': 'Registration Successful - Maseer Portal',
            'success.heading': 'Registration Successful!',
            'success.message': 'Thank you for registering. Your application has been received and is being processed.',
            'success.tracking.title': 'Tracking Information',
            'success.tracking.id': 'Tracking ID:',
            'success.tracking.date': 'Submitted:',
            'success.tracking.status': 'Status:',
            'success.timeline.title': 'Application Status',
            'success.timeline.submitted': 'Submitted',
            'success.timeline.submitted.desc': 'Your application has been received',
            'success.timeline.review': 'Under Review',
            'success.timeline.review.desc': 'Our team is reviewing your information',
            'success.timeline.processing': 'Processing',
            'success.timeline.processing.desc': 'Building your digital presence',
            'success.timeline.complete': 'Complete',
            'success.timeline.complete.desc': 'Your portal is ready',
            'success.actions.title': 'Track Progress',
            'success.actions.description': 'You can monitor the processing of your application in real-time:',
            'success.actions.button': 'View GitHub Actions',
            'success.redirect.message': 'Redirecting to homepage in',
            'success.redirect.seconds': 'seconds',
            'success.redirect.cancel': 'Stay on this page',
            'success.redirect.now': 'Go now',
            'success.contact': 'Have questions? Contact us at',
            
            // Status
            'status.pending': 'Pending Review',
            'status.processing': 'Processing',
            'status.complete': 'Complete',
            
            // Toast Messages
            'toast.success': 'Success!',
            'toast.error': 'Error occurred',
            'toast.copied': 'Copied to clipboard!',
            'toast.file.large': 'File is too large (max 2MB)',
            'toast.file.invalid': 'Invalid file type (PNG, JPG, SVG only)',
            'toast.submit.success': 'Registration submitted successfully!',
            'toast.submit.error': 'Failed to submit. Please try again.',
            'toast.draft.saved': 'Draft saved automatically',
            'toast.network.error': 'Network error. Please check your connection.'
        },
        
        fa: {
            // App
            'app.title': 'پورتال مسیر',
            'app.tagline': 'سفر دیجیتال شما اینجا آغاز می‌شود',
            
            // Progress
            'progress.brand': 'برند',
            'progress.design': 'طراحی',
            'progress.details': 'جزئیات',
            'progress.contact': 'تماس',
            
            // Sections
            'sections.brand': 'اطلاعات برند',
            'sections.design': 'طراحی و رنگ‌ها',
            'sections.details': 'جزئیات تجارت',
            'sections.contact': 'اطلاعات تماس',
            
            // Fields - Brand Name
            'fields.brandName.label': 'نام برند *',
            'fields.brandName.placeholder': 'مثال: مسیر دیجیتال',
            'fields.brandName.hint': 'نام رسمی برند شما',
            
            // Fields - Local Name
            'fields.localName.label': 'نام محلی',
            'fields.localName.placeholder': 'مثال: Maseer Digital',
            'fields.localName.hint': 'نام به زبان محلی (اختیاری)',
            
            // Fields - Industry
            'fields.industry.label': 'صنعت *',
            'fields.industry.select': 'صنعت را انتخاب کنید',
            
            // Industries
            'industries.retail': 'خرده‌فروشی',
            'industries.food': 'غذا و نوشیدنی',
            'industries.fashion': 'مد و فشن',
            'industries.jewelry': 'جواهرات',
            'industries.technology': 'تکنولوژی',
            'industries.healthcare': 'سلامت',
            'industries.education': 'آموزش',
            'industries.other': 'سایر',
            
            // Fields - Colors
            'fields.primaryColor.label': 'رنگ اصلی *',
            'fields.primaryColor.hint': 'رنگ اصلی برند',
            'fields.secondaryColor.label': 'رنگ فرعی *',
            'fields.secondaryColor.hint': 'رنگ تکمیلی',
            
            // Color Harmony
            'color.harmony.title': 'پیشنهادات هماهنگی رنگ',
            'color.harmony.complementary': 'مکمل',
            'color.harmony.analogous': 'همسایه',
            'color.harmony.triadic': 'سه‌گانه',
            
            // Preview
            'preview.title': 'پیش‌نمایش زنده',
            
            // Fields - Business Details
            'fields.targetAudience.label': 'مخاطب هدف *',
            'fields.targetAudience.placeholder': 'مشتریان ایده‌آل خود را توصیف کنید...',
            'fields.keyOfferings.label': 'محصولات/خدمات اصلی *',
            'fields.keyOfferings.placeholder': 'محصولات یا خدمات اصلی خود را لیست کنید...',
            
            // Fields - Logo
            'fields.logo.label': 'آپلود لوگو',
            'fields.logo.dragDrop': 'لوگوی خود را اینجا بکشید و رها کنید',
            'fields.logo.hint': 'PNG، JPG یا SVG (حداکثر ۲ مگابایت)',
            'fields.logo.browse': 'انتخاب فایل',
            
            // Fields - Contact
            'fields.contactPhone.label': 'شماره تماس *',
            'fields.contactPhone.hint': 'شماره موبایل افغانستان',
            'fields.contactPhone.placeholder': '۷۰ ۱۲۳ ۴۵۶۷',
            'fields.facebookPage.label': 'صفحه فیسبوک',
            'fields.facebookPage.hint': 'اختیاری - برای یکپارچه‌سازی اجتماعی',
            'fields.facebookPage.placeholder': 'https://facebook.com/yourpage',
            
            // Facebook
            'facebook.or': 'یا',
            'facebook.login': 'اتصال با فیسبوک',
            'facebook.hint': 'اطلاعات صفحه شما به صورت خودکار پر می‌شود',
            
            // Terms
            'terms.text': 'من موافقم با',
            'terms.link': 'شرایط استفاده',
            
            // Buttons
            'buttons.next': 'بعدی',
            'buttons.back': 'قبلی',
            'buttons.submit': 'ثبت نام',
            
            // Validation
            'validation.brandName.required': 'نام برند الزامی است',
            'validation.industry.required': 'لطفاً یک صنعت انتخاب کنید',
            'validation.targetAudience.required': 'مخاطب هدف الزامی است',
            'validation.keyOfferings.required': 'محصولات/خدمات الزامی است',
            'validation.contactPhone.required': 'شماره تماس معتبر الزامی است',
            'validation.terms.required': 'برای ادامه باید موافقت کنید',
            
            // Footer
            'footer.secure': 'اطلاعات شما امن و رمزنگاری شده است',
            'footer.powered': 'قدرت گرفته از مسیر دیجیتال',
            
            // Success Page
            'success.title': 'ثبت نام موفق - پورتال مسیر',
            'success.heading': 'ثبت نام با موفقیت انجام شد!',
            'success.message': 'با تشکر از ثبت نام شما. درخواست شما دریافت شد و در حال پردازش است.',
            'success.tracking.title': 'اطلاعات پیگیری',
            'success.tracking.id': 'شناسه پیگیری:',
            'success.tracking.date': 'تاریخ ثبت:',
            'success.tracking.status': 'وضعیت:',
            'success.timeline.title': 'وضعیت درخواست',
            'success.timeline.submitted': 'ثبت شد',
            'success.timeline.submitted.desc': 'درخواست شما دریافت شده است',
            'success.timeline.review': 'در حال بررسی',
            'success.timeline.review.desc': 'تیم ما در حال بررسی اطلاعات شماست',
            'success.timeline.processing': 'در حال پردازش',
            'success.timeline.processing.desc': 'در حال ساخت حضور دیجیتال شما',
            'success.timeline.complete': 'تکمیل',
            'success.timeline.complete.desc': 'پورتال شما آماده است',
            'success.actions.title': 'پیگیری پیشرفت',
            'success.actions.description': 'می‌توانید پردازش درخواست خود را به صورت زنده مشاهده کنید:',
            'success.actions.button': 'مشاهده GitHub Actions',
            'success.redirect.message': 'انتقال به صفحه اصلی در',
            'success.redirect.seconds': 'ثانیه',
            'success.redirect.cancel': 'ماندن در این صفحه',
            'success.redirect.now': 'رفتن الآن',
            'success.contact': 'سوال دارید؟ با ما تماس بگیرید:',
            
            // Status
            'status.pending': 'در انتظار بررسی',
            'status.processing': 'در حال پردازش',
            'status.complete': 'تکمیل شده',
            
            // Toast Messages
            'toast.success': 'موفقیت!',
            'toast.error': 'خطایی رخ داد',
            'toast.copied': 'در کلیپ‌بورد کپی شد!',
            'toast.file.large': 'فایل بسیار بزرگ است (حداکثر ۲ مگابایت)',
            'toast.file.invalid': 'نوع فایل نامعتبر (فقط PNG، JPG، SVG)',
            'toast.submit.success': 'ثبت نام با موفقیت انجام شد!',
            'toast.submit.error': 'ثبت نام ناموفق. لطفاً دوباره تلاش کنید.',
            'toast.draft.saved': 'پیش‌نویس به صورت خودکار ذخیره شد',
            'toast.network.error': 'خطای شبکه. لطفاً اتصال خود را بررسی کنید.'
        },
        
        ps: {
            // App
            'app.title': 'د مسیر پورټال',
            'app.tagline': 'ستاسو ډیجیټل سفر دلته پیل کیږي',
            
            // Progress
            'progress.brand': 'برانډ',
            'progress.design': 'ډیزاین',
            'progress.details': 'جزئیات',
            'progress.contact': 'اړیکه',
            
            // Sections
            'sections.brand': 'د برانډ معلومات',
            'sections.design': 'ډیزاین او رنګونه',
            'sections.details': 'د سوداګرۍ جزئیات',
            'sections.contact': 'د اړیکې معلومات',
            
            // Fields - Brand Name
            'fields.brandName.label': 'د برانډ نوم *',
            'fields.brandName.placeholder': 'د مثال په ډول: مسیر ډیجیټل',
            'fields.brandName.hint': 'ستاسو رسمي برانډ نوم',
            
            // Fields - Local Name
            'fields.localName.label': 'محلي نوم',
            'fields.localName.placeholder': 'د مثال په ډول: Maseer Digital',
            'fields.localName.hint': 'په محلي ژبه کې نوم (اختیاري)',
            
            // Fields - Industry
            'fields.industry.label': 'صنعت *',
            'fields.industry.select': 'صنعت وټاکئ',
            
            // Industries
            'industries.retail': 'پرچون',
            'industries.food': 'خواړه او څښاک',
            'industries.fashion': 'فیشن',
            'industries.jewelry': 'زیورات',
            'industries.technology': 'ټیکنالوژي',
            'industries.healthcare': 'روغتیا',
            'industries.education': 'زده‌کړه',
            'industries.other': 'نور',
            
            // Fields - Colors
            'fields.primaryColor.label': 'اصلي رنګ *',
            'fields.primaryColor.hint': 'د برانډ اصلي رنګ',
            'fields.secondaryColor.label': 'ثانوي رنګ *',
            'fields.secondaryColor.hint': 'تکمیلي رنګ',
            
            // Color Harmony
            'color.harmony.title': 'د رنګ همغږۍ وړاندیزونه',
            'color.harmony.complementary': 'تکمیلي',
            'color.harmony.analogous': 'اړوند',
            'color.harmony.triadic': 'دری‌ګونی',
            
            // Preview
            'preview.title': 'ژوندۍ مخکتنه',
            
            // Fields - Business Details
            'fields.targetAudience.label': 'هدفې خلک *',
            'fields.targetAudience.placeholder': 'خپل ایده‌ال پیرودونکي تشریح کړئ...',
            'fields.keyOfferings.label': 'اصلي محصولات/خدمات *',
            'fields.keyOfferings.placeholder': 'خپل اصلي محصولات یا خدمات ولست کړئ...',
            
            // Fields - Logo
            'fields.logo.label': 'لوګو پورته کول',
            'fields.logo.dragDrop': 'خپل لوګو دلته راکښېږدئ',
            'fields.logo.hint': 'PNG، JPG یا SVG (اعظمي ۲ MB)',
            'fields.logo.browse': 'فایلونه وټاکئ',
            
            // Fields - Contact
            'fields.contactPhone.label': 'د اړیکې شمیره *',
            'fields.contactPhone.hint': 'د افغانستان موبایل شمیره',
            'fields.contactPhone.placeholder': '۷۰ ۱۲۳ ۴۵۶۷',
            'fields.facebookPage.label': 'د فیسبوک پاڼه',
            'fields.facebookPage.hint': 'اختیاري - د ټولنیزې یوځایتیا لپاره',
            'fields.facebookPage.placeholder': 'https://facebook.com/yourpage',
            
            // Facebook
            'facebook.or': 'یا',
            'facebook.login': 'د فیسبوک سره نښلول',
            'facebook.hint': 'ستاسو د پاڼې معلومات په اتوماتیک ډول ډک شي',
            
            // Terms
            'terms.text': 'زه موافق یم د',
            'terms.link': 'د کار شرایطو',
            
            // Buttons
            'buttons.next': 'بل',
            'buttons.back': 'شاته',
            'buttons.submit': 'ثبتول',
            
            // Validation
            'validation.brandName.required': 'د برانډ نوم اړین دی',
            'validation.industry.required': 'مهرباني وکړئ یو صنعت وټاکئ',
            'validation.targetAudience.required': 'هدفې خلک اړین دي',
            'validation.keyOfferings.required': 'اصلي محصولات/خدمات اړین دي',
            'validation.contactPhone.required': 'د اعتبار وړ شمیره اړینه ده',
            'validation.terms.required': 'د ادامې لپاره باید موافق شئ',
            
            // Footer
            'footer.secure': 'ستاسو معلومات خوندي او کوډ شوي دي',
            'footer.powered': 'د مسیر ډیجیټل لخوا رامنځته شوی',
            
            // Success Page
            'success.title': 'ثبت بریالی شو - د مسیر پورټال',
            'success.heading': 'ثبت بریالی شو!',
            'success.message': 'د ثبت کولو څخه مننه. ستاسو غوښتنه ترلاسه شوه او پروسس کیږي.',
            'success.tracking.title': 'د تعقیب معلومات',
            'success.tracking.id': 'د تعقیب ID:',
            'success.tracking.date': 'د ثبت نیټه:',
            'success.tracking.status': 'حالت:',
            'success.timeline.title': 'د غوښتنې حالت',
            'success.timeline.submitted': 'ثبت شو',
            'success.timeline.submitted.desc': 'ستاسو غوښتنه ترلاسه شوه',
            'success.timeline.review': 'د بیاکتنې لاندې',
            'success.timeline.review.desc': 'زموږ ټیم ستاسو معلومات بیاکتنه کوي',
            'success.timeline.processing': 'پروسس کیږي',
            'success.timeline.processing.desc': 'ستاسو ډیجیټل حضور جوړیږي',
            'success.timeline.complete': 'بشپړ',
            'success.timeline.complete.desc': 'ستاسو پورټال چمتو دی',
            'success.actions.title': 'د پرمختګ تعقیب',
            'success.actions.description': 'تاسو کولی شئ د خپلې غوښتنې پروسس په ژوندۍ توګه وګورئ:',
            'success.actions.button': 'GitHub Actions وګورئ',
            'success.redirect.message': 'ته اصلي پاڼې ته انتقال کیږئ په',
            'success.redirect.seconds': 'ثانیو کې',
            'success.redirect.cancel': 'په دې پاڼه کې پاتې شئ',
            'success.redirect.now': 'اوس لاړ شئ',
            'success.contact': 'پوښتنې لرئ؟ زموږ سره اړیکه ونیسئ:',
            
            // Status
            'status.pending': 'د بیاکتنې منتظر',
            'status.processing': 'پروسس کیږي',
            'status.complete': 'بشپړ',
            
            // Toast Messages
            'toast.success': 'بریالی!',
            'toast.error': 'تیروتنه رامنځته شوه',
            'toast.copied': 'کلیپ بورډ ته کاپي شو!',
            'toast.file.large': 'فایل ډیر لوی دی (اعظمي ۲ MB)',
            'toast.file.invalid': 'د فایل ناسم ډول (یوازې PNG، JPG، SVG)',
            'toast.submit.success': 'ثبت بریالی شو!',
            'toast.submit.error': 'ثبت نابریالي شو. مهرباني وکړئ بیا هڅه وکړئ.',
            'toast.draft.saved': 'ډرافټ په اوتوماتیک ډول خوندي شو',
            'toast.network.error': 'د شبکې تیروتنه. مهرباني وکړئ خپل اړیکه وګورئ.'
        }
    };

    // RTL languages
    const rtlLanguages = ['fa', 'ps', 'ar'];
    
    // Current language
    let currentLanguage = localStorage.getItem('maseer_language') || 'en';
    
    /**
     * Get translated string by key
     * @param {string} key - Translation key
     * @param {string} lang - Optional language override
     * @returns {string} Translated string or key if not found
     */
    function t(key, lang) {
        const targetLang = lang || currentLanguage;
        const langTranslations = translations[targetLang] || translations.en;
        return langTranslations[key] || translations.en[key] || key;
    }
    
    /**
     * Set current language
     * @param {string} lang - Language code (en, fa, ps)
     */
    function setLanguage(lang) {
        if (!translations[lang]) {
            console.warn('Language not supported:', lang);
            return;
        }
        
        currentLanguage = lang;
        localStorage.setItem('maseer_language', lang);
        
        // Update document direction
        const isRTL = rtlLanguages.includes(lang);
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Update all translatable elements
        updatePageTranslations();
        
        // Dispatch language change event
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang, isRTL: isRTL } 
        }));
    }
    
    /**
     * Update all elements with data-i18n attributes
     */
    function updatePageTranslations() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key);
            
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = t(key);
        });
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
        });
        
        // Update title
        const titleKey = document.querySelector('title[data-i18n]');
        if (titleKey) {
            document.title = t(titleKey.getAttribute('data-i18n'));
        }
    }
    
    /**
     * Get current language
     * @returns {string} Current language code
     */
    function getCurrentLanguage() {
        return currentLanguage;
    }
    
    /**
     * Check if current language is RTL
     * @returns {boolean} True if RTL
     */
    function isRTL() {
        return rtlLanguages.includes(currentLanguage);
    }
    
    /**
     * Get available languages
     * @returns {string[]} Array of language codes
     */
    function getAvailableLanguages() {
        return Object.keys(translations);
    }
    
    /**
     * Add custom translations
     * @param {string} lang - Language code
     * @param {Object} newTranslations - Object with key-value pairs
     */
    function addTranslations(lang, newTranslations) {
        if (!translations[lang]) {
            translations[lang] = {};
        }
        Object.assign(translations[lang], newTranslations);
    }
    
    // Initialize language on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        // Set initial language
        setLanguage(currentLanguage);
        
        // Bind language selector buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.dataset.lang;
                if (lang && lang !== currentLanguage) {
                    setLanguage(lang);
                }
            });
        });
    });
    
    // Expose API globally
    window.i18n = {
        t: t,
        setLanguage: setLanguage,
        getCurrentLanguage: getCurrentLanguage,
        isRTL: isRTL,
        getAvailableLanguages: getAvailableLanguages,
        addTranslations: addTranslations,
        translations: translations
    };
    
    // Backward compatibility
    window.t = t;
    window.setLanguage = setLanguage;
    
})();
