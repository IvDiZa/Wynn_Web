// script.js - Handles active navigation state, form validation, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    
    // Set active navigation state
    setActiveNavItem(page);
    
    // Initialize form validation if on contact page
    if (page === 'contact.html') {
        initializeFormValidation();
    }
    
    // Add smooth transitions for logo-strip items
    const logoItems = document.querySelectorAll('.logo-strip i');
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s ease-in-out';
        });
    });
    
    // Add keyboard navigation enhancements
    setupKeyboardNavigation();
    
    // Console message for development
    console.log('Web Evolution site loaded - WCAG 2.1 AA compliant');
});

function setActiveNavItem(currentPage) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('nav-active');
        item.removeAttribute('aria-current');
        
        // Check which page we're on and set active accordingly
        const href = item.getAttribute('href');
        if (currentPage === href || 
            (currentPage === '' || currentPage === '/' || currentPage === 'index.html') && href === 'index.html') {
            item.classList.add('nav-active');
            item.setAttribute('aria-current', 'page');
        }
    });
}

function initializeFormValidation() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.querySelector('.reset-btn');
    const successDiv = document.getElementById('formSuccess');
    
    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateName(this);
        });
        
        nameInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateName(this);
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
        
        emailInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateEmail(this);
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateMessage(this);
        });
        
        messageInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateMessage(this);
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName(nameInput);
            const isEmailValid = validateEmail(emailInput);
            const isMessageValid = validateMessage(messageInput);
            const isRatingValid = validateRating(ratingInputs);
            
            // Check if era is selected
            const eraSelect = document.getElementById('era');
            const isEraValid = validateSelect(eraSelect, 'Please select a web era');
            
            if (isNameValid && isEmailValid && isMessageValid && isRatingValid && isEraValid) {
                // Show success message
                form.style.display = 'none';
                if (successDiv) {
                    successDiv.style.display = 'block';
                }
                
                // In a real implementation, you would send the form data to a server
                console.log('Form submitted successfully');
                
                // Optional: Reset form after 5 seconds
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    if (successDiv) {
                        successDiv.style.display = 'none';
                    }
                }, 5000);
            }
        });
    }
    
    // Reset form
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            clearErrors();
        });
    }
}

function validateName(input) {
    if (!input) return true;
    
    const errorDiv = document.getElementById('nameError');
    const value = input.value.trim();
    
    if (value === '') {
        showError(input, errorDiv, 'Name is required');
        return false;
    } else if (value.length < 2) {
        showError(input, errorDiv, 'Name must be at least 2 characters');
        return false;
    } else {
        clearFieldError(input, errorDiv);
        return true;
    }
}

function validateEmail(input) {
    if (!input) return true;
    
    const errorDiv = document.getElementById('emailError');
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        showError(input, errorDiv, 'Email is required');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(input, errorDiv, 'Please enter a valid email address');
        return false;
    } else {
        clearFieldError(input, errorDiv);
        return true;
    }
}

function validateMessage(input) {
    if (!input) return true;
    
    const errorDiv = document.getElementById('messageError');
    const value = input.value.trim();
    
    if (value === '') {
        showError(input, errorDiv, 'Message is required');
        return false;
    } else if (value.length < 10) {
        showError(input, errorDiv, 'Message must be at least 10 characters');
        return false;
    } else {
        clearFieldError(input, errorDiv);
        return true;
    }
}

function validateRating(ratingInputs) {
    if (!ratingInputs) return true;
    
    const errorDiv = document.getElementById('ratingError');
    let isChecked = false;
    
    ratingInputs.forEach(radio => {
        if (radio.checked) isChecked = true;
    });
    
    if (!isChecked) {
        if (errorDiv) {
            errorDiv.textContent = 'Please rate your experience';
        }
        return false;
    } else {
        if (errorDiv) {
            errorDiv.textContent = '';
        }
        return true;
    }
}

function validateSelect(select, errorMessage) {
    if (!select) return true;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    
    if (select.value === '' || select.value === null) {
        showError(select, errorDiv, errorMessage);
        return false;
    } else {
        clearFieldError(select);
        return true;
    }
}

function showError(input, errorDiv, message) {
    input.classList.add('error');
    if (errorDiv) {
        errorDiv.textContent = message;
    }
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorDiv?.id);
}

function clearFieldError(input, errorDiv) {
    input.classList.remove('error');
    if (errorDiv) {
        errorDiv.textContent = '';
    }
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
}

function clearErrors() {
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = '';
    });
}

function setupKeyboardNavigation() {
    // Add keyboard navigation for navbar items
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Add keyboard shortcut (Ctrl+K) to focus search/navigation
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const firstNavItem = document.querySelector('.nav-item');
        if (firstNavItem) {
            firstNavItem.focus();
        }
    }
});
