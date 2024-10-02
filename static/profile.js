document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const formData = new FormData(this);

    fetch('/submit-profile', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = data.redirect_url;  // Redirect after success
        } else {
            alert('Error updating profile: ' + data.error);
            console.error('Details:', data.details);
        }
    })
    .catch(error => {
        alert('Error updating profile: ' + error.message);
        console.error('Fetch error:', error);
    });
});
