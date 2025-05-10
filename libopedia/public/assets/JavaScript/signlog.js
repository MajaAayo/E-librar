document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');

    // Toggle between forms
    function toggleForms(showLoginForm) {
        if (showLoginForm) {
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
    }

    // Event listeners for switching forms
    signupLink?.addEventListener('click', (event) => {
        event.preventDefault();
        toggleForms(false); // Show Sign Up
    });

    loginLink?.addEventListener('click', (event) => {
        event.preventDefault();
        toggleForms(true); // Show Login
    });

    // Form validation
    function validateForm(formId) {
        const form = document.getElementById(formId);
        let valid = true;
        const errorMessages = {};

        if (formId === 'signup-form') {
            const nameInput = document.getElementById('signup-name');
            const nameError = document.getElementById('signup-name-error');
            const name = nameInput.value.trim();

            if (!name) {
                errorMessages['signup-name'] = 'Name is required';
                valid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                errorMessages['signup-name'] = 'Name must contain only letters and spaces';
                valid = false;
            } else {
                nameError.style.display = 'none';
            }
        }

        const emailInput = document.getElementById(`${formId === 'signup-form' ? 'signup' : 'login'}-email`);
        const emailError = document.getElementById(`${emailInput.id}-error`);
        const email = emailInput.value.trim();

        if (!email) {
            errorMessages[emailInput.id] = 'Email is required';
            valid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errorMessages[emailInput.id] = 'Invalid email format';
            valid = false;
        } else {
            emailError.style.display = 'none';
        }

        const passwordInput = document.getElementById(`${formId === 'signup-form' ? 'signup' : 'login'}-password`);
        const passwordError = document.getElementById(`${passwordInput.id}-error`);
        const password = passwordInput.value.trim();

        if (!password) {
            errorMessages[passwordInput.id] = 'Password is required';
            valid = false;
        } else if (password.length < 8) {
            errorMessages[passwordInput.id] = 'Password must be at least 8 characters long';
            valid = false;
        } else {
            passwordError.style.display = 'none';
        }

        // Show error messages
        for (const fieldId in errorMessages) {
            const errorElement = document.getElementById(`${fieldId}-error`);
            if (errorElement) {
                errorElement.textContent = errorMessages[fieldId];
                errorElement.style.display = 'block';
            }
        }

        return valid;
    }

    // Handle form submissions
    signupForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm('signup-form')) {
            alert('Sign up successful!');
            signupForm.reset();
            toggleForms(true);
        }
    });

    loginForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm('login-form')) {
            alert('Login successful!');
            loginForm.reset();
        }
    });
});
