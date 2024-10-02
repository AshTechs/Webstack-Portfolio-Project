document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('authForm');
    const errorMessageDiv = document.getElementById('error-message');
    const successMessageDiv = document.getElementById('success-message');

    // Utility function to display error message
    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
    }

    // Utility function to clear error message
    function clearError() {
        errorMessageDiv.textContent = '';
        errorMessageDiv.style.display = 'none';
    }

    // Utility function to highlight input fields in red
    function highlightErrorFields(fields) {
        fields.forEach(field => {
            const inputElement = signupForm.querySelector(`[name="${field}"]`);
            if (inputElement) {
                inputElement.style.borderColor = 'red';
            }
        });
    }

    // Utility function to remove red highlight from all input fields
    function removeErrorHighlight() {
        const inputElements = signupForm.querySelectorAll('input');
        inputElements.forEach(input => {
            input.style.borderColor = ''; // Reset to default
        });
    }

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        clearError(); // Clear any existing error messages
        removeErrorHighlight(); // Remove any red highlights

        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData.entries());

        // Add additional checks before making the request, e.g., password match
        if (data.password !== data.confirm_password) {
            showError('Passwords do not match.');
            highlightErrorFields(['password', 'confirm_password']);
            return;
        }

        if (!validatePassword(data.password)) {
            showError('Password must be at least 6 characters long, contain a number and a special character.');
            highlightErrorFields(['password']);
            return;
        }

        try {
            const response = await fetch(signupForm.action, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': formData.get('csrf_token')
                }
            });
        
            const result = await response.json();
            console.log(result);  // Log the response for debugging
        
            if (response.ok && result.success) {  
                const successMessage = 'Registration successful! A verification email has been sent to your inbox.';
                showSuccess(successMessage);
                setTimeout(() => {
                    window.location.href = 'verify.html';
                }, 3000);
            } else {
                showError(result.message || 'An error occurred.');
                if (result.errors) {
                    highlightErrorFields(result.errors);
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);  // Log network errors
            showError('An unexpected error occurred. Please try again.');
        }
        
    });

    // Utility function to show success message
    function showSuccess(message) {
        successMessageDiv.textContent = message;
        successMessageDiv.style.display = 'block';
        errorMessageDiv.style.display = 'none';
    }

    // Utility function to validate password
    function validatePassword(password) {
        // Example: Password must be at least 6 characters long, contain a number and a special character
        const re = /^(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
        return re.test(password);
    }
});

// CSS styles for error borders
const style = document.createElement('style');
style.innerHTML = `
    .error-border {
        border-color: red;
    }
    #error-message {
        display: none;
        color: red;
    }
    #success-message {
        display: none;
        color: green;
    }
`;
document.head.appendChild(style);
