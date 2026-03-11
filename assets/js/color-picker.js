/**
 * MASEER PORTAL - COLOR PICKER & HARMONY UTILITIES
 * Color manipulation and harmony suggestion functions
 */

(function() {
    'use strict';
    
    /**
     * Convert hex color to HSL
     * @param {string} hex - Hex color code (e.g., "#6B21A8")
     * @returns {Object} HSL values {h, s, l}
     */
    function hexToHsl(hex) {
        // Remove # if present
        hex = hex.replace(/^#/, '');
        
        // Parse RGB values
        let r, g, b;
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16) / 255;
            g = parseInt(hex[1] + hex[1], 16) / 255;
            b = parseInt(hex[2] + hex[2], 16) / 255;
        } else {
            r = parseInt(hex.substring(0, 2), 16) / 255;
            g = parseInt(hex.substring(2, 4), 16) / 255;
            b = parseInt(hex.substring(4, 6), 16) / 255;
        }
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    
    /**
     * Convert HSL to hex color
     * @param {number} h - Hue (0-360)
     * @param {number} s - Saturation (0-100)
     * @param {number} l - Lightness (0-100)
     * @returns {string} Hex color code
     */
    function hslToHex(h, s, l) {
        h = h / 360;
        s = s / 100;
        l = l / 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        const toHex = (x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }
    
    /**
     * Calculate complementary color
     * @param {string} hex - Primary color
     * @returns {string} Complementary color
     */
    function getComplementary(hex) {
        const hsl = hexToHsl(hex);
        const newHue = (hsl.h + 180) % 360;
        return hslToHex(newHue, hsl.s, hsl.l);
    }
    
    /**
     * Calculate analogous colors
     * @param {string} hex - Primary color
     * @returns {Object} Two analogous colors
     */
    function getAnalogous(hex) {
        const hsl = hexToHsl(hex);
        return {
            left: hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
            right: hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
        };
    }
    
    /**
     * Calculate triadic colors
     * @param {string} hex - Primary color
     * @returns {Object} Two triadic colors
     */
    function getTriadic(hex) {
        const hsl = hexToHsl(hex);
        return {
            second: hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
            third: hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
        };
    }
    
    /**
     * Calculate split complementary colors
     * @param {string} hex - Primary color
     * @returns {Object} Two split complementary colors
     */
    function getSplitComplementary(hex) {
        const hsl = hexToHsl(hex);
        return {
            left: hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
            right: hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l)
        };
    }
    
    /**
     * Calculate tetradic colors
     * @param {string} hex - Primary color
     * @returns {Object} Three tetradic colors
     */
    function getTetradic(hex) {
        const hsl = hexToHsl(hex);
        return {
            second: hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
            third: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
            fourth: hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)
        };
    }
    
    /**
     * Generate color harmony suggestions based on primary color
     * @param {string} primaryColor - Primary color in hex
     * @returns {Object} Harmony suggestions
     */
    function suggestHarmony(primaryColor) {
        const hsl = hexToHsl(primaryColor);
        
        return {
            complementary: {
                name: 'Complementary',
                colors: [primaryColor, getComplementary(primaryColor)],
                description: 'High contrast, vibrant look'
            },
            analogous: {
                name: 'Analogous',
                colors: [
                    getAnalogous(primaryColor).left,
                    primaryColor,
                    getAnalogous(primaryColor).right
                ],
                description: 'Harmonious, serene feel'
            },
            triadic: {
                name: 'Triadic',
                colors: [
                    primaryColor,
                    getTriadic(primaryColor).second,
                    getTriadic(primaryColor).third
                ],
                description: 'Balanced, colorful palette'
            },
            splitComplementary: {
                name: 'Split Complementary',
                colors: [
                    primaryColor,
                    getSplitComplementary(primaryColor).left,
                    getSplitComplementary(primaryColor).right
                ],
                description: 'Strong visual contrast'
            },
            monochromatic: {
                name: 'Monochromatic',
                colors: generateMonochromatic(primaryColor),
                description: 'Clean, elegant appearance'
            }
        };
    }
    
    /**
     * Generate monochromatic variations
     * @param {string} hex - Base color
     * @returns {string[]} Array of monochromatic colors
     */
    function generateMonochromatic(hex) {
        const hsl = hexToHsl(hex);
        return [
            hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30)),
            hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 15)),
            hex,
            hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 15)),
            hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 30))
        ];
    }
    
    /**
     * Generate shades of a color
     * @param {string} hex - Base color
     * @param {number} count - Number of shades
     * @returns {string[]} Array of shades
     */
    function generateShades(hex, count = 5) {
        const hsl = hexToHsl(hex);
        const shades = [];
        const step = 80 / (count - 1);
        
        for (let i = 0; i < count; i++) {
            const lightness = 10 + (i * step);
            shades.push(hslToHex(hsl.h, hsl.s, lightness));
        }
        
        return shades;
    }
    
    /**
     * Generate tints of a color
     * @param {string} hex - Base color
     * @param {number} count - Number of tints
     * @returns {string[]} Array of tints
     */
    function generateTints(hex, count = 5) {
        const hsl = hexToHsl(hex);
        const tints = [];
        const step = 80 / (count - 1);
        
        for (let i = 0; i < count; i++) {
            const lightness = 20 + (i * step);
            tints.push(hslToHex(hsl.h, hsl.s, lightness));
        }
        
        return tints;
    }
    
    /**
     * Adjust color brightness
     * @param {string} hex - Base color
     * @param {number} percent - Percentage to adjust (-100 to 100)
     * @returns {string} Adjusted color
     */
    function adjustBrightness(hex, percent) {
        const hsl = hexToHsl(hex);
        const newLightness = Math.max(0, Math.min(100, hsl.l + percent));
        return hslToHex(hsl.h, hsl.s, newLightness);
    }
    
    /**
     * Adjust color saturation
     * @param {string} hex - Base color
     * @param {number} percent - Percentage to adjust (-100 to 100)
     * @returns {string} Adjusted color
     */
    function adjustSaturation(hex, percent) {
        const hsl = hexToHsl(hex);
        const newSaturation = Math.max(0, Math.min(100, hsl.s + percent));
        return hslToHex(hsl.h, newSaturation, hsl.l);
    }
    
    /**
     * Check if color is light (for text contrast)
     * @param {string} hex - Color to check
     * @returns {boolean} True if color is light
     */
    function isLight(hex) {
        const hsl = hexToHsl(hex);
        return hsl.l > 50;
    }
    
    /**
     * Get contrasting text color (black or white)
     * @param {string} hex - Background color
     * @returns {string} '#000000' or '#FFFFFF'
     */
    function getContrastColor(hex) {
        return isLight(hex) ? '#000000' : '#FFFFFF';
    }
    
    /**
     * Calculate color distance (similarity)
     * @param {string} hex1 - First color
     * @param {string} hex2 - Second color
     * @returns {number} Distance (0-441.67)
     */
    function colorDistance(hex1, hex2) {
        const rgb1 = hexToRgb(hex1);
        const rgb2 = hexToRgb(hex2);
        
        return Math.sqrt(
            Math.pow(rgb2.r - rgb1.r, 2) +
            Math.pow(rgb2.g - rgb1.g, 2) +
            Math.pow(rgb2.b - rgb1.b, 2)
        );
    }
    
    /**
     * Convert hex to RGB
     * @param {string} hex - Hex color
     * @returns {Object} RGB values
     */
    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        
        if (hex.length === 3) {
            return {
                r: parseInt(hex[0] + hex[0], 16),
                g: parseInt(hex[1] + hex[1], 16),
                b: parseInt(hex[2] + hex[2], 16)
            };
        }
        
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    }
    
    /**
     * Convert RGB to hex
     * @param {number} r - Red (0-255)
     * @param {number} g - Green (0-255)
     * @param {number} b - Blue (0-255)
     * @returns {string} Hex color
     */
    function rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = Math.max(0, Math.min(255, n)).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }
    
    /**
     * Blend two colors
     * @param {string} hex1 - First color
     * @param {string} hex2 - Second color
     * @param {number} ratio - Blend ratio (0-1)
     * @returns {string} Blended color
     */
    function blend(hex1, hex2, ratio = 0.5) {
        const rgb1 = hexToRgb(hex1);
        const rgb2 = hexToRgb(hex2);
        
        return rgbToHex(
            Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio),
            Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio),
            Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio)
        );
    }
    
    /**
     * Generate random color
     * @returns {string} Random hex color
     */
    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
    
    /**
     * Generate random harmonious palette
     * @returns {Object} Palette with primary and secondary colors
     */
    function randomHarmoniousPalette() {
        const primary = randomColor();
        const harmony = suggestHarmony(primary);
        
        return {
            primary: primary,
            secondary: harmony.complementary.colors[1],
            accent: harmony.analogous.colors[0],
            background: generateMonochromatic(primary)[3],
            text: isLight(primary) ? '#1a1a2e' : '#f8fafc'
        };
    }
    
    /**
     * Validate hex color
     * @param {string} hex - Color to validate
     * @returns {boolean} True if valid hex color
     */
    function isValidHex(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }
    
    /**
     * Normalize hex color (convert 3-char to 6-char)
     * @param {string} hex - Hex color
     * @returns {string} Normalized hex color
     */
    function normalizeHex(hex) {
        if (!isValidHex(hex)) return null;
        
        hex = hex.replace(/^#/, '');
        
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        return '#' + hex.toUpperCase();
    }
    
    // Initialize color picker UI on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeColorPickers();
    });
    
    /**
     * Initialize color picker UI elements
     */
    function initializeColorPickers() {
        const primaryColor = document.getElementById('primaryColor');
        const primaryColorHex = document.getElementById('primaryColorHex');
        const secondaryColor = document.getElementById('secondaryColor');
        const secondaryColorHex = document.getElementById('secondaryColorHex');
        
        if (!primaryColor || !secondaryColor) return;
        
        // Sync color picker with hex input
        function syncColorInputs(colorInput, hexInput) {
            colorInput.addEventListener('input', function() {
                hexInput.value = this.value.toUpperCase();
                updateHarmonySuggestions();
                updateBrandPreview();
            });
            
            hexInput.addEventListener('input', function() {
                let hex = this.value;
                if (!hex.startsWith('#')) hex = '#' + hex;
                if (isValidHex(hex)) {
                    colorInput.value = normalizeHex(hex);
                    updateHarmonySuggestions();
                    updateBrandPreview();
                }
            });
            
            hexInput.addEventListener('blur', function() {
                let hex = this.value;
                if (!hex.startsWith('#')) hex = '#' + hex;
                if (isValidHex(hex)) {
                    this.value = normalizeHex(hex);
                    colorInput.value = this.value;
                }
            });
        }
        
        syncColorInputs(primaryColor, primaryColorHex);
        syncColorInputs(secondaryColor, secondaryColorHex);
        
        // Initialize harmony buttons
        document.querySelectorAll('.harmony-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const scheme = this.dataset.scheme;
                applyHarmonyScheme(scheme);
            });
        });
        
        // Initial update
        updateHarmonySuggestions();
        updateBrandPreview();
    }
    
    /**
     * Update harmony suggestion previews
     */
    function updateHarmonySuggestions() {
        const primaryColor = document.getElementById('primaryColor')?.value || '#6B21A8';
        const harmony = suggestHarmony(primaryColor);
        
        document.querySelectorAll('.harmony-btn').forEach(btn => {
            const scheme = btn.dataset.scheme;
            const preview = btn.querySelector('.harmony-preview');
            
            if (preview && harmony[scheme]) {
                preview.innerHTML = '';
                harmony[scheme].colors.forEach(color => {
                    const span = document.createElement('span');
                    span.style.backgroundColor = color;
                    preview.appendChild(span);
                });
            }
        });
    }
    
    /**
     * Apply harmony scheme to color pickers
     * @param {string} scheme - Harmony scheme name
     */
    function applyHarmonyScheme(scheme) {
        const primaryColor = document.getElementById('primaryColor');
        const secondaryColor = document.getElementById('secondaryColor');
        const primaryColorHex = document.getElementById('primaryColorHex');
        const secondaryColorHex = document.getElementById('secondaryColorHex');
        
        if (!primaryColor || !secondaryColor) return;
        
        const harmony = suggestHarmony(primaryColor.value);
        
        if (harmony[scheme] && harmony[scheme].colors.length > 1) {
            secondaryColor.value = harmony[scheme].colors[1];
            secondaryColorHex.value = harmony[scheme].colors[1].toUpperCase();
            updateBrandPreview();
            
            // Show toast
            if (window.showToast) {
                window.showToast('Color scheme applied!', 'success');
            }
        }
    }
    
    /**
     * Update brand preview card
     */
    function updateBrandPreview() {
        const preview = document.getElementById('brandPreview');
        const primaryColor = document.getElementById('primaryColor')?.value || '#6B21A8';
        const secondaryColor = document.getElementById('secondaryColor')?.value || '#EAB308';
        const brandName = document.getElementById('brandName')?.value || 'Your Brand';
        
        if (!preview) return;
        
        const previewLogo = preview.querySelector('.preview-logo');
        const previewBrand = preview.querySelector('.preview-brand');
        
        if (previewLogo) {
            previewLogo.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
        }
        
        if (previewBrand) {
            previewBrand.textContent = brandName;
            previewBrand.style.color = primaryColor;
        }
    }
    
    // Expose API globally
    window.ColorPicker = {
        hexToHsl: hexToHsl,
        hslToHex: hslToHex,
        hexToRgb: hexToRgb,
        rgbToHex: rgbToHex,
        suggestHarmony: suggestHarmony,
        getComplementary: getComplementary,
        getAnalogous: getAnalogous,
        getTriadic: getTriadic,
        getSplitComplementary: getSplitComplementary,
        getTetradic: getTetradic,
        generateMonochromatic: generateMonochromatic,
        generateShades: generateShades,
        generateTints: generateTints,
        adjustBrightness: adjustBrightness,
        adjustSaturation: adjustSaturation,
        isLight: isLight,
        getContrastColor: getContrastColor,
        colorDistance: colorDistance,
        blend: blend,
        randomColor: randomColor,
        randomHarmoniousPalette: randomHarmoniousPalette,
        isValidHex: isValidHex,
        normalizeHex: normalizeHex
    };
    
})();
