/**
 * HEALTHY LIFE GUIDE - COMPLETE JAVASCRIPT
 * All pages share this file
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Healthy Life Guide - Site Loaded');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ========== BMI CALCULATOR ==========
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight')?.value);
    const heightCm = parseFloat(document.getElementById('height')?.value);
    
    if (!weight || !heightCm) {
        alert('Please enter both weight and height');
        return;
    }
    
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);
    
    let category = '';
    let advice = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'You may need to gain some weight. Focus on nutrient-rich foods like nuts, dairy, and proteins.';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
        advice = 'Great job! Maintain this with balanced diet and regular exercise.';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        advice = 'Small changes can help. Start with walking daily and reducing portion sizes.';
    } else {
        category = 'Obese';
        advice = 'Consider consulting a doctor. Start with small steps - more water, less junk, daily walks.';
    }
    
    const resultDiv = document.getElementById('bmiResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Your BMI Result</h3>
            <div class="result-value">${bmiRounded}</div>
            <p><strong>Category:</strong> ${category}</p>
            <p>${advice}</p>
            <p style="margin-top: 15px; font-size: 0.9rem;">A healthy BMI ranges from 18.5 to 24.9</p>
        `;
    }
}

// ========== CALORIE CALCULATOR ==========
function calculateCalories() {
    const age = parseInt(document.getElementById('age')?.value);
    const gender = document.getElementById('gender')?.value;
    const weight = parseFloat(document.getElementById('weightKg')?.value);
    const height = parseFloat(document.getElementById('heightCm')?.value);
    const activity = document.getElementById('activity')?.value;
    
    if (!age || !weight || !height) {
        alert('Please fill all fields');
        return;
    }
    
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    let activityFactor;
    switch(activity) {
        case 'sedentary': activityFactor = 1.2; break;
        case 'light': activityFactor = 1.375; break;
        case 'moderate': activityFactor = 1.55; break;
        case 'active': activityFactor = 1.725; break;
        case 'very-active': activityFactor = 1.9; break;
        default: activityFactor = 1.2;
    }
    
    const maintenanceCalories = Math.round(bmr * activityFactor);
    const weightLossCalories = Math.round(maintenanceCalories - 500);
    const weightGainCalories = Math.round(maintenanceCalories + 500);
    
    const resultDiv = document.getElementById('calorieResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Your Daily Calorie Needs</h3>
            <p><strong>Maintenance:</strong> ${maintenanceCalories} calories/day</p>
            <p><strong>Weight Loss:</strong> ${weightLossCalories} calories/day</p>
            <p><strong>Weight Gain:</strong> ${weightGainCalories} calories/day</p>
            <p style="margin-top: 15px; font-size: 0.9rem;">Subtract 500 calories for gradual weight loss (0.5kg per week)</p>
        `;
    }
}

// ========== BODY FAT CALCULATOR ==========
function calculateBodyFat() {
    const gender = document.getElementById('bfGender')?.value;
    const neck = parseFloat(document.getElementById('neck')?.value);
    const waist = parseFloat(document.getElementById('waist')?.value);
    const hip = parseFloat(document.getElementById('hip')?.value);
    
    if (!neck || !waist) {
        alert('Please enter neck and waist measurements');
        return;
    }
    
    let bodyFat;
    if (gender === 'male') {
        bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(waist) + 36.76;
    } else {
        if (!hip) {
            alert('Please enter hip measurement for female');
            return;
        }
        bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(waist) - 78.387;
    }
    
    bodyFat = Math.max(5, Math.min(50, bodyFat.toFixed(1)));
    
    let category = '';
    let advice = '';
    
    if (gender === 'male') {
        if (bodyFat < 8) { category = 'Essential fat'; advice = 'Very lean. Maintain with balanced nutrition.'; }
        else if (bodyFat < 15) { category = 'Athletes'; advice = 'Excellent fitness level!'; }
        else if (bodyFat < 22) { category = 'Fitness'; advice = 'Good healthy range. Keep it up!'; }
        else if (bodyFat < 28) { category = 'Average'; advice = 'Healthy but can improve with exercise.'; }
        else { category = 'Obese range'; advice = 'Consider adding more physical activity.'; }
    } else {
        if (bodyFat < 14) { category = 'Essential fat'; advice = 'Very lean. Maintain with balanced nutrition.'; }
        else if (bodyFat < 21) { category = 'Athletes'; advice = 'Excellent fitness level!'; }
        else if (bodyFat < 28) { category = 'Fitness'; advice = 'Good healthy range. Keep it up!'; }
        else if (bodyFat < 33) { category = 'Average'; advice = 'Healthy but can improve with exercise.'; }
        else { category = 'Obese range'; advice = 'Consider adding more physical activity.'; }
    }
    
    const resultDiv = document.getElementById('bodyFatResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Your Body Fat Percentage</h3>
            <div class="result-value">${bodyFat}%</div>
            <p><strong>Category:</strong> ${category}</p>
            <p>${advice}</p>
            <p style="margin-top: 15px; font-size: 0.9rem;">Body fat is one measure of health. Focus on how you feel, not just numbers.</p>
        `;
    }
}

// Show/hide hip field based on gender (for body fat page)
document.addEventListener('DOMContentLoaded', function() {
    const genderSelect = document.getElementById('bfGender');
    const hipGroup = document.getElementById('hipGroup');
    
    if (genderSelect && hipGroup) {
        genderSelect.addEventListener('change', function() {
            if (this.value === 'female') {
                hipGroup.style.display = 'block';
            } else {
                hipGroup.style.display = 'none';
            }
        });
        if (genderSelect.value === 'male') {
            hipGroup.style.display = 'none';
        }
    }
});

// ========== WEB3 FORM SUBMISSION ==========
async function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const web3formId = '4ae87c39-9a08-4501-974b-e3b87cfaa014';
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(`https://api.web3forms.com/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: web3formId,
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Thank you! Your message has been sent successfully. I will reply within 24-48 hours.');
            form.reset();
        } else {
            alert('Something went wrong. Please try again or email me directly at ourhealthinfo@gmail.com');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again or email me directly.');
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
    
    return false;
}

// dark mode toggle
// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check if user has a saved preference in localStorage
    const savedMode = localStorage.getItem('darkMode');
    
    // If saved preference is dark, apply dark mode
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateButtonText(true);
    }
    
    // Toggle function
    function updateButtonText(isDarkMode) {
        if (darkModeToggle) {
            if (isDarkMode) {
                darkModeToggle.innerHTML = '☀️Light Mode <span>Light Mode</span>';
            } else {
                darkModeToggle.innerHTML = '🌙Dark Mode <span>Dark Mode</span>';
            }
        }
    }
    
    // Toggle dark mode on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (isDarkMode) {
                localStorage.setItem('darkMode', 'enabled');
                updateButtonText(true);
            } else {
                localStorage.setItem('darkMode', 'disabled');
                updateButtonText(false);
            }
        });
    }
});


// ========== HAMBURGER MENU FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('menuOverlay');
    
    if (hamburgerBtn && mainNav && overlay) {
        // Toggle menu on hamburger click
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Change icon when menu is open
            const icon = hamburgerBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Close menu on window resize (if screen becomes desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mainNav) mainNav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (hamburgerBtn) {
                const icon = hamburgerBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});



// Auto Scroll & Page Navigation - Minified Version
