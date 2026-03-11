# 🚀 Maseer Portal

A premium client registration portal with trilingual support (English, Persian/Dari, Pashto) designed for GitHub Pages hosting.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-brightgreen.svg)

## ✨ Features

### 🌍 Internationalization
- **Trilingual Support**: English (EN), Persian/Dari (FA), Pashto (PS)
- **RTL Support**: Full right-to-left layout for Persian and Pashto
- **Dynamic Language Switching**: Seamless switching without page reload
- **Vazirmatn Font**: Beautiful Persian/Arabic typography

### 🎨 Design & UX
- **Premium Dark Theme**: Modern gradient backgrounds with particle animations
- **Multi-step Form**: 4-step registration process with progress indicator
- **Real-time Color Harmony**: Suggests complementary color schemes
- **Live Brand Preview**: See your brand colors in action
- **Drag & Drop Logo Upload**: Support for PNG, JPG, SVG (max 2MB)
- **Responsive Design**: Mobile-first, works on all devices

### 🔒 Security & Privacy
- **Client-side Processing**: No server required
- **GitHub API Integration**: Secure issue creation
- **Local Draft Saving**: Auto-saves form progress
- **Session Tracking**: Engagement analytics (optional)

### 📱 Form Features
- **Smart Validation**: Real-time field validation
- **Phone Formatting**: Afghanistan number format (+93)
- **Facebook Integration**: Optional auto-fill from Facebook pages
- **Character Counters**: For text area fields

## 📁 File Structure

```
maseer-portal/
├── index.html              # Main registration form
├── success.html            # Registration success page
├── _config.yml             # Jekyll configuration
├── README.md               # This file
└── assets/
    ├── css/
    │   └── style.css       # Complete styling with RTL support
    └── js/
        ├── i18n.js         # Internationalization system
        ├── color-picker.js # Color harmony utilities
        ├── consciousness.js # Engagement tracking
        └── app.js          # Main application logic
```

## 🚀 Quick Start

### 1. Fork/Clone Repository

```bash
git clone https://github.com/AdXbA-EEI3/maseer-portal.git
cd maseer-portal
```

### 2. Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Select source: **Deploy from a branch**
4. Choose branch: **main** / **master**
5. Folder: **/(root)**
6. Click **Save**

### 3. Configure GitHub Token (Optional)

To enable automatic GitHub issue creation:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GITHUB_TOKEN`
4. Value: Your GitHub personal access token with `repo` scope

### 4. Configure Facebook App (Optional)

For Facebook login integration:

1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. Add your domain to **Valid OAuth Redirect URIs**
3. Add App ID to repository secrets as `FB_APP_ID`

## ⚙️ Configuration

### GitHub Token Setup

The application reads configuration from `window.GITHUB_CONFIG` which should be injected at build time:

```javascript
window.GITHUB_CONFIG = {
    REPO_OWNER: 'your-username',
    REPO_NAME: 'maseer-portal',
    GITHUB_TOKEN: 'your-token-here',
    FB_APP_ID: 'your-facebook-app-id'
};
```

### Environment Variables

For GitHub Actions deployment, set these secrets:

| Secret | Description | Required |
|--------|-------------|----------|
| `GITHUB_TOKEN` | GitHub personal access token | No (for API) |
| `FB_APP_ID` | Facebook App ID | No |

## 🎨 Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --color-primary: #6B21A8;    /* Purple */
    --color-secondary: #EAB308;   /* Gold */
    --color-success: #10B981;     /* Green */
    --color-error: #EF4444;       /* Red */
    --color-info: #3B82F6;        /* Blue */
}
```

### Translations

Add or modify translations in `assets/js/i18n.js`:

```javascript
const translations = {
    en: {
        'key': 'English translation'
    },
    fa: {
        'key': 'ترجمه فارسی'
    },
    ps: {
        'key': 'پښتو ژباړه'
    }
};
```

### Form Fields

To add/modify form fields:

1. Edit HTML in `index.html`
2. Add validation rules in `assets/js/app.js`
3. Add translations in `assets/js/i18n.js`

## 📱 Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 480px | Single column, stacked layout |
| Tablet | 480-768px | Adjusted spacing |
| Desktop | > 768px | Full layout |

## 🔌 API Integration

### GitHub Issues API

The form creates GitHub issues with this format:

```markdown
## Client Registration

**Tracking ID:** MSR-XXXXXXXX-XXXX
**Submitted:** [Date]

### Brand Information
- **Brand Name:** [Name]
- **Industry:** [Industry]
...
```

### Fallback Storage

If GitHub API fails, submissions are saved to `localStorage` for manual retrieval.

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |
| Opera | 67+ |

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Keyboard navigation** support
- **Screen reader** compatible
- **High contrast mode** support
- **Reduced motion** preferences respected

## 🛠️ Development

### Local Development

```bash
# Using Jekyll (requires Ruby)
bundle install
bundle exec jekyll serve

# Or simply open index.html in browser
```

### Build for Production

```bash
# Jekyll build
bundle exec jekyll build

# Output to _site directory
```

## 📊 Analytics

The optional `consciousness.js` tracks:

- Form field focus time
- Navigation patterns
- Error occurrences
- Session duration
- Language preferences

Data is stored locally and never sent to external servers.

## 🔒 Security Considerations

1. **GitHub Token**: Never commit tokens to repository
2. **File Uploads**: Client-side validation only (2MB limit)
3. **XSS Protection**: All user input is escaped
4. **CSRF**: Not applicable (no server-side state)

## 🐛 Troubleshooting

### GitHub API Errors

**Issue**: "Failed to submit" error

**Solutions**:
- Check GitHub token is valid
- Verify token has `repo` scope
- Check repository exists and is accessible

### Facebook Login Not Working

**Issue**: Facebook button doesn't work

**Solutions**:
- Verify FB_APP_ID is set
- Check domain is in Facebook app settings
- Ensure HTTPS is enabled

### RTL Layout Issues

**Issue**: Persian/Pashto text not aligned correctly

**Solutions**:
- Check `dir="rtl"` is set on `<html>`
- Verify Vazirmatn font is loading
- Clear browser cache

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📞 Support

- Email: support@maseer.digital
- GitHub Issues: [Create an issue](https://github.com/AdXbA-EEI3/maseer-portal/issues)

## 🙏 Credits

- **Vazirmatn Font**: [rastikerdar.github.io/vazirmatn](https://rastikerdar.github.io/vazirmatn/)
- **Inter Font**: [rsms.me/inter](https://rsms.me/inter/)
- **GitHub Pages**: [pages.github.com](https://pages.github.com/)

---

<p align="center">
  Made with ❤️ by <strong>Maseer Digital</strong>
</p>
