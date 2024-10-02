let failedAttempts = 0;

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // prevent form from refreshing the page
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();

        if (data.success) {
            window.location.href = '/Dashboard'; // Redirect to dashboard
        } else {
            failedAttempts++;
            if (failedAttempts >= 3) {
                document.getElementById('reset-option').style.display = 'block';
            }
            document.getElementById('error-message').innerText = 'Incorrect email or password.';
        }
    } catch (error) {
        document.getElementById('error-message').innerText = 'Error logging in. Please try again.';
    }
});

function togglePassword() {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}
